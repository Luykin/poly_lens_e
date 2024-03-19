import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Softphone } from 'src/app/core/models/ui/softphone-ui.model';
import { TranslatedOption } from 'src/app/shared/components/dropdown/dropdown.component';
import { LoggingService } from '../../../../../services/logging/logging.service';

@Component({
  selector: 'oz-lens-settings-target-softphone',
  templateUrl: './target-softphone.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LensSettingsTargetSoftphoneComponent {
  @Input() softPhones!: Softphone[];

  constructor(private loggingService: LoggingService) {}

  /**
   * Handle the softphone enabled change
   *
   * @param enabled
   * @param id
   */
  public onSoftPhoneEnabledChanged(enabled: boolean, id: number): void {
    // TODO: Implement
    this.loggingService.log(enabled, id);
  }

  /**
   * Get the options for the target softphone dropdown
   */
  public get softPhoneOptions(): TranslatedOption[] {
    return this.softPhones
      .filter((softPhone) => softPhone.canBeTarget)
      .map((softPhone) => {
        return {
          value: `${softPhone.id}`,
          text: softPhone.displayName,
        } as TranslatedOption;
      });
  }
}
