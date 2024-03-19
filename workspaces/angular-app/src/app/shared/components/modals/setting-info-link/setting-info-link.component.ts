// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import {
  MODAL_CLOSE_TYPE,
  MODAL_ID_SETTING_INFO,
} from 'src/app/utilities/constants';

@Component({
  templateUrl: './setting-info-link.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingInfoLinkModalComponent {
  constructor(private ngxSmartModalService: NgxSmartModalService) {}

  public ngAfterViewInit(): void {
    this.ngxSmartModalService.getModal(MODAL_ID_SETTING_INFO);
  }

  /**
   * Close the modal
   * @returns void
   */
  public close(): void {
    this.ngxSmartModalService.close(MODAL_ID_SETTING_INFO);
  }

  /**
   * Confirm the modal
   * @returns void
   */
  public confirm(): void {
    // Set modal data to differentiate the close type
    this.ngxSmartModalService.setModalData(
      { closeModalType: MODAL_CLOSE_TYPE.CONFIRM },
      MODAL_ID_SETTING_INFO,
      true
    );

    // Close the modal
    this.close();
  }

  public openPolySite(): void {
    UtilityService.openExternalBrowser('https://www.poly.com/us/en');
  }
}
