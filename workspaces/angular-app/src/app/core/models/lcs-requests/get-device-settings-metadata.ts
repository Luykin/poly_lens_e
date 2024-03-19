// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.
import { LCSApiMessage } from 'shared-lib';

export class LCSGetDeviceSettingsMetadataRequest extends LCSApiMessage {
  static type: string = 'GetDeviceSettingsMetadata';
  deviceId: string;

  constructor(deviceId: string) {
    super();
    this.type = LCSGetDeviceSettingsMetadataRequest.type;
    this.deviceId = deviceId;
  }
}
