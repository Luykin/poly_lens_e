import { Directive, Input } from '@angular/core';
import { SettingsComponentData } from '../../services/settings/create-settings.service';
import { UpdateSettingsService } from '../../services/settings/update-settings.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';

export type SettingValue = string | boolean | number | undefined;

@Directive()
export abstract class SettingsBaseComponent<T> {
  @Input({ required: true }) settingName!: string;
  @Input() settingActionName?: string; // Only for Lens Settings
  @Input({ required: true }) set selectedValue(value: T) {
    this.selectedValueInternal = value;
  }
  @Input() disabled!: boolean;
  @Input() isChild!: boolean;
  @Input() childrenComponents: SettingsComponentData[] = [];
  @Input() hideTitle: boolean = false;
  @Input() hideDescription: boolean = false;
  @Input() type?: string;

  public selectedValueInternal!: T;

  constructor(public updateSettingsService: UpdateSettingsService) {}

  onChange(value: SettingValue): void {
    this.updateSettingsService.update({
      settingName: this.settingName,
      value,
    });
    this.selectedValueInternal = value as T;
  }

  getId(element?: string): string {
    return UtilityService.prepareIdsForAutomationTests(
      this.settingName,
      element ?? this.type!
    );
  }
}
