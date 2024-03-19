import {
  ChangeDetectionStrategy,
  Component,
  Input,
  computed,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { DeviceManagerService } from 'src/app/core/services/device-manager/device-manager.service';
import { DeviceSettingsManagerService } from 'src/app/core/services/device-settings-manager/device-settings-manager.service';
import { DEVICE_SETTING_ID_FIRMWARE_VERSION } from '../../../utilities/constants';

@Component({
  selector: 'oz-device-contact-support',
  templateUrl: './device-contact-support.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeviceContactSupportComponent {
  @Input({ required: true }) type!: string;

  public selectedDevice = toSignal(
    this.deviceManagerService.selectedDeviceRaw$
  );
  public selectedDeviceSettingsSignal = toSignal(
    this.deviceSettingsManagerService.settingsForSelectedDevice$
  );
  /* eslint-disable unicorn/consistent-function-scoping */
  public deviceSoftwareVersionSignal = computed(() => {
    const deviceSettings = this.selectedDeviceSettingsSignal();
    return deviceSettings?.[DEVICE_SETTING_ID_FIRMWARE_VERSION] || undefined;
  });

  constructor(
    private deviceManagerService: DeviceManagerService,
    private deviceSettingsManagerService: DeviceSettingsManagerService
  ) {}
}
