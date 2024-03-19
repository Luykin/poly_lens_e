// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

import { Injectable } from '@angular/core';
import {
  Observable,
  catchError,
  distinctUntilChanged,
  distinctUntilKeyChanged,
  filter,
  first,
  of,
  switchMap,
} from 'rxjs';
import { DeviceSettingMetadataUI } from '../../models/ui/device-setting-metadata-ui.model';
import { LCSDeviceSettingResponse } from '../../models/lcs-responses/device-setting-response';
import { LCSGetDeviceSettingRequest } from '../../models/lcs-requests/get-device-setting';
import {
  DEVICE_SETTING_ID_SINGULAR_BATTERY_INFO,
  DEVICE_SETTING_ID_FIRMWARE_VERSION,
  DEVICE_SETTING_ID_LEFT_BATTERY_INFO,
  DEVICE_SETTING_ID_RIGHT_BATTERY_INFO,
  DEVICE_SETTING_ID_DEVICE_IMAGE,
  DEVICE_SETTING_ID_LEFT_DEVICE_IMAGE,
  DEVICE_SETTING_ID_RIGHT_DEVICE_IMAGE,
} from 'src/app/utilities/constants';
import { AppStateType } from '../../models/state/app-state.model';
import { Operator, StateService } from '../../state-management/state.service';
import { LCSGetDeviceSettingsMetadataRequest } from '../../models/lcs-requests/get-device-settings-metadata';
import { LCSDeviceSettingsMetadataResponse } from '../../models/lcs-responses/device-settings-metadata';
import { SelectedDevice } from '../../models/state/selected-device.model';
import { LCSSetDeviceSettingRequest } from '../../models/lcs-requests/set-device-setting';
import {
  DeviceSettingsState,
  SingleDeviceSettingsState,
} from '../../models/state/device-settings-state.model';
import { DeviceSettingUI } from '../../models/ui/device-setting-ui';
import { LCSCommunicatorService } from '../lcs-communicator/lcs-communicator.service';
import { settingTypes } from '../device-common-settings/device-common-settings';
import { LoggingService } from '../logging/logging.service';
import { isEqual as _isEqual } from 'lodash';
import { DeviceManagerService } from '../device-manager/device-manager.service';

const LOGGER_PREFIX = '[DeviceSettingsManagerService]';

const preloadedDeviceSettingsList = [
  DEVICE_SETTING_ID_FIRMWARE_VERSION,
  DEVICE_SETTING_ID_SINGULAR_BATTERY_INFO,
  DEVICE_SETTING_ID_LEFT_BATTERY_INFO,
  DEVICE_SETTING_ID_RIGHT_BATTERY_INFO,
  DEVICE_SETTING_ID_DEVICE_IMAGE,
  DEVICE_SETTING_ID_LEFT_DEVICE_IMAGE,
  DEVICE_SETTING_ID_RIGHT_DEVICE_IMAGE,
];

@Injectable({
  providedIn: 'root',
})
export class DeviceSettingsManagerService {
  constructor(
    private lcsCommunicator: LCSCommunicatorService,
    private deviceManager: DeviceManagerService,
    private state: StateService<AppStateType>,
    private loggingService: LoggingService
  ) {
    this._prepareIpcListeners();
    // Order could be important
    this._prepareHooksOnMetadataChange();
    this._prepareHooksOnSelectDevice();
  }

  // Prepare LCS listeners
  private _prepareIpcListeners(): void {
    this.lcsCommunicator.addListener(
      LCSDeviceSettingResponse.type,
      this._handleLCSResponseDeviceSetting.bind(this)
    );

    this.lcsCommunicator.addListener(
      LCSDeviceSettingsMetadataResponse.type,
      this._handleLCSResponseDeviceSettingsMetadata.bind(this)
    );
  }

  /**
   * The hooks that needs to be executed after device has been selected
   */
  private _prepareHooksOnSelectDevice() {
    this.deviceManager.selectedDeviceRaw$
      .pipe(
        filter((selectedDevice) => !!selectedDevice),
        distinctUntilChanged((p, c) => {
          return _isEqual(p?.device, c?.device);
        })
      )
      .subscribe((selectedDevice) => {
        this.loggingService.log(
          `${LOGGER_PREFIX} Request metadata after device is selected.`
        );
        const deviceId = selectedDevice!.device.deviceId;
        this._loadSettingsMetadataForDevice(deviceId);
      });
  }

  /**
   * The hooks that needs to be executed after metadata has been received
   */
  private _prepareHooksOnMetadataChange() {
    this.selectedDevice$
      .pipe(
        filter((selectedDevice) => !!selectedDevice),
        distinctUntilKeyChanged('settingsMetadata')
      )
      .subscribe((selectedDevice) => {
        this.loggingService.log(
          `${LOGGER_PREFIX} Preload first set of settings after metadata is received.`
        );
        const deviceId = selectedDevice.device.deviceId;
        // Request all settings that needs to be preloaded (firmware version, images, battery, etc.)
        if (selectedDevice?.device.state?.toLowerCase() === 'online') {
          for (const settingName of preloadedDeviceSettingsList) {
            this.loadDeviceSetting(deviceId, settingName);
          }
        }
      });
  }

