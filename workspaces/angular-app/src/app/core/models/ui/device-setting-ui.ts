// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

import { LCSDeviceSettingResponse } from '../lcs-responses/device-setting-response';

export interface DeviceSettingValueCompoundUI {
  name: string;
  type: string;
  value: string | number | boolean;
}

export class DeviceSettingUI {
  deviceId?: string;
  name: string;
  type: string;
  value?: string | number | boolean;
  value_compound?: DeviceSettingValueCompoundUI[];

  constructor(
    name: string,
    type: string,
    value: string | number | boolean | DeviceSettingValueCompoundUI[]
  ) {
    this.name = name;
    this.type = type;
    if (Array.isArray(value)) {
      this.value_compound = value;
    } else {
      this.value = value;
    }
  }

  static fromLCS(lcsResponse: LCSDeviceSettingResponse): DeviceSettingUI {
    if (
      !lcsResponse.deviceId ||
      !lcsResponse.setting.name ||
      // !lcsResponse.setting.type || // type have to be sorted out
      (lcsResponse.setting.value && lcsResponse.setting.value_compound) ||
      (lcsResponse.setting.value == undefined &&
        !lcsResponse.setting.value_compound) // lcsResponse.setting.value can be a boolean value
    ) {
      throw new Error(
        'The following setting properties are mandatory: deviceId, settings.name, settings.type and (settings.value or settings.value_compound)'
      );
    }
    return {
      deviceId: lcsResponse.deviceId,
      name: lcsResponse.setting.name,
      type: lcsResponse.setting.type,
      value: lcsResponse.setting.value,
      value_compound: lcsResponse.setting.value_compound,
    };
  }
}
