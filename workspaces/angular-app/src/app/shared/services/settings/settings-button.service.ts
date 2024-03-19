// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.
/* eslint-disable @typescript-eslint/no-explicit-any */

import { DestroyRef, Injectable, inject } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import {
  DEVICE_SETTING_ID_CLEAR_TRUSTED_DEVICES,
  DEVICE_SETTING_ID_RESTORE_DEFAULTS,
  MODAL_CLOSE_TYPE,
  MODAL_ID_RESTORE_DEFAULTS_COMPLETE,
  MODAL_ID_RESTORE_DEFAULTS_CONFIRM,
} from 'src/app/utilities/constants';
import { RestoreDefaultsConfirmModalComponent } from 'src/app/shared/components/modals/restore-defaults/restore-defaults-confirm.component';
import { ModalService } from 'src/app/core/services/modal.service';
import { ReconnectDeviceEvents } from 'src/app/core/services/reconnect-device-events.service';
import { DeviceManagerService } from 'src/app/core/services/device-manager/device-manager.service';
import { RestoreDefaultsCompleteModalComponent } from 'src/app/shared/components/modals/restore-defaults/restore-defaults-complete.component';
import { DeviceUI } from 'src/app/core/models/ui/device-ui.model';
import { DeviceSettingsManagerService } from 'src/app/core/services/device-settings-manager/device-settings-manager.service';
import { settingTypes } from 'src/app/core/services/device-common-settings/device-common-settings';
import { LoggingService } from '../../../core/services/logging/logging.service';

@Injectable({
  providedIn: 'root',
})
export class SettingsButtonService {
  public settingActions: { [key: string]: any } = {
    [DEVICE_SETTING_ID_RESTORE_DEFAULTS]: (inputs: any) =>
      this._handleRestoreDefaultsSettings({ ...inputs }),
    [DEVICE_SETTING_ID_CLEAR_TRUSTED_DEVICES]: () =>
      this._handleClearTrustedDevices(),
  };
  public selectedDevice?: DeviceUI = toSignal(
    this.devcieManagerService.selectedDeviceRaw$
  )()?.device;

  private _destroyRef = inject(DestroyRef);

  constructor(
    private modalService: ModalService,
    private reconnectDeviceEvents: ReconnectDeviceEvents,
    private devcieManagerService: DeviceManagerService,
    private deviceSettingsManagerService: DeviceSettingsManagerService,
    private loggerService: LoggingService
  ) {}

  public mapButtonActions(inputs: any) {
    // Access and invoke the action:
    const action = this.settingActions[inputs.settingName];
    if (action) {
      action({ ...inputs });
    } else {
      this.loggerService.log('There is no action for this setting.');
    }
  }

  private _handleClearTrustedDevices(): void {
    this.deviceSettingsManagerService.setDeviceSettingForSelectedDevice({
      name: DEVICE_SETTING_ID_CLEAR_TRUSTED_DEVICES,
      value: 'Manually',
      type: settingTypes.CLEAR_TRUSTED_DEVICES,
    });
  }

  private _handleRestoreDefaultsSettings({
    settingName,
    settingType,
    viewContainerReference,
  }: any): void {
    // Open modal confirm
    const modalConfirm = this.modalService.create(
      MODAL_ID_RESTORE_DEFAULTS_CONFIRM,
      RestoreDefaultsConfirmModalComponent,
      viewContainerReference,
      undefined,
      {
        settingName: settingName,
        type: settingType,
      }
    );

    // When modal confirm is closed
    modalConfirm.onClose
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((modal) => {
        // If modal is closed by clicking confirm button then open complete modal
        if (modal._data.closeModalType === MODAL_CLOSE_TYPE.CONFIRM) {
          if (this.selectedDevice) {
            this.reconnectDeviceEvents.reconnectStarted(this.selectedDevice);
          }
          this.modalService.create(
            MODAL_ID_RESTORE_DEFAULTS_COMPLETE,
            RestoreDefaultsCompleteModalComponent,
            viewContainerReference,
            undefined,
            {
              settingName: settingName,
              type: settingType,
            }
          );
        }
      });
  }
}
