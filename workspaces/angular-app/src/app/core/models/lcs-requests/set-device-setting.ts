// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

import { LCSApiMessage } from 'shared-lib';

/**
 * Setting one setting values for a device with given id
 */
export class LCSSetDeviceSettingRequest extends LCSApiMessage {
  static type: string = 'SetDeviceSetting';
  deviceId: string;
  name: string;
  value: string | number | boolean;
  autoMode: boolean;

  constructor(
    deviceId: string,
    name: string,
    value: string | number | boolean,
    autoMode: boolean
  ) {
    super();
    this.type = LCSSetDeviceSettingRequest.type;
    this.deviceId = deviceId;
    this.name = name;
    this.value = value;
    this.autoMode = autoMode;
  }
}
