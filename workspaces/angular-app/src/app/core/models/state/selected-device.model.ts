// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

import { DeviceUI } from '../ui/device-ui.model';
import { DeviceSettingMetadataUI } from '../ui/device-setting-metadata-ui.model';

export interface SelectedDevice {
  // Basic device info
  device: DeviceUI;
  // Selected device ID
  deviceId: string;
  // IMPORTANT: No values! Only list with metadata of available device settings
  settingsMetadata: DeviceSettingMetadataUI[];
}
