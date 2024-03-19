// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

import { Injectable } from '@angular/core';
import { ElectronIpcService } from '../electron-ipc/electron-ipc.service';
import { Observable, Subject, filter, first, map } from 'rxjs';
import { LCSApiMessage, WindowApiConst } from 'shared-lib';
import { DeviceSetting } from '../../models/ui/device-setting-ui.model';
import { LCSDeviceSettingResponse } from '../../models/lcs-responses/device-setting-response';
import { LCSGetDeviceSettingRequest } from '../../models/lcs-requests/get-device-setting';

const LOGGER_PREFIX = '[DeviceSettingsManagerService]';

@Injectable({
  providedIn: 'root',
})
export class DeviceSettingsManagerService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _lcsListenersMapper = new Map<string, any>();
  private _settingSubject = new Subject<LCSDeviceSettingResponse>();

  constructor(private electronIpc: ElectronIpcService) {
    this._prepareIpcListeners();
  }

  // Prepare LCS listeners
  private _prepareIpcListeners(): void {
    this._lcsListenersMapper.set(
      LCSDeviceSettingResponse.type,
      this._handleLCSResponseDeviceSetting.bind(this)
    );

    this.electronIpc.receive(
      WindowApiConst.LCS_RESPONSE,
      this._handleLCSResponse.bind(this)
    );
  }

  /**
   * Receives a device setting for a specific device.
   *
   * @param deviceId The target device.
   * @param settingName The target device setting.
   */
  public getDeviceSetting(
    deviceId: string,
    settingName: string
  ): Observable<DeviceSetting> {
    const getDeviceSettingRequest = new LCSGetDeviceSettingRequest(
      deviceId,
      settingName
    );
    this.electronIpc.send(WindowApiConst.LCS_REQUEST, getDeviceSettingRequest);

    return this._settingSubject.pipe(
      filter((deviceSetting: LCSDeviceSettingResponse) => {
        const hasDeviceSubscription = deviceSetting.deviceId === deviceId;
        const hasSettingSubscription =
          deviceSetting.setting.name === settingName;
        return hasDeviceSubscription && hasSettingSubscription;
      }),
      first(),
      map((lcsDeviceSetting: LCSDeviceSettingResponse) => {
        return this._LCSDeviceSettingToDeviceSettingConvertor(lcsDeviceSetting);
      })
    );
  }

  private _handleLCSResponse(lcsResponse: LCSApiMessage): void {
    const listener = this._lcsListenersMapper.get(lcsResponse.type);

    if (!listener) {
      console.log(`${LOGGER_PREFIX} Listener not found for`, lcsResponse.type);
      return;
    }
    listener(lcsResponse);
  }

  private _handleLCSResponseDeviceSetting(
    lcsResponse: LCSDeviceSettingResponse
  ): void {
    if (lcsResponse.setting) {
      this._settingSubject.next(lcsResponse);
    } else {
      console.error('Received undefined deviceSetting');
    }
  }

  private _LCSDeviceSettingToDeviceSettingConvertor(
    lcsDeviceSetting: LCSDeviceSettingResponse
  ): DeviceSetting {
    return new DeviceSetting(
      lcsDeviceSetting.setting.auto_mode,
      lcsDeviceSetting.setting.meta,
      lcsDeviceSetting.setting.name
    );
  }
}
