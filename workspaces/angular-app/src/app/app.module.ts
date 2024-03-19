// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, importProvidersFrom, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppComponent } from './app.component';
import { COMMON_APP_MODULES } from './common-modules';
import { AppLayoutComponent } from './core/components/app-layout/app-layout.component';
import { DeviceMenuComponent } from './core/components/device-menu/device-menu.component';
import { DeviceListComponent } from './core/components/sidebar/device-list/device-list.component';
import { SidebarComponent } from './core/components/sidebar/sidebar.component';
import { TitleBarComponent } from './core/components/title-bar/title-bar.component';
import { LoggingService } from './core/services/logging/logging.service';
import { StorageService } from './core/services/storage.service';
import { UtilityService } from './core/services/utility/utility.service';
import { DeviceOverviewComponent } from './features/device-overview/device-overview.component';
import { SHARED_COMPONENTS } from './shared/shared-components';
import { DeviceSettingsComponent } from './features/device-settings/device-settings.component';
import { newAppState } from './core/models/state/app-state.model';
import { APP_INIT_STATE_TOKEN } from './utilities/constants';
import { DeviceSupportComponent } from './features/device-support/device-support.component';
import { DeviceInfoAndLogsComponent } from './features/device-info-and-logs/device-info-and-logs.component';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { ToastrModule, ToastContainerDirective } from 'ngx-toastr';
import { DeviceManagerService } from './core/services/device-manager/device-manager.service';
import { DeviceSettingsManagerService } from './core/services/device-settings-manager/device-settings-manager.service';
import { DFUManagerService } from './core/services/dfu-manager/dfu-manager.service';
import { LCSClientManagerService } from './core/services/lcs-client-manager/lcs-client-manager.service';
import { ContactSupportComponent } from './features/contact-support/contact-support.component';
import { AppContactSupportComponent } from './features/contact-support/app-contact-support/app-contact-support.component';
import { DeviceContactSupportComponent } from './features/contact-support/device-contact-support/device-contact-support.component';
import { ContactSupportGeneralInfoComponent } from './features/contact-support/contact-support-general-info/contact-support-general-info.component';
import { LCSCommunicatorService } from './core/services/lcs-communicator/lcs-communicator.service';
import { LensSettingsComponent } from './core/components/lens-settings/lens-settings.component';
import { LensSettingsAboutComponent } from './core/components/lens-settings/accordion-items/lens-settings-about/lens-settings-about.component';
import { LensSettingsAccountComponent } from './core/components/lens-settings/accordion-items/lens-settings-account/lens-settings-account.component';
import { LensSettingsGeneralComponent } from './core/components/lens-settings/accordion-items/lens-settings-general/lens-settings-general.component';
import { LensSettingsLanguageComponent } from './core/components/lens-settings/accordion-items/lens-settings-language/lens-settings-language.component';
import { LensSettingsNotificationsComponent } from './core/components/lens-settings/accordion-items/lens-settings-notifications/lens-settings-notifications.component';
import { LensSettingsSoftphoneComponent } from './core/components/lens-settings/accordion-items/lens-settings-softphone/lens-settings-softphone.component';
import { LensSettingsSoftwareUpdateComponent } from './core/components/lens-settings/accordion-items/lens-settings-software-update/lens-settings-software-update.component';
import { LensSettingsSoftphonesAndMediaPlayersComponent } from './core/components/lens-settings/accordion-items/lens-settings-softphone/softphones-and-media-players/softphones-and-media-players.component';
import { LensSettingsTargetSoftphoneComponent } from './core/components/lens-settings/accordion-items/lens-settings-softphone/target-softphone/target-softphone.component';
import { PolySupportComponent } from './features/poly-support/poly-support.component';
import { ToastContainerComponent } from './core/components/toast/toast-container/toast-container.component';
import { LensSettingsManagerService } from './core/services/lens-settings-manager/lens-settings-manager.service';
import { ToastItemComponent } from './core/components/toast/toast-item/toast-item.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function emptyPromiseFactory() {
  return () => Promise.resolve();
}

@NgModule({
  declarations: [
    AppComponent,
    SHARED_COMPONENTS,
    SidebarComponent,
    AppLayoutComponent,
    DeviceListComponent,
    TitleBarComponent,
    DeviceOverviewComponent,
    DeviceMenuComponent,
    DeviceSettingsComponent,
    DeviceSupportComponent,
    DeviceInfoAndLogsComponent,
    ContactSupportComponent,
    AppContactSupportComponent,
    DeviceContactSupportComponent,
    ContactSupportGeneralInfoComponent,
    LensSettingsAboutComponent,
    LensSettingsComponent,
    LensSettingsSoftphoneComponent,
    LensSettingsAccountComponent,
    LensSettingsGeneralComponent,
    LensSettingsLanguageComponent,
    LensSettingsNotificationsComponent,
    LensSettingsSoftwareUpdateComponent,
    LensSettingsSoftphonesAndMediaPlayersComponent,
    LensSettingsTargetSoftphoneComponent,
    PolySupportComponent,
    ToastContainerComponent,
    ToastItemComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    COMMON_APP_MODULES,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    NgxSmartModalModule.forRoot(),
    ToastrModule.forRoot({ positionClass: 'inline' }),
    ToastContainerDirective,
  ],
  providers: [
    importProvidersFrom(HttpClientModule),
    LoggingService,
    UtilityService,
    {
      provide: APP_INIT_STATE_TOKEN,
      useValue: newAppState(),
    },
    {
      // To ensure that some services should be loaded on init as
      // inside are some hooks that have to be registered from the beginning.
      provide: APP_INITIALIZER,
      useFactory: emptyPromiseFactory,
      deps: [
        LensSettingsManagerService,
        LCSCommunicatorService,
        LCSClientManagerService,
        DeviceManagerService,
        DeviceSettingsManagerService,
        DFUManagerService,
        StorageService,
      ],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
