// Copyright 2009, 2020, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

/* eslint-disable unicorn/consistent-function-scoping */
import { Component, OnInit, computed, effect } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { DeviceSettingMetadataUI } from 'src/app/core/models/ui/device-setting-metadata-ui.model';
import { Battery } from 'src/app/core/models/ui/battery.model';
import {
  DEVICE_SETTING_ID_SINGULAR_BATTERY_INFO,
  DEVICE_SETTING_ID_FIRMWARE_VERSION,
  COLOR_SUCCESS,
  COLOR_DANGER,
  DEVICE_SETTING_ID_LEFT_BATTERY_INFO,
  DEVICE_SETTING_ID_RIGHT_BATTERY_INFO,
  DEVICE_SETTING_ID_DEVICE_IMAGE,
  DEVICE_SETTING_ID_LEFT_DEVICE_IMAGE,
  DEVICE_SETTING_ID_RIGHT_DEVICE_IMAGE,
} from 'src/app/utilities/constants';
import { DeviceManagerService } from '../../../app/core/services/device-manager/device-manager.service';
import { DeviceSettingsManagerService } from '../../core/services/device-settings-manager/device-settings-manager.service';
import { BatteryUtilityService } from 'src/app/core/services/utility/battery-utility.service';
import { DFUManagerService } from '../../core/services/dfu-manager/dfu-manager.service';
import { DeviceSettingUI } from '../../core/models/ui/device-setting-ui';
import { UtilityService } from '../../core/services/utility/utility.service';
import { DetailNavService } from 'src/app/core/services/detail-nav/detail-nav.service';

// Component-specific details
export interface DeviceComponentInfoUI {
  componentsCount: number;
  image: string;
  connected: boolean;
  batteryInfo?: Battery;
  mark?: string;
}

@Component({
  selector: 'oz-device-overview',
  templateUrl: './device-overview.component.html',
})
export class DeviceOverviewComponent implements OnInit {
  public batteryIcon: string | undefined;
  public color_connected = COLOR_SUCCESS;
  public color_disconnected = COLOR_DANGER;
  public getNewerFirmwareVersion = false;

  // Contains per-component values
  public componentsInfo: DeviceComponentInfoUI[] = [];

  public detailNavOptionsSignal = toSignal(
    this.detailNavService.showDetailNavOptions$
  );

  public selectedDevice = toSignal(
    this.deviceManagerService.selectedDeviceRaw$
  );
  public selectedDeviceSettingsSignal = toSignal(
    this.deviceSettingsManagerService.settingsForSelectedDevice$
  );

  public selectedDeviceSettingsMetadataSignal = toSignal(
    this.deviceSettingsManagerService.settingsMetadataForDevice$
  );

  public deviceSoftwareVersionSignal = computed(() => {
    const deviceSettings = this.selectedDeviceSettingsSignal();

    return deviceSettings?.[DEVICE_SETTING_ID_FIRMWARE_VERSION] || undefined;
  });

  public availableDFUSignal = toSignal(
    this.dfuManagerService.availableNewerDFUSelectedDevice$
  );

  public dfuStatusSignal = toSignal(
    this.dfuManagerService.dfuExecutionStatusForSelectedDevice$
  );

  public devicelistSignal = toSignal(this.deviceManagerService.deviceList$);

  get hasBatteryInfo() {
    return (
      this.componentsInfo &&
      this.componentsInfo.length > 0 &&
      this.componentsInfo[0].batteryInfo
    );
  }

  constructor(
    private deviceManagerService: DeviceManagerService,
    private deviceSettingsManagerService: DeviceSettingsManagerService,
    private dfuManagerService: DFUManagerService,
    private batteryUtilityService: BatteryUtilityService,
    private detailNavService: DetailNavService
  ) {
    effect(() => this._preparePage());
  }

  ngOnInit(): void {
    this._preparePage();
    this.detailNavService.setDetailNavOptions({
      showNav: true,
      showDeviceHeading: true,
    });
  }

  public get downloadPercentageProgress(): string {
    const dfuSignal = this.dfuStatusSignal();

    if (
      !dfuSignal ||
      dfuSignal.firmwareSize == undefined ||
      dfuSignal.firmwareDownloadedSize == undefined
    ) {
      return '0 %'; // Avoid division by zero
    }

    const percentage =
      (dfuSignal.firmwareDownloadedSize / dfuSignal.firmwareSize) * 100;
    return percentage.toFixed(0) + ' %';
  }

  public scheduleNewestDFU() {
    const selectedDevice = this.selectedDevice();

    if (selectedDevice) {
      this.dfuManagerService.scheduleNewestDFU(selectedDevice.device.deviceId);
    }
  }

  public getBatteryIcon(batteryInfo: Battery): string {
    return this._getBatteryIconName(
      this._getBatteryLevel(batteryInfo),
      batteryInfo
    );
  }

