// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

import { SocketConnection } from 'shared-lib';

export interface App {
  ready: boolean;
  selectedLanguage: string;
  connection: SocketConnection;
  view: {
    titlebar: boolean;
    content: boolean;
  };
}
