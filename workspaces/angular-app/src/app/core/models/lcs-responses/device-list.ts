// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

import { LCSApiMessage } from 'shared-lib';
import { LCSDevice } from './device';

export class LCSDeviceListResponse extends LCSApiMessage {
  static type = 'DeviceList';
  devices: LCSDevice[] = [];

  constructor() {
    super();
    this.type = LCSDeviceListResponse.type;
  }
}
