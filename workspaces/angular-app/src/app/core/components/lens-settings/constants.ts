import { LensSettingsAccountComponent } from './accordion-items/lens-settings-account/lens-settings-account.component';
import { LensSettingsAboutComponent } from './accordion-items/lens-settings-about/lens-settings-about.component';
import { LensSettingsSoftwareUpdateComponent } from './accordion-items/lens-settings-software-update/lens-settings-software-update.component';
import { LensSettingsLanguageComponent } from './accordion-items/lens-settings-language/lens-settings-language.component';
import { LensSettingsNotificationsComponent } from './accordion-items/lens-settings-notifications/lens-settings-notifications.component';
import { LensSettingsSoftphoneComponent } from './accordion-items/lens-settings-softphone/lens-settings-softphone.component';
import { LensSettingsGeneralComponent } from './accordion-items/lens-settings-general/lens-settings-general.component';

export const LENS_SETTINGS_CATEGORIES = [
  {
    category: 'SETTINGS.Account.TITLE',
    component: LensSettingsAccountComponent,
  },
  {
    category: 'SETTINGS.General.TITLE',
    component: LensSettingsGeneralComponent,
  },
  {
    category: 'SETTINGS.Softphone.TITLE',
    component: LensSettingsSoftphoneComponent,
  },
  {
    category: 'SETTINGS.Notifications.TITLE',
    component: LensSettingsNotificationsComponent,
  },
  {
    category: 'SETTINGS.Language.TITLE',
    component: LensSettingsLanguageComponent,
  },
  {
    category: 'SETTINGS.Software Update.TITLE',
    component: LensSettingsSoftwareUpdateComponent,
  },
  {
    category: 'SETTINGS.About.TITLE',
    component: LensSettingsAboutComponent,
  },
];
