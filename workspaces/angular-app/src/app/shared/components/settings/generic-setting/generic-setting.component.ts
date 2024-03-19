// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import { ELEMENT_ID_TYPE } from 'src/app/utilities/constants';

@Component({
  selector: 'oz-generic-setting',
  templateUrl: './generic-setting.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenericSettingComponent {
  @Input({ required: true }) settingName!: string;
  @Input() settingActionName?: string; // Only for Lens Settings
  @Input() hideTitle: boolean = false;
  @Input() hideDescription: boolean = false;
  @Input() isChild: boolean = false;

  public elementIds = ELEMENT_ID_TYPE;

  // Translated title of a setting
  get title(): string {
    return this.settingActionName
      ? `${this.baseSettingPath}.TITLE`
      : `${this.baseSettingPath}.name`;
  }

  // Translated description of a setting
  get description(): string {
    return this.settingActionName
      ? `${this.baseSettingPath}.DESCRIPTION`
      : `${this.baseSettingPath}.description`;
  }

  // Even it is a Lens Setting or a Device Setting
  get baseSettingPath(): string {
    return this.settingActionName
      ? `SETTINGS.${this.settingName}.${this.settingActionName}`
      : `DeviceSettings.${this.settingName}`;
  }

  public getId(element: string): string {
    return UtilityService.prepareIdsForAutomationTests(
      this.settingName,
      element
    );
  }
}
