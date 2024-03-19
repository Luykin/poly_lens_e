// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UtilityService } from '../../../../../core/services/utility/utility.service';
import {
  TERMS_OF_SERVICE,
  PRIVACY_POLICY_URL,
} from '../../../../../utilities/constants';
import { of } from 'rxjs';
import {
  LensSettingAccountMetadata,
  UserInvite,
} from '../../../../models/ui/lens-settings-ui.model';

@Component({
  selector: 'oz-lens-settings-account',
  templateUrl: './lens-settings-account.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LensSettingsAccountComponent {
  public setting: LensSettingAccountMetadata = {
    action: '',
    type: '',
    title: '',
    description: '',
  }; // TO DO
  public accountSettings: object = {}; // TO DO
  public invites: UserInvite[] = []; // TO DO
  public isAuthed: boolean = false; // TO DO
  public isLoginless: boolean = false; // TO DO

  // TO DO: This is mock of service observable only!
  profile$ = of({
    given_name: 'Name',
    family_name: 'Surname',
    email: 'email@domain.com',
  });

  openTerms(): void {
    UtilityService.openExternalBrowser(TERMS_OF_SERVICE);
  }

  openPrivacy(): void {
    UtilityService.openExternalBrowser(PRIVACY_POLICY_URL);
  }
}
