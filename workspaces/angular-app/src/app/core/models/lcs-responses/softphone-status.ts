// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

import { LCSApiMessage } from 'shared-lib';

export class LCSSoftphoneStatusResponse extends LCSApiMessage {
  static type = 'SoftphoneStatus';
  id!: string;
  displayName?: string;
  enabled!: boolean;
  connected?: boolean;

  constructor() {
    super();
    this.type = LCSSoftphoneStatusResponse.type;
  }
}
