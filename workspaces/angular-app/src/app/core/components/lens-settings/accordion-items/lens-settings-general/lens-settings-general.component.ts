// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'oz-lens-settings-general',
  templateUrl: './lens-settings-general.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LensSettingsGeneralComponent {
  public get startOnSystemStartupConfigDisabled() {
    return true;
  }

  public get startMinimizedConfigDisabled() {
    return true;
  }
}
