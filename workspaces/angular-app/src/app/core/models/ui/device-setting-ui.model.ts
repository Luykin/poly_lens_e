interface DeviceSettingValueCompound {
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

interface DeviceSettingMeta {
  auto_supported: boolean;
  is_action: boolean;
  read_only: boolean;
  type: string;
  value?: string;
  value_compound?: DeviceSettingValueCompound[];
}

export class DeviceSetting {
  auto_mode: boolean;
  meta: DeviceSettingMeta;
  name: string;
  constructor(auto_mode: boolean, meta: DeviceSettingMeta, name: string) {
    this.auto_mode = auto_mode;
    this.meta = meta;
    this.name = name;
  }
}
