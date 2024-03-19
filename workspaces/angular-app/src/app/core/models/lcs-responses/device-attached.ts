// Copyright 2009, 2024 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

import { LCSApiMessage } from 'shared-lib';
import { LCSDevice } from './device';

export class LCSDeviceAttachedResponse extends LCSApiMessage {
  static type = 'DeviceAttached';
  device!: LCSDevice;

  constructor() {
    super();
    this.type = LCSDeviceAttachedResponse.type;
  }
}
