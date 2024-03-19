import { app, BrowserWindow, Event, shell } from 'electron';
import { Window } from './window';
import { SystemTray } from './system-tray';
import { LCSService } from '../ipc-services/lcs-service/lcs-service';
import { WindowService } from '../ipc-services/window-service/window-service';
import { LCSConnectionService } from '../ipc-services/lcs-connection/lcs-connection.service';
import log from 'electron-log/main';
import path from 'node:path';
import fs from 'node:fs';
import { PathVariables } from 'electron-log';

const APPLICATION_DATA_PATH = path.join('PolyHP', 'LensDesktop');
export class App {
  private static _wrapper: Window;
  private static _tray: SystemTray;
  public static launch(): void {
    App.initLogger();
    App.setPathToAppData();
    app.on('window-all-closed', () => {});
    app.on('activate', App.start); // MacOS specific
    app.on('second-instance', App._handleSecondInstance);
    app.whenReady().then(App.start);

    // Limit navigation and open external links in default browser
    app.on('web-contents-created', App.openExternalLinksInDefaultBrowser);

    // Close if this is a duplicate process
    if (!app.requestSingleInstanceLock()) {
      log.log(
        `Quitting because we are the second-instance - another app is already running.`
      );
      app.quit();
    }
  }

  public static get electronWindow(): BrowserWindow | undefined {
    return this._wrapper ? this._wrapper.electronWindow : undefined;
  }

  private static setPathToAppData() {
    const pathToApplicationData = path.join(
      app.getPath('appData'),
      APPLICATION_DATA_PATH
    );
    app.setPath('userData', pathToApplicationData);
    app.setPath('sessionData', pathToApplicationData);
  }

  private static initLogger() {
    log.transports.file.resolvePathFn = (variables: PathVariables) => {
      return path.join(
        variables.appData,
        APPLICATION_DATA_PATH,
        'Logs',
        variables.fileName!
      );
    };
    log.initialize();
    log.transports.file.archiveLogFn = (oldLogFile) => {
      const info = path.parse(oldLogFile.path);

      try {
        fs.renameSync(
          oldLogFile.path,
          path.join(info.dir, info.name + '.old-' + Date.now() + info.ext)
        );
      } catch (error) {
        console.warn('Could not rotate log', error);
      }
    };
  }

  private static start() {
    App._tray = new SystemTray();
    // On MacOS it is common to re-create a window from app even after all windows have been closed
    if (!App.electronWindow) {
      App._wrapper = new Window(
        new WindowService(),
        new LCSService(),
        new LCSConnectionService()
      );
    }

    App._tray.event$.subscribe(App._wrapper.handleTrayEvent.bind(App._wrapper));
  }

  private static _handleSecondInstance(
    _event: Event,
    _commandLine: string[],
    _workingDirectory: string
  ): void {
    if (App._wrapper.electronWindow) {
      if (App._wrapper.electronWindow.isMinimized()) {
        App._wrapper.electronWindow.restore();
      }
      App._wrapper.electronWindow.focus();
    } else {
      App._wrapper.openWindow();
    }
  }

  private static openExternalLinksInDefaultBrowser = (
    event: Electron.Event,
    contents: Electron.WebContents
  ) => {
    // Disabling creation of new windows
    contents.setWindowOpenHandler((handler: Electron.HandlerDetails) => {
      // Telling the user platform to open this event's url in the default browser
      shell.openExternal(handler.url);

      // Blocking this event from loading in current app
      return { action: 'deny' };
    });

    // Limiting navigation
    contents.on(
      'will-navigate',
      (event: Electron.Event, navigationUrl: string) => {
        const parsedUrl = new URL(navigationUrl);
        // Allowing local navigation only
        if (parsedUrl.origin !== 'http://localhost:4200') {
          event.preventDefault();
        }
      }
    );
  };
}
