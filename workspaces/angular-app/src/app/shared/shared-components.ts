// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

import { HomeComponent } from '../core/components/home/home.component';
import { AccordionComponent } from './components/accordion/accordion.component';
import { AccordionContent } from './components/accordion/directives/accordion-content.directive';
import { AccordionItemComponent } from './components/accordion/directives/accordion-item.directive';
import { AnimatedRouterOutletComponent } from './components/animated-router-outlet/animated-router-outlet.component';
import { BadgeComponent } from './components/badge/badge.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { ConnectionIndicatorComponent } from './components/connection-indicator/connection-indicator.component';
import { DropdownWithIconsComponent } from './components/dropdown-with-icons/dropdown-with-icons.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { DynamicCardComponent } from './components/dynamic-card/dynamic-card.component';
import { IconComponent } from './components/icon/icon.component';
import { LoadingIndicatorComponent } from './components/loading-indicator/loading-indicator.component';
import { DfuConfirmComponent } from './components/modals/dfu-confirm/dfu-confirm.component';
import { RestoreDefaultsCompleteModalComponent } from './components/modals/restore-defaults/restore-defaults-complete.component';
import { RestoreDefaultsConfirmModalComponent } from './components/modals/restore-defaults/restore-defaults-confirm.component';
import { SlideToggleComponent } from './components/slide-toggle/slide-toggle.component';
import { DeviceImagePipe } from './pipes/device-image.pipe';
import { DeviceNamePipe } from './pipes/device-name/device-name.pipe';
import { SettingOptionsPipe } from './pipes/setting-options.pipe';
import { LcsConnectionModalComponent } from './components/modals/lcs-connection/lcs-connection.component';
import { GenericSettingComponent } from './components/settings/generic-setting/generic-setting.component';
import { SettingsDropdownComponent } from './components/settings/settings-dropdown/settings-dropdown.component';
import { SettingsButtonComponent } from './components/settings/settings-button/settings-button.component';
import { SettingsSlideToggleComponent } from './components/settings/settings-slide-toggle/settings-slide-toggle.component';
import { SettingsDropdownWithIconsComponent } from './components/settings/settings-dropdown-with-icons/settings-dropdown-with-icons.component';
import { SettingInfoLinkModalComponent } from './components/modals/setting-info-link/setting-info-link.component';
import { AnyIconTooltipComponent } from './components/any-icon-tooltip/any-icon-tooltip.component';

export const SHARED_COMPONENTS = [
  AccordionComponent,
  AccordionContent,
  AccordionItemComponent,
  AccordionComponent,
  AccordionContent,
  AccordionItemComponent,
  AnimatedRouterOutletComponent,
  BadgeComponent,
  ConnectionIndicatorComponent,
  DeviceImagePipe,
  DeviceNamePipe,
  DfuConfirmComponent,
  DfuConfirmComponent,
  DropdownComponent,
  DropdownWithIconsComponent,
  DynamicCardComponent,
  HomeComponent,
  IconComponent,
  AnyIconTooltipComponent,
  LoadingIndicatorComponent,
  RestoreDefaultsCompleteModalComponent,
  RestoreDefaultsConfirmModalComponent,
  SettingOptionsPipe,
  SlideToggleComponent,
  CheckboxComponent,
  LcsConnectionModalComponent,
  GenericSettingComponent,
  SettingsDropdownComponent,
  SettingsDropdownWithIconsComponent,
  SettingsButtonComponent,
  SettingsSlideToggleComponent,
  SettingInfoLinkModalComponent,
];
