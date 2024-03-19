// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TranslatedOption } from 'src/app/shared/components/dropdown/dropdown.component';
import { UpdateSettingsService } from '../../../services/settings/update-settings.service';
import { SettingsBaseComponent } from '../settings-base.component';

@Component({
  selector: 'oz-settings-dropdown',
  templateUrl: './settings-dropdown.component.html',
  host: {
    class: 'accordion-item',
    '[class.accordion-childdropdown]': 'isChild',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsDropdownComponent extends SettingsBaseComponent<string> {
  @Input() options!: TranslatedOption[];
  @Input() translateOptions: boolean = false;

  constructor(public updateSettingsService: UpdateSettingsService) {
    super(updateSettingsService);
  }
}
