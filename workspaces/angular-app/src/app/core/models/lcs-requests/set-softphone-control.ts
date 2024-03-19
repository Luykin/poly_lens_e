// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

import { LCSApiMessage } from 'shared-lib';

/**
 * Setting one setting values for a device with given id
 */
export class LCSSoftphoneControlRequest extends LCSApiMessage {
  static type: string = 'SoftphoneControl';
  id: string;
  enabled: boolean;

  constructor(id: string, enabled: boolean) {
    super();
    this.type = LCSSoftphoneControlRequest.type;
    this.id = id;
    this.enabled = enabled;
  }
}
