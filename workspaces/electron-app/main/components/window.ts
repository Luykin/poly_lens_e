// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

import * as path from 'node:path';
import * as remoteMain from '@electron/remote/main';
import electron, {
  app,
  BrowserWindow,
  dialog,
  ipcMain,
  IpcMainInvokeEvent,
  nativeImage,
  OpenDialogOptions,
  SaveDialogOptions,
} from 'electron';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LCSApiMessage, SocketConnection, WindowCommands } from 'shared-lib';
import { AbstractService } from '../ipc-services/abstract-service';
import { LCSConnectionService } from '../ipc-services/lcs-connection/lcs-connection.service';
import { LCSService } from '../ipc-services/lcs-service/lcs-service';
import { WindowService } from '../ipc-services/window-service/window-service';
import { Logger } from '../utils/logger';
import { TrayEvent } from './system-tray';
import { IGlobal } from 'shared-lib/apis';
import { ChannelName } from '../models/channel-name.const';
import * as fs from 'node:fs';
import archiver from 'archiver';
import log from 'electron-log/main';

// for more context on why this is needed, see:
// @help https://github.com/electron/remote/issues/66#issuecomment-905992128
const remote =
  process.type === 'browser' ? electron : require('@electron/remote');

declare const global: IGlobal;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;
const mainLogFilePath = '\\PolyHP\\LensDesktop\\Logs\\main.log';

// this type is taken from electron.d.ts; unfortunately it is not exported in Electron,
// so it is duplicated here
export type PathNameType =
  | 'home'
  | 'appData'
  | 'userData'
  | 'sessionData'
  | 'temp'
  | 'exe'
  | 'module'
  | 'desktop'
  | 'documents'
  | 'downloads'
  | 'music'
  | 'pictures'
  | 'videos'
  | 'recent'
  | 'logs'
  | 'crashDumps';

export class Window {
  private _electronWindow: BrowserWindow | undefined;
  private _svcWindow: WindowService;
  private _svcLcs: LCSService;
  private _svcLcsConnection: LCSConnectionService;

  private blockIpcSubscriptions$: ReplaySubject<boolean> =
    new ReplaySubject<boolean>(1);

  constructor(
    svcWindow: WindowService,
    svcLCS: LCSService,
    svcLcsConnection: LCSConnectionService
  ) {
    this._svcWindow = svcWindow;
    this._svcLcs = svcLCS;
    this._svcLcsConnection = svcLcsConnection;

    this.createAndRegister(svcWindow, svcLCS, svcLcsConnection);
  }

  private createAndRegister(
    svcWindow: WindowService,
    svcLCS: LCSService,
    svcSocket: LCSConnectionService
  ) {
    this._createWindow();
    this._loadRenderer();

    this._svcWindow.setWindow(this._electronWindow);
    this._svcLcsConnection.initialize(
      this._electronWindow,
      this._svcLcs.socketClient
    );

    this.blockIpcSubscriptions$ = new ReplaySubject<boolean>(1);
    this._registerService<LCSApiMessage, LCSApiMessage>(svcLCS);
    this._registerService<SocketConnection, SocketConnection>(svcSocket);
    this._registerService<WindowCommands, WindowCommands>(svcWindow);

    this._handleOpenDialog();
    this._handleSaveDialog();
    this._handleZipAndDownloadFile();
    this._handleCommon();
    this._handleCreateAuthWindow();
  }

  private _createWindow(): void {
    this._electronWindow = new BrowserWindow({
      width: 1280,
      height: 720,
      frame: false,
      titleBarStyle: 'hiddenInset',
      backgroundColor: '#FFFFFF',
      icon: this._loadIcon(),
      webPreferences: {
        // Default behavior in Electron since 5, that
        // limits the powers granted to remote content
        nodeIntegration: global.appConfig.isNodeIntegration,
        // Isolate window context to protect against prototype pollution
        contextIsolation: global.appConfig.isContextIsolation,
        // Introduced in Electron 20 and enabled by default
        // Among others security constraints, it prevents from required
        // CommonJS modules imports to be bundled into preload script
        sandbox: global.appConfig.isSandbox,
        // Use a preload script to enhance security
        preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      },
    });

    // Disable the remote module to enhance security
    if (global.appConfig.isEnableRemoteModule) {
      remoteMain.enable(this._electronWindow.webContents);
    }
  }

  private _loadIcon(): Electron.NativeImage | undefined {
    if (global.appConfig.isIconAvailable) {
      // icns and ico are preferred for Mac and Windows, respectively,
      // due to their ability to store multiple resolutions and let OS
      // decide which resolution is best to display
      // however, NativeImage only loads PNG or JPG
      // in LD 1.x, these paths were inserted in electron builder JSON files
      // follow on work may be done via https://hp-jira.external.hp.com/browse/LENS-19006
      const iconPath = path.join(__dirname, 'icons/icon.png');
      Logger.debug('Icon Path', iconPath);
      const image = nativeImage.createFromPath(iconPath);

      // image did not load properly
      if (!image || image.isEmpty()) {
        Logger.error(`Could not load app icon from path ${iconPath}`);
        return nativeImage.createEmpty();
      }

      if (process.platform === 'darwin') {
        app.dock.setIcon(image);
        return nativeImage.createEmpty();
      }

      return image;
    }

    return nativeImage.createEmpty();
  }

