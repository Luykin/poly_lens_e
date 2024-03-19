// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

// To secure user platform when running renderer process stuff,
// Node.js and Electron remote APIs are only available in this script

import {
  contextBridge,
  ipcRenderer,
  IpcRendererEvent,
  OpenDialogOptions,
  SaveDialogOptions,
} from 'electron';
import { WindowApi, WindowApiConst } from 'shared-lib';
import { PathNameType } from '../main/components/window';
import { ChannelName } from '../main/models/channel-name.const';

// @help Looking for ipcRenderer send, on, once and listener methods?
// consider this: https://stackoverflow.com/a/62462312/3232832
export const windowApi = <WindowApi>{
  chromeVersion: process.versions.chrome,
  createAuthLogoutWindow: () => {},
  createAuthWindow: (options: { icon: string }) => {
    console.log('Creating authentication window with options:', options);
  },
  // variable is named inputPath so that implementation does not conflict names (path.dirname(path))
  dirname: (inputPath: string) =>
    ipcRenderer.invoke(ChannelName.DIRNAME, inputPath),
  electronVersion: process.versions.electron,
  getAppPath: () => ipcRenderer.invoke(ChannelName.GET_APP_PATH),
  getNativeTheme: () => ipcRenderer.invoke(ChannelName.GET_NATIVE_THEME),
  getPath: (path: PathNameType) =>
    ipcRenderer.invoke(ChannelName.GET_PATH, path),
  nodeVersion: process.versions.node,
  pathJoin: (...arguments_: string[]) =>
    ipcRenderer.invoke(ChannelName.PATH_JOIN, ...arguments_),
  platform: process.platform,
  receive: <Out>(channel: string, callback: (output: Out) => void) => {
    // Deliberately strip event as it includes `sender`
    ipcRenderer.on(channel, (_event: IpcRendererEvent, ...parameters: any[]) =>
      callback(parameters[0])
    );
  },
  send: <In>(channel: string, input: In) => {
    if (WindowApiConst.SENDING_SAFE_CHANNELS.includes(channel)) {
      ipcRenderer.send(channel, input);
    }
  },
  showOpenDialog: (options: OpenDialogOptions) =>
    ipcRenderer.invoke(ChannelName.SHOW_OPEN_DIALOG, options),
  downloadLogs: (downloadPath: string) =>
    ipcRenderer.invoke(ChannelName.DOWNLOAD_LOGS, downloadPath),
  showSaveDialog: (options: SaveDialogOptions) =>
    ipcRenderer.invoke(ChannelName.SHOW_SAVE_DIALOG, options),
};

// Expose protected methods that allow the renderer process
// to use the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('api', windowApi);

console.log('The preload script has been injected successfully.');
