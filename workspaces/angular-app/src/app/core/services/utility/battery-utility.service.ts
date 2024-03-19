import { Injectable } from '@angular/core';
import { Battery } from '../../models/ui/battery.model';
import { DeviceSettingUI } from '../../models/ui/device-setting-ui';

const thresholdIcons: { [key: number]: string } = {
  0: 'battery_flat',
  10: 'battery_critical',
  30: 'battery_low',
  50: 'battery_medium',
  70: 'battery_high',
  100: 'battery_full',
};

const criticalBatteryLevel = 10;

@Injectable({
  providedIn: 'root',
})
export class BatteryUtilityService {
  constructor() {}

  /**
   * Finds battery icon name from battery percentage
   *
   * @param batteryLevel Battery level as number
   * @returns Icon name string
   */
  public getBatteryIconNameFromBatteryPercent(
    batteryPercentage: number
  ): string {
    const closestThreshold = Object.keys(thresholdIcons).find(
      (threshold) => batteryPercentage <= +threshold
    );
    return thresholdIcons[+closestThreshold!];
  }

  public setupDeviceBatteryInfoSubscription(
    battery: DeviceSettingUI | undefined
  ): Battery {
    return {
      charging: this._extractBatteryProperty(battery, 'Charging', 'boolean'),
      level: this._extractBatteryProperty(battery, 'Level', 'number'),
      state: this._extractBatteryProperty(battery, 'State', 'string'),
    };
  }

  public getBatteryLevel(batteryInfo: Battery): number {
    return batteryInfo?.level;
  }

  public getBatteryLevelPercent(batteryInfo: Battery): string {
    return `${batteryInfo?.level}%`;
  }

  public isBatteryLevelCritical(batteryInfo: Battery): boolean {
    return batteryInfo?.level <= criticalBatteryLevel;
  }

  private _extractBatteryProperty<T>(
    battery: DeviceSettingUI | undefined,
    propertyName: string,
    propertyType: 'boolean' | 'number' | 'string',
    defaultValue?: T
  ): T {
    const propertyValue = battery?.value_compound?.find(
      (c) => c.name === propertyName
    )?.value;

    return typeof propertyValue === propertyType
      ? (propertyValue as T)
      : defaultValue ?? (propertyValue as T);
  }
}
