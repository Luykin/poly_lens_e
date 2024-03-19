// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

import { Type } from '@angular/core';

export interface AccordionCategory {
  // this is the title text that is displayed at top of accordion
  category: string;
  settings: AccordionSetting[];
  order: number;
}

export interface LensSettingsAccordionCategory {
  // this is the title text that is displayed at top of accordion
  category: string;
  component: Type<unknown>;
}

export type AccordionSettingControlType =
  | 'radio'
  | 'dropdown'
  | 'dropdown-w-icons'
  | 'button'
  | 'slider'
  | 'up-down'
  | 'restart-device'
  | 'restore-defaults'
  | 'clear-trusted-devices';

export const ACCORDION_SETTINGS_MODALS = {
  ACOUSTIC_FENCE: {
    linkText: 'MODALS.ACOUSTIC_FENCE.LINK_TEXT',
    content: 'acousticfence',
  },
  NOISEBLOCKAI: {
    linkText: 'MODALS.NOISEBLOCKAI.LINK_TEXT',
    content: 'noiseblockai',
  },
};

export interface AccordionSetting {
  id: string;
  type: AccordionSettingControlType;
  sortAlpha?: boolean;
  modalId?: keyof typeof ACCORDION_SETTINGS_MODALS;
  appUrl?: object;
  valueRules?: AccordionValueRules;
  disabledOptions?: AccordionDisabledOptions;
  hiddenOptions?: AccordionHiddenOptions;
  // optional function to convert values before display, for example changing a range (slider) array to enumerated values
  // @example ANTI_FLICKER [ 0, 3, 1 ] (which is [ min, max, step ]) would mutate to the values [ 0, 1, 2, 3 ]
  // eslint-disable-next-line @typescript-eslint/ban-types
  mutateOptions?: Function;
  subsettings?: AccordionSetting[];
  order: number;
  hideTitle?: boolean;
  hideDescription?: boolean;
  options?: string[];
}

export type AccordionDisabledOptions = Array<string>;
export type AccordionHiddenOptions = Array<string>;
export interface AccordionValueRules {
  [key: string | number | symbol]: string | number | boolean;
  // Example:
  // true: string | boolean;
  // false: string | boolean;
}
