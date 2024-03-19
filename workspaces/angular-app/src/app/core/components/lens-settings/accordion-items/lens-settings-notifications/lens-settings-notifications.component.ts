// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'oz-lens-settings-notifications',
  templateUrl: './lens-settings-notifications.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LensSettingsNotificationsComponent {
  public get enableNotificationsDisabled() {
    return true;
  }
  public get wellnessDisabled() {
    return true;
  }
  public get deviceAlertsDisabled() {
    return true;
  }
  public get softwareUpdateDisabled() {
    return true;
  }
}
