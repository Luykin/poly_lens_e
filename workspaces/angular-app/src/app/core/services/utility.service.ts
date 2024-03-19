import { shell } from 'electron';

export type ELECTRON_ARGUMENT = 'devmode' | 'locale';

export type LodashAccessor = (string | number)[] | string;

export const UtilityService = {
  removeStringAfter(string_: string, find: string) {
    if (!string_ || typeof string_ !== 'string') {
      return string_;
    }

    return string_.split(find)[0];
  },

  openExternalBrowser(url: string) {
    shell.openExternal(url);
  },

  isWindows(): boolean {
    return 'win32' === process.platform;
  },

  isMac(): boolean {
    // currently, only two operating systems supported, so invert isWindows logic
    return !UtilityService.isWindows();
  },
};
