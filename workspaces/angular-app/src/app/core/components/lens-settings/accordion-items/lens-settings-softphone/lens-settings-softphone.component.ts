// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

import { Component, OnInit, computed } from '@angular/core';
import { Softphone } from 'src/app/core/models/ui/softphone-ui.model';
import { LensSettingsManagerService } from 'src/app/core/services/lens-settings-manager/lens-settings-manager.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'oz-lens-settings-softphone',
  templateUrl: './lens-settings-softphone.component.html',
})
export class LensSettingsSoftphoneComponent implements OnInit {
  constructor(private lensSettingsService: LensSettingsManagerService) {}

  public softPhonesSignal = toSignal(this.lensSettingsService.softphonesList$);

  /* eslint-disable unicorn/consistent-function-scoping */
  public softphonesComputed = computed(() => {
    const softPhones = this.softPhonesSignal();

    return this._getAlphabeticallySortedSoftPhones(softPhones || []);
  });

  public ngOnInit(): void {
    this.loadSettings();
  }

  public loadSettings(): void {
    this.lensSettingsService.loadSoftphones();
  }

  private _getAlphabeticallySortedSoftPhones(
    softPhones: Softphone[]
  ): Softphone[] {
    return [
      ...softPhones.sort((a, b) => {
        return a.displayName > b.displayName ? 1 : -1;
      }),
    ];
  }
}
