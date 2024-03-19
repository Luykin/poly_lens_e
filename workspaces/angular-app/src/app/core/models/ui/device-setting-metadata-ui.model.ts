// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

import { LCSDeviceSettingMetadata } from '../lcs-responses/device-settings-metadata';

interface DeviceSettingMetaValueCompoundUI {
  default_int_value: number;
  default_value: number;
  get_param: boolean;
  is_readable: boolean;
  is_writable: boolean;
  name: string;
  range_max: number;
  range_min: number;
  range_step: number;
  type: string;
  possible_values?: [];
}

export interface DeviceSettingMetaUI {
  auto_supported: boolean;
  is_action: boolean;
  read_only: boolean;
  type: string;
  value_compound?: DeviceSettingMetaValueCompoundUI[];
  possible_values?: [];
}

export class DeviceSettingMetadataUI {
  deviceId?: string;
  auto_mode: boolean;
  meta: DeviceSettingMetaUI;
  name: string;
  constructor(auto_mode: boolean, meta: DeviceSettingMetaUI, name: string) {
    this.auto_mode = auto_mode;
    this.meta = meta;
    this.name = name;
  }

  static fromLCS(
    lcsDeviceSetting: LCSDeviceSettingMetadata,
    deviceId?: string
  ): DeviceSettingMetadataUI {
    return {
      deviceId: deviceId,
      auto_mode: lcsDeviceSetting.auto_mode,
      name: lcsDeviceSetting.name,
      meta: lcsDeviceSetting.meta,
    };
  }
}
