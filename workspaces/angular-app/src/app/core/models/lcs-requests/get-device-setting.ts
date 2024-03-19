// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.
import { LCSApiMessage } from 'shared-lib';

export class LCSGetDeviceSettingRequest extends LCSApiMessage {
  static type: string = 'GetDeviceSetting';
  deviceId: string;
  name: string;

  constructor(deviceId: string, name: string) {
    super(name);
    this.type = LCSGetDeviceSettingRequest.type;
    this.deviceId = deviceId;
    this.name = name;
  }
}