  private _loadRenderer(): void {
    if (global.appConfig.configId === 'development') {
      // Dev mode, take advantage of the live reload by loading local URL
      this.electronWindow?.loadURL(`http://localhost:4200`);
    } else {
      // Else mode, we simply load angular bundle
      const indexPath = path.join(
        __dirname,
        '../renderer/angular_window/index.html'
      );
      this.electronWindow?.loadURL(`file://${indexPath}`);
    }

    if (global.appConfig.isOpenDevTools) {
      this._openDevTools();
    }

    // When the window is closed`
    this._electronWindow?.on('closed', () => {
      // Remove IPC Main listeners
      this.blockIpcSubscriptions$.next(true);
      this.blockIpcSubscriptions$.unsubscribe();
      ipcMain.removeAllListeners();
      this._removeHandlers();
      // Delete current reference
      delete this._electronWindow;
    });
  }

  private _removeHandlers(): void {
    for (const channel of Object.values(ChannelName)) {
      ipcMain.removeHandler(channel);
    }
  }

  private _openDevTools(): void {
    this._electronWindow?.webContents.openDevTools();
    this._electronWindow?.webContents.on('devtools-opened', () => {
      this._electronWindow?.focus();
      setImmediate(() => {
        this._electronWindow?.focus();
      });
    });
  }

  private _registerService<In, Out>(service: AbstractService<In, Out>) {
    // Handling input
    ipcMain.on(
      service.receptionChannel(),
      (event: Electron.IpcMainEvent, ...parameters: any[]) => {
        const input = parameters[0];
        // Logger.debug(`[${service.receptionChannel()}]  =====> `, input);
        service.process(input);
      }
    );

    // Handling output
    if (service.sendingChannel() && service.events$) {
      service.events$
        .pipe(takeUntil(this.blockIpcSubscriptions$))
        .subscribe((output) => {
          // Logger.debug(`[${service.sendingChannel()}] rxjs=> `, output);
          this._electronWindow?.webContents.send(
            service.sendingChannel()!,
            output
          );
        });
    }
  }

  private _handleOpenDialog(): void {
    ipcMain.handle(
      ChannelName.SHOW_OPEN_DIALOG,
      (event: IpcMainInvokeEvent, parameters: OpenDialogOptions) => {
        return dialog.showOpenDialog({
          ...parameters,
          defaultPath: app.getPath('downloads'),
        });
      }
    );
  }

  private _handleSaveDialog(): void {
    ipcMain.handle(
      ChannelName.SHOW_SAVE_DIALOG,
      (event: IpcMainInvokeEvent, parameters: SaveDialogOptions) => {
        return dialog.showSaveDialog({
          ...parameters,
          defaultPath: app.getPath('downloads'),
        });
      }
    );
  }

  private _handleZipAndDownloadFile(): void {
    ipcMain.handle(
      ChannelName.DOWNLOAD_LOGS,
      (event: IpcMainInvokeEvent, downloadPath: string) => {
        if (
          fs.existsSync(downloadPath) &&
          fs.lstatSync(downloadPath).isDirectory()
        ) {
          // Append filename to the directory path
          downloadPath = path.join(downloadPath, 'logs.zip');
        }
        const logFilePath = app.getPath('appData') + mainLogFilePath;

        const output = fs.createWriteStream(downloadPath);
        const archive = archiver('zip', {
          zlib: { level: 9 },
        });

        output.on('close', () => {
          log.log('Zip file created successfully');
        });

        output.on('end', () => {
          log.log('Data has been drained');
        });

        output.on('error', (error) => {
          log.error('Error writing zip file:', error);
        });

        archive.pipe(output);
        archive.file(logFilePath, { name: 'main.log' });
        archive.finalize();

        log.log('Zip file saved to:', downloadPath);

        return { success: true, filePath: downloadPath };
      }
    );
  }

  /**
   * Simple methods to handle common Path, FS and related Electron tasks.
   */
  private _handleCommon(): void {
    ipcMain.handle(ChannelName.GET_APP_PATH, () => {
      return app.getAppPath();
    });
    ipcMain.handle(
      ChannelName.GET_PATH,
      (event: IpcMainInvokeEvent, path: PathNameType) => {
        return app.getPath(path);
      }
    );
    ipcMain.handle(
      ChannelName.DIRNAME,
      (event: IpcMainInvokeEvent, inputPath: string) => {
        return path.dirname(inputPath);
      }
    );
    ipcMain.handle(
      ChannelName.PATH_JOIN,
      (event: IpcMainInvokeEvent, ...arguments_: string[]) => {
        return path.join(...arguments_);
      }
    );
    ipcMain.handle(ChannelName.GET_NATIVE_THEME, () => {
      return remote.nativeTheme;
    });
  }

  private _handleCreateAuthWindow() {
    ipcMain.handle(
      ChannelName.CREATE_AUTH_WINDOW,
      (event: IpcMainInvokeEvent, options: { icon: string }) =>
        new remote.BrowserWindow({
          width: 650,
          height: 775,
          webPreferences: {
            nodeIntegration: false,
            devTools: false,
          },
          title: 'Poly Lens',
          autoHideMenuBar: true,
          icon: options.icon,
        })
    );
  }

  private _handleCreateAuthLogoutWindow(): void {
    ipcMain.handle(
      ChannelName.CREATE_AUTH_LOGOUT_WINDOW,
      () => new remote.BrowserWindow({ show: false })
    );
  }

  public get electronWindow(): BrowserWindow | undefined {
    return this._electronWindow;
  }

  public handleTrayEvent(event: TrayEvent) {
    if (event === TrayEvent.Open) {
      this.openWindow();
    }
  }

  public openWindow() {
    if (this.electronWindow) {
      return;
    }

    this.createAndRegister(
      this._svcWindow,
      this._svcLcs,
      this._svcLcsConnection
    );
  }
}
