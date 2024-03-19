import {
  ChangeDetectionStrategy,
  Component,
  ViewContainerRef,
} from '@angular/core';
import { SettingsButtonService } from 'src/app/shared/services/settings/settings-button.service';
import { UpdateSettingsService } from 'src/app/shared/services/settings/update-settings.service';
import { SettingsBaseComponent } from '../settings-base.component';

@Component({
  selector: 'oz-settings-button',
  templateUrl: './settings-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'accordion-item',
  },
})
export class SettingsButtonComponent extends SettingsBaseComponent<string> {
  public buttonText!: string;

  constructor(
    public updateSettingsService: UpdateSettingsService,
    private settingButtonService: SettingsButtonService,
    private viewContainerReference: ViewContainerRef
  ) {
    super(updateSettingsService);
  }

  public ngOnInit(): void {
    this.buttonText = `DeviceSettings.${this.settingName}.resetBtn`;
  }

  public onButtonClick(): void {
    const inputs = {
      settingName: this.settingName,
      settingType: this.type,
      viewContainerReference: this.viewContainerReference,
    };
    this.settingButtonService.mapButtonActions(inputs);
  }
}
