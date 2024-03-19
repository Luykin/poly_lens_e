// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { WindowApi } from 'shared-lib';
import { newAppState } from './core/models/state/app-state.model';
import { AdminConfig } from './core/services/admin-config-manager/admin-config.service';
import { UtilityService } from './core/services/utility/utility.service';
import { APP_INIT_STATE_TOKEN } from './utilities/constants';

export const MOCK_PROVIDERS = [
  {
    provide: APP_INIT_STATE_TOKEN,
    useValue: newAppState(),
  },
  {
    provide: ActivatedRoute,
    useValue: {
      paramMap: of({
        get: () =>
          '7aef4cbb2e24c5fe40774b02dae24b1e6d16fd189a9bcc8480f6cdd722b245e1',
      }),
      parent: {
        paramMap: of({
          get: () =>
            '7aef4cbb2e24c5fe40774b02dae24b1e6d16fd189a9bcc8480f6cdd722b245e1',
        }),
      },
      snapshot: {},
    },
  },
  AdminConfig,
  {
    provide: UtilityService,
    useValue: {
      getRemote: () => {
        return {
          app: {
            setBadgeCount: () => true,
          },
          nativeTheme: {
            shouldUseDarkColors: false,
            on: () => {},
          },
        };
      },
    },
  },
  {
    provide: ActivatedRoute,
    useValue: {
      snapshot: {
        data: {},
      },
    } as ActivatedRoute,
  },
];

export const setupMockWindowApi = (global: typeof globalThis) => {
  global.window.api = <WindowApi>{
    chromeVersion: '121.0.6167.159',
    createAuthLogoutWindow: jest.fn(),
    createAuthWindow: jest.fn(),
    dirname: jest.fn(),
    electronVersion: '28.2.2',
    getAppPath: jest.fn(),
    getNativeTheme: jest.fn(),
    getPath: jest.fn(),
    nodeVersion: '20.9.0',
    pathJoin: jest.fn(),
    platform: 'win32',
    receive: jest.fn(),
    send: jest.fn(),
    showOpenDialog: jest.fn(),
    showSaveDialog: jest.fn(),
    downloadLogs: jest.fn(),
  };
};

/**
 * This mock method is abstractly typed, and built around storage service notion
 * that every item saved (setItem) is JSON stringified, and thus always a string.
 */
export const setupMockStorage = (localStore: Record<string, string>) => {
  localStore = {};

  jest.spyOn(window.localStorage, 'getItem');
  jest.spyOn(window.localStorage, 'setItem');
  jest.spyOn(window.localStorage, 'clear');

  window.localStorage.getItem = jest.fn().mockImplementation((key: string) =>
    // This is null to match functioning of the JavaScript localStorage API
    // eslint-disable-next-line unicorn/no-null
    key in localStore ? localStore[key] : null
  );
  window.localStorage.getItem = jest
    .fn()
    .mockImplementation((key, value) => (localStore[key] = String(value)));
  window.localStorage.clear = jest
    .fn()
    .mockImplementation(() => (localStore = {}));
};
