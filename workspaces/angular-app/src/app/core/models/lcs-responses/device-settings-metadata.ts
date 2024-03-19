// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

import { LCSApiMessage } from 'shared-lib';

export class LCSDeviceSettingsMetadataResponse extends LCSApiMessage {
  static type = 'DeviceSettingsMetadata';
  deviceId!: string;
  settings!: LCSDeviceSettingMetadata[];

  constructor() {
    super();
    this.type = LCSDeviceSettingsMetadataResponse.type;
  }
}

export interface LCSDeviceSettingMetaValueCompound {
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

export interface LCSDeviceSettingMeta {
  auto_supported: boolean;
  is_action: boolean;
  read_only: boolean;
  type: string;
  possible_values?: [];
}

export class LCSDeviceSettingMetadata {
  auto_mode: boolean;
  meta: LCSDeviceSettingMeta;
  name: string;
  constructor(auto_mode: boolean, meta: LCSDeviceSettingMeta, name: string) {
    this.auto_mode = auto_mode;
    this.meta = meta;
    this.name = name;
  }
}
