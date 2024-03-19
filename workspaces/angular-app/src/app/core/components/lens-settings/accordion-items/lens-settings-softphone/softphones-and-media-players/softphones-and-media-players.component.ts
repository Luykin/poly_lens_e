// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

import { Component, Input, OnChanges } from '@angular/core';
import { cloneDeep } from 'lodash';
import { Softphone } from 'src/app/core/models/ui/softphone-ui.model';
import { LensSettingsManagerService } from 'src/app/core/services/lens-settings-manager/lens-settings-manager.service';

@Component({
  selector: 'oz-lens-settings-softphone-and-media-players',
  templateUrl: './softphones-and-media-players.component.html',
})
export class LensSettingsSoftphonesAndMediaPlayersComponent
  implements OnChanges
{
  @Input() softPhones?: Softphone[];

  public tableExpanded = false;
  public displayedSoftPhones?: Softphone[] = [];

  constructor(private lensSettingsService: LensSettingsManagerService) {}

  public ngOnChanges(): void {
    this._setDisplayedSoftPhones();
  }

  public onSoftPhoneEnabledChanged(enabled: boolean, id: string): void {
    this.lensSettingsService.setSoftphoneControl(id, enabled);
  }

  public toggleFullTableView(): void {
    this.tableExpanded = !this.tableExpanded;
    this._setDisplayedSoftPhones();
  }

  private _setDisplayedSoftPhones(): void {
    this.displayedSoftPhones = this.tableExpanded
      ? cloneDeep(this.softPhones)
      : cloneDeep(this.softPhones?.slice(0, 5));
  }
}
