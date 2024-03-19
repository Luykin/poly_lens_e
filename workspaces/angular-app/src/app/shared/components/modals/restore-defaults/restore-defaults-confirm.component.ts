// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { DeviceSettingUI } from 'src/app/core/models/ui/device-setting-ui';
import { DeviceSettingsManagerService } from 'src/app/core/services/device-settings-manager/device-settings-manager.service';
import {
  MODAL_CLOSE_TYPE,
  MODAL_ID_RESTORE_DEFAULTS_CONFIRM,
} from 'src/app/utilities/constants';

interface RestoreDefaultsModalData {
  settingName: string;
  type: string;
  closeModalType?: string;
}

@Component({
  templateUrl: './restore-defaults-confirm.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RestoreDefaultsConfirmModalComponent {
  public readonly TRANSLATION_PREFIX: string = 'MODALS.RESTORE_DEFAULTS.';

  constructor(
    private ngxSmartModalService: NgxSmartModalService,
    private deviceSettingsManagerService: DeviceSettingsManagerService
  ) {}

  /**
   * Close the modal
   * @returns void
   */
  public close(): void {
    this.ngxSmartModalService.close(MODAL_ID_RESTORE_DEFAULTS_CONFIRM);
  }

  /**
   * Cancel the modal
   * @returns void
   */
  public cancel(): void {
    // Set modal data to differentiate the close type
    this.ngxSmartModalService.setModalData(
      { closeModalType: MODAL_CLOSE_TYPE.CANCEL },
      MODAL_ID_RESTORE_DEFAULTS_CONFIRM,
      true
    );

    // Close the modal
    this.close();
  }

  /**
   * Confirm the modal
   * @returns void
   */
  public confirm(): void {
    // Get the data from the modal
    const modalData: RestoreDefaultsModalData =
      this.ngxSmartModalService.getModalData(
        MODAL_ID_RESTORE_DEFAULTS_CONFIRM
      ) as RestoreDefaultsModalData;
    // Set update setting payload
    const updatePayload: DeviceSettingUI = {
      name: modalData.settingName,
      type: modalData.type,
      value: true,
    };
    // Initiate a deivce to restore its factory defaults
    this.deviceSettingsManagerService.setDeviceSettingForSelectedDevice(
      updatePayload
    );

    // Set modal data to differentiate the close type
    this.ngxSmartModalService.setModalData(
      { closeModalType: MODAL_CLOSE_TYPE.CONFIRM },
      MODAL_ID_RESTORE_DEFAULTS_CONFIRM,
      true
    );

    // Close the modal
    this.close();
  }
}
