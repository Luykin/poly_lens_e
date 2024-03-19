interface LCSDeviceSettingValueCompound {
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
  value: number;
  value_int: number;
}

interface LCSDeviceSettingMeta {
  auto_supported: boolean;
  is_action: boolean;
  read_only: boolean;
  type: string;
  value_compound: LCSDeviceSettingValueCompound[];
}

export class LCSDeviceSetting {
  auto_mode: boolean;
  meta: LCSDeviceSettingMeta;
  name: string;
  constructor(auto_mode: boolean, meta: LCSDeviceSettingMeta, name: string) {
    this.auto_mode = auto_mode;
    this.meta = meta;
    this.name = name;
  }
}