  /**
   * Load specific setting for device
   */
  public loadDeviceSetting(deviceId: string, settingName: string): void {
    const getDeviceSettingRequest = new LCSGetDeviceSettingRequest(
      deviceId,
      settingName
    );
    this.lcsCommunicator.sendToLCS(getDeviceSettingRequest);
  }

  /**
   * Set device setting value for a device
   */
  public setDeviceSetting(
    deviceId: string,
    deviceSetting: DeviceSettingUI
  ): void {
    // TODO: Possible to revisit in in case of updating compound value types.

    if (
      deviceSetting.type !== settingTypes.BUTTON &&
      deviceSetting.value == undefined
    ) {
      return;
    }

    const setDeviceSettingRequest = new LCSSetDeviceSettingRequest(
      deviceId,
      deviceSetting.name,
      deviceSetting.value!,
      false // TODO: Confirm this param
    );

    this.lcsCommunicator.sendToLCS(setDeviceSettingRequest);
  }

  // TODO: Probably needs to be removed and replaced with setDeviceSetting()
  public setDeviceSettingForSelectedDevice(deviceSetting: DeviceSettingUI) {
    this.selectedDevice$.pipe(first()).subscribe((selectedDevice) => {
      if (selectedDevice) {
        this.setDeviceSetting(selectedDevice.device.deviceId, deviceSetting);
      }
    });
  }

  /**
   * Get available settings for currently selected device
   */
  public get settingsMetadataForDevice$(): Observable<
    DeviceSettingMetadataUI[]
  > {
    return this.state.select$((s) => s.selectedDevice?.settingsMetadata);
  }

  /**
   * Fetch settings of selected device
   */
  public get settingsForSelectedDevice$(): Observable<SingleDeviceSettingsState> {
    return this.state
      .select$((s) => s.selectedDevice)
      .pipe(
        switchMap((selectedDevice: SelectedDevice) => {
          return this.state.select$(
            (s: AppStateType) =>
              s.deviceSettings[selectedDevice.device.deviceId]
          );
        }),
        catchError((_error) => of())
      );
  }

  /**
   * Will request list of metadata of all available settings for device
   */
  private _loadSettingsMetadataForDevice(deviceId: string): void {
    const getDeviceSettingsMetadataRequest =
      new LCSGetDeviceSettingsMetadataRequest(deviceId);
    this.lcsCommunicator.sendToLCS(getDeviceSettingsMetadataRequest);
  }

  /**
   * Fetch selected device
   */
  get selectedDevice$(): Observable<SelectedDevice> {
    return this.state.select$((s) => s.selectedDevice);
  }

  private _handleLCSResponseDeviceSettingsMetadata(
    lcsResponse: LCSDeviceSettingsMetadataResponse
  ): void {
    const settingsMetadataLCS = lcsResponse.settings.map((lcsDeviceSettings) =>
      DeviceSettingMetadataUI.fromLCS(lcsDeviceSettings)
    );

    this.state.updateEntity$<SelectedDevice>('selectedDevice', {
      operator: Operator.FUNCTION,
      updateFunction: (selectedDevice) => {
        // The response is received asynchronously.
        // Need to be sure that it's matched with currently selected device.
        if (
          selectedDevice &&
          selectedDevice.device.deviceId === lcsResponse.deviceId
        ) {
          return {
            ...selectedDevice,
            settingsMetadata: settingsMetadataLCS,
          };
        } else {
          this.loggingService.log(
            `${LOGGER_PREFIX} Cannot set device settings metadata as selectedDevice is not known or not the aligned with the received`
          );
          return selectedDevice;
        }
      },
    });
  }

  private _handleLCSResponseDeviceSetting(
    lcsResponse: LCSDeviceSettingResponse
  ): void {
    try {
      const settingLCS = DeviceSettingUI.fromLCS(lcsResponse);

      this.state.updateEntity$<DeviceSettingsState>('deviceSettings', {
        operator: Operator.FUNCTION,
        updateFunction: (deviceSettings) => {
          const settingsForDevice = deviceSettings[lcsResponse.deviceId] || [];

          deviceSettings = {
            ...deviceSettings,
            [lcsResponse.deviceId]: {
              ...settingsForDevice,
              [settingLCS.name]: settingLCS,
            },
          };
          return deviceSettings;
        },
      });
    } catch (error) {
      this.loggingService.warn(`${LOGGER_PREFIX}`, error);
    }
  }
}
