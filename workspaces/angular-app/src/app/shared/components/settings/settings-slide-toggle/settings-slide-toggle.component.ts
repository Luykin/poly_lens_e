// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewContainerRef,
} from '@angular/core';
import { UpdateSettingsService } from 'src/app/shared/services/settings/update-settings.service';
import { SettingsBaseComponent } from '../settings-base.component';
import { sectionExpanded } from 'src/app/shared/animations/section.animations';
import { ModalService } from 'src/app/core/services/modal.service';
import {
  DEVICE_SETTING_ID_ANTI_STARTLE,
  MODAL_ID_SETTING_INFO,
  ELEMENT_ID_TYPE,
} from 'src/app/utilities/constants';
import { SettingInfoLinkModalComponent } from '../../modals/setting-info-link/setting-info-link.component';

@Component({
  selector: 'oz-settings-slide-toggle',
  templateUrl: './settings-slide-toggle.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [sectionExpanded],
  host: {
    class: 'accordion-item',
  },
})
export class SettingsSlideToggleComponent extends SettingsBaseComponent<boolean> {
  @Input() waitForAnimation!: boolean;

  antiStartleSetting = DEVICE_SETTING_ID_ANTI_STARTLE;
  link = ELEMENT_ID_TYPE.LINK;

  constructor(
    public updateSettingsService: UpdateSettingsService,
    private modalService: ModalService,
    private viewContainerReference: ViewContainerRef
  ) {
    super(updateSettingsService);
  }

  openSettingInfo(): void {
    this.modalService.create(
      MODAL_ID_SETTING_INFO,
      SettingInfoLinkModalComponent,
      this.viewContainerReference
    );
  }
}
