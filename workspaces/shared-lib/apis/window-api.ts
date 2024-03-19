// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

import {
  OpenDialogOptions,
  OpenDialogReturnValue,
  SaveDialogOptions,
  SaveDialogReturnValue,
} from '../models/dialog.model';

// this type is taken from electron.d.ts; unfortunately it is not exported in Electron,
// so it is duplicated here
// note there is another PathNameType in electron-app; if there is a way to have
// only one type shared between angular-app and shared-lib, that would be a welcome improvement

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

export interface WindowApi {
  /**
   * Create authentication pop up window.
   */
  createAuthLogoutWindow(): void;

  /**
   * Create authentication pop up window.
   */
  createAuthWindow(options: { icon: string }): void;

  dirname(inputPath: string): Promise<string>;

  /**
   * This method is used by the renderer process to get the app path
   */
  getAppPath(): Promise<string>;

  getNativeTheme(): Promise<unknown>;

  /**
   * This method is used by the renderer process to get any path
   */
  getPath(path: PathNameType): Promise<string>;

  /**
   * Join string paths to generate a path, specific to the OS. Uses NodeJS path.join.
   */
  pathJoin(...arguments_: string[]): Promise<string>;

  /**
   * This method is used by the renderer process to receive data from the main process
   * @param channel used by the renderer to receive data and by the main to send them
   * @param func the callback function to execute when data are available
   */
  receive<Out>(channel: string, callback: (output: Out) => void): void;

  /**
   * This method is used by the renderer process to send data to the main process
   * @param channel used by the renderer to send data and by the main to receive them
   * @param data the data sent by the renderer process to the main process
   */
  send<In>(channel: string, input: In): void;

  /**
   * This method is used by the renderer process to open the dialog for file upload
   * @param options configuration for the dialog
   */
  showOpenDialog(options: OpenDialogOptions): Promise<OpenDialogReturnValue>;

  /**
   * This method is used by the renderer process to download a zipped file to specific path
   * @param downloadPath configuration for the dialog
   */
  downloadLogs(downloadPath: string): void;

  /**
   * This method is used by the renderer process to open the dialog for file download
   * @param options configuration for the dialog
   */
  showSaveDialog(options: SaveDialogOptions): Promise<SaveDialogReturnValue>;
  /**
   * Passthrough of various process properties
   * @help https://www.electronjs.org/docs/latest/api/process#properties
   */
  nodeVersion: string;
  chromeVersion: string;
  electronVersion: string;
  platform: string;
}
