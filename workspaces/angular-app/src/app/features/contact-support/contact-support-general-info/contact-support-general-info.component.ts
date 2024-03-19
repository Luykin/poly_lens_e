import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import {
  COMMUNITY_URL,
  CONTACT_SUPPORT_URL,
  DOCUMENTATION_URL,
} from 'src/app/utilities/constants';

@Component({
  selector: 'oz-contact-support-general-info',
  templateUrl: './contact-support-general-info.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactSupportGeneralInfoComponent {
  handleOpenSupport(): void {
    UtilityService.openExternalBrowser(CONTACT_SUPPORT_URL);
  }

  handleOpenCommunity(): void {
    UtilityService.openExternalBrowser(COMMUNITY_URL);
  }

  handleOpenDocumentation(): void {
    UtilityService.openExternalBrowser(DOCUMENTATION_URL);
  }
}
