// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

import { DeviceSettingUI } from '../ui/device-setting-ui';

export interface DeviceSettingsState {
  [deviceId: string]: SingleDeviceSettingsState;
}

export interface SingleDeviceSettingsState {
  [settingId: string]: DeviceSettingUI;
}
