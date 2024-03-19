// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

import { WindowApi } from './apis/window-api';
export * from './apis/window-api';
export * from './apis/window-api-consts';
export * from './models/config/app-config';
export * from './models/lcs-api-message';
export * from './models/window-commands';
export * from './models/socket-connection.model';

declare global {
  // Global augmentation of the `Window` interface
  interface Window {
    api: WindowApi;
  }
}
