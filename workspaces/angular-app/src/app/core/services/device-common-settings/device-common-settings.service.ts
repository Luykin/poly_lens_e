import { Injectable } from '@angular/core';
import * as deviceCommonSettings from './device-common-settings';
import {
  AccordionCategory,
  AccordionSetting,
} from '../../../shared/components/accordion/accordion-settings.model';

@Injectable({
  providedIn: 'root',
})
export class DeviceCommonSettingsService {
  private deviceSettings: AccordionCategory[] =
    deviceCommonSettings.supportedDeviceSettings;

  constructor() {}

  public getSettingsForCategory(categoryName: string): AccordionSetting[] {
    const category = this.deviceSettings.find(
      (category) => category.category === categoryName
    );
    return category
      ? [...category.settings].sort((a, b) => a.order - b.order)
      : [];
  }

  public getCategoryForSetting(
    settingName: string
  ): AccordionCategory | undefined {
    for (const category of this.deviceSettings) {
      if (
        category.settings.some(
          (setting: { id: string }) => setting.id === settingName
        )
      ) {
        return category;
      }
    }
    return undefined;
  }

  public getSettingByName(settingName: string): AccordionSetting | undefined {
    for (const category of this.deviceSettings) {
      const flatSettings = this.flatSettings(category.settings);

      const foundSetting = flatSettings.find(
        (setting: { id: string }) => setting.id === settingName
      );

      if (foundSetting) {
        return foundSetting;
      }
    }
    return undefined;
  }

  public searchSettings(query: string): AccordionSetting[] {
    const searchResults: AccordionSetting[] = [];
    for (const category of this.deviceSettings) {
      searchResults.push(
        ...category.settings.filter((setting: { id: string }) =>
          setting.id.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
    return searchResults;
  }

  public getCategoriesForSettings(settingNames: string[]): AccordionCategory[] {
    const categories = settingNames.map((name) =>
      this.deviceSettings.find((category) =>
        category.settings.some((setting: { id: string }) => setting.id === name)
      )
    );

    const uniqueCategories = [...new Set(categories)].filter(
      Boolean
    ) as AccordionCategory[];
    return uniqueCategories.sort((a, b) => a.order - b.order);
  }

  public getDistinctCategoriesForSettings(
    settingNames: string[]
  ): AccordionCategory[] {
    const categories = this.getCategoriesForSettings(settingNames);
    return [...new Set(categories)];
  }

  /**
   * Flattening a setting with sub-settings
   */
  public flatSettings(parentSettings: AccordionSetting[]): AccordionSetting[] {
    const flatSettings = [];

    for (const setting of parentSettings) {
      flatSettings.push(setting);

      // Include sub-settings as well
      if (setting.subsettings) {
        flatSettings.push(...setting.subsettings);
      }
    }

    return flatSettings;
  }
}
