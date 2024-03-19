// Copyright 2009, 2024 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

import { LCSApiMessage } from 'shared-lib';

export class LCSDeviceDetachedResponse extends LCSApiMessage {
  static type = 'DeviceDetached';
  deviceId!: string;

  constructor() {
    super();
    this.type = LCSDeviceDetachedResponse.type;
  }
}
