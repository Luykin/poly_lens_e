// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

import { LCSApiMessage } from 'shared-lib';

export class LCSRegisterClientRequest extends LCSApiMessage {
  static type: string = 'RegisterClient';
  name = 'Lens Desktop UI';
  subscriptions = [
    'DeviceList',
    'DeviceSetting',
    'DeviceSettingsMetadata',
    'DeviceAttached',
    'DeviceDetached',
    'AvailableNewerDFU',
    'DfuExecutionStatus',
    'DeviceUpdated',
    'SoftphonesList',
    'SoftphoneStatus',
    'Error',
  ];

  constructor() {
    super();
    this.type = LCSRegisterClientRequest.type;
  }
}