  private _preparePage(): void {
    {
      const deviceSettings = this.selectedDeviceSettingsSignal();
      const selectedDevice = this.selectedDevice();

      if (!deviceSettings || !selectedDevice) {
        this.componentsInfo = [
          {
            image: '',
            componentsCount: this.componentsCount,
            connected: this.isConnectedSignal() || false,
            batteryInfo: undefined,
          },
        ];

        return;
      }

      if (this.componentsCount === 1) {
        const battery =
          deviceSettings?.[DEVICE_SETTING_ID_SINGULAR_BATTERY_INFO];

        const deviceImage = deviceSettings[DEVICE_SETTING_ID_DEVICE_IMAGE]
          ?.value as string;

        const componentInfo: DeviceComponentInfoUI = {
          componentsCount: this.componentsCount,
          image: deviceImage,
          batteryInfo: battery
            ? this._setupDeviceBatteryInfoSubscription(battery)
            : undefined,
          connected: this.isConnectedSignal()!,
        };

        this.componentsInfo = [componentInfo];
      } else if (this.componentsCount === 2) {
        // NOTE
        // This is pretty coupled with Osprey and the family, as the contract
        // has no generic values. Needs to be discussed on an architecture level and
        // generalized somehow.
        const leftBattery =
          deviceSettings?.[DEVICE_SETTING_ID_LEFT_BATTERY_INFO];
        const rightBattery =
          deviceSettings?.[DEVICE_SETTING_ID_RIGHT_BATTERY_INFO];

        const leftDeviceImage = deviceSettings[
          DEVICE_SETTING_ID_LEFT_DEVICE_IMAGE
        ]?.value as string;

        const rightDeviceImage = deviceSettings[
          DEVICE_SETTING_ID_RIGHT_DEVICE_IMAGE
        ]?.value as string;

        const multiComponentStatus =
          selectedDevice.device?.multiComponentStatus;
        const multiComponentStatusKeys = Object.keys(multiComponentStatus!);

        const leftComponentInfo: DeviceComponentInfoUI = {
          componentsCount: this.componentsCount,
          image: leftDeviceImage,
          batteryInfo: leftBattery
            ? this._setupDeviceBatteryInfoSubscription(leftBattery)
            : undefined,
          connected:
            multiComponentStatus![multiComponentStatusKeys[0]].toLowerCase() ===
            'online',
          mark: 'L',
        };

        const rightComponentInfo: DeviceComponentInfoUI = {
          componentsCount: this.componentsCount,
          image: rightDeviceImage,
          batteryInfo: rightBattery
            ? this._setupDeviceBatteryInfoSubscription(rightBattery)
            : undefined,
          connected:
            multiComponentStatus![multiComponentStatusKeys[1]].toLowerCase() ===
            'online',
          mark: 'R',
        };

        this.componentsInfo = [leftComponentInfo, rightComponentInfo];
      }
    }
  }

  private _setupDeviceBatteryInfoSubscription(
    battery: DeviceSettingUI
  ): Battery {
    return this.batteryUtilityService.setupDeviceBatteryInfoSubscription(
      battery
    );
  }

  public isConnectedSignal = computed(() => {
    this.devicelistSignal();
    return this.selectedDevice()?.device?.attached;
  });

  private _getBatteryLevel(batteryInfo: Battery): number {
    return this.batteryUtilityService.getBatteryLevel(batteryInfo);
  }

  private _getBatteryIconName(batteryLevel: number, batteryInfo: Battery) {
    const iconName =
      this.batteryUtilityService.getBatteryIconNameFromBatteryPercent(
        batteryLevel
      );
    return batteryInfo?.charging ? `${iconName}_charging` : iconName;
  }

  public isBatteryLevelCritical(deviceBatteryInfo: Battery): boolean {
    return this.batteryUtilityService.isBatteryLevelCritical(deviceBatteryInfo);
  }

  public getBatteryLevelPercent(deviceBatteryInfo: Battery): string {
    return this.batteryUtilityService.getBatteryLevelPercent(deviceBatteryInfo);
  }

  public handleOpenReleaseNotes() {
    if (this.availableDFUSignal()?.releaseNoteUrl !== undefined) {
      const releaseNoteUrl = this.availableDFUSignal()?.releaseNoteUrl;
      if (releaseNoteUrl !== undefined) {
        UtilityService.openExternalBrowser(releaseNoteUrl);
      }
    }
  }

  /**
   * Count number of components for selected device
   */
  get componentsCount(): number {
    const device = this.selectedDevice();
    const multiComponentStatus = device?.device.multiComponentStatus;

    return multiComponentStatus ? Object.keys(multiComponentStatus).length : 1;
  }

  /**
   * Checks if settings metadata has been retrieved
   */
  get isDeviceSettingsMetadataRetrieved(): boolean {
    return (
      this.selectedDeviceSettingsMetadataSignal !== undefined &&
      this.selectedDeviceSettingsMetadataSignal()!.length > 0
    );
  }

  /**
   * Settings metadata for selected device
   */
  get deviceSettingsMetadata(): Observable<DeviceSettingMetadataUI[]> {
    return this.deviceSettingsManagerService.settingsMetadataForDevice$;
  }

  /**
   * Has available DFU for selected device
   */
  get hasAvailableDFU(): boolean {
    return this.availableDFUSignal() !== undefined;
  }

  /**
   * Has ongoing DFU for selected device
   */
  get hasDfuOnGoing(): boolean {
    return this.selectedDevice()?.device.state?.toLowerCase() === 'dfumode';
  }

  get hasDfuDownloadInProgress(): boolean {
    const dfuStatusSignal = this.dfuStatusSignal();
    return !!dfuStatusSignal?.isDownloadInProgress;
  }

  get dfuNotNeeded(): boolean {
    return (
      !!this.isConnectedSignal() &&
      !this.hasAvailableDFU &&
      !!this.deviceSoftwareVersionSignal() &&
      !this.hasDfuOnGoing
    );
  }

  get dfuAvailable(): boolean {
    return (
      !!this.isConnectedSignal() && this.hasAvailableDFU && !this.hasDfuOnGoing
    );
  }

  get dfuInProgress(): boolean {
    return !!this.isConnectedSignal() && this.hasDfuOnGoing;
  }
}
