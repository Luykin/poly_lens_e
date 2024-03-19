// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

import { LCSApiMessage } from 'shared-lib';

export class LCSGetAvailableNewerDFUResponse extends LCSApiMessage {
  static type = 'GetAvailableNewerDFU';
  deviceId!: string;

  constructor(deviceId: string) {
    super();
    this.type = LCSGetAvailableNewerDFUResponse.type;
    this.deviceId = deviceId;
  }
}
