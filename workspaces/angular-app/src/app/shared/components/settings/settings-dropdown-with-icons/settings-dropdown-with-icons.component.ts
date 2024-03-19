// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UpdateSettingsService } from 'src/app/shared/services/settings/update-settings.service';
import { Option } from 'src/app/shared/components/dropdown-with-icons/dropdown-with-icons.component';
import { SettingsBaseComponent } from '../settings-base.component';

@Component({
  selector: 'oz-settings-dropdown-with-icons',
  templateUrl: './settings-dropdown-with-icons.component.html',
  host: {
    class: 'accordion-item',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsDropdownWithIconsComponent extends SettingsBaseComponent<string> {
  @Input() options!: Option[];
  @Input() additionalOptions?: Option[];
  @Input() translateOptions: boolean = false;

  private _translateService = inject(TranslateService);

  constructor(public updateSettingsService: UpdateSettingsService) {
    super(updateSettingsService);
  }

  isDropdownValueOff(): boolean {
    const pathToTranslatedOptionOff = `DeviceSettings.${this.settingName}.options.off`;
    return (
      this.selectedValueInternal ===
      this._translateService.instant(pathToTranslatedOptionOff)
    );
  }
}
