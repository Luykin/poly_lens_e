// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

import { LCSApiMessage } from 'shared-lib';

export class LCSDeviceSettingResponse extends LCSApiMessage {
  static type = 'DeviceSetting';
  deviceId!: string;
  setting!: LCSDeviceSetting;

  constructor() {
    super();
    this.type = LCSDeviceSettingResponse.type;
  }
}

export interface LCSDeviceSettingValueCompound {
  name: string;
  type: string;
  value: string | number | boolean;
}

export class LCSDeviceSetting {
  name: string;
  type: string;
  value?: string | number | boolean;
  value_compound?: LCSDeviceSettingValueCompound[];

  constructor(
    name: string,
    type: string,
    value: string | number | boolean | LCSDeviceSettingValueCompound[]
  ) {
    this.name = name;
    this.type = type;
    if (Array.isArray(value)) {
      this.value_compound = value;
    } else {
      this.value = value;
    }
  }
}
