// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

import { Component } from '@angular/core';
import { UtilityService } from '../../../../services/utility/utility.service';
import { EULA_URL, PRIVACY_POLICY_URL } from 'src/app/utilities/constants';

@Component({
  selector: 'oz-lens-settings-about',
  templateUrl: './lens-settings-about.component.html',
})
export class LensSettingsAboutComponent {
  constructor() {}

  openPrivacyPolicy() {
    UtilityService.openExternalBrowser(PRIVACY_POLICY_URL);
  }

  openEula() {
    UtilityService.openExternalBrowser(EULA_URL);
  }
}
