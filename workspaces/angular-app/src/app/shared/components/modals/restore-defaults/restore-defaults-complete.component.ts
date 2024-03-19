// Copyright 2009, 2024 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { MODAL_ID_RESTORE_DEFAULTS_COMPLETE } from 'src/app/utilities/constants';

@Component({
  templateUrl: './restore-defaults-complete.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RestoreDefaultsCompleteModalComponent {
  public readonly TRANSLATION_PREFIX: string = 'MODALS.RESTORE_DEFAULTS.';
  public isReplugNeeded: boolean = true;

  constructor(private ngxSmartModalService: NgxSmartModalService) {}

  /**
   * Close the modal
   * @returns void
   */
  public close(): void {
    this.ngxSmartModalService.close(MODAL_ID_RESTORE_DEFAULTS_COMPLETE);
  }
}
