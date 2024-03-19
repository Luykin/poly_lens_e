import { Type } from '@angular/core';
import {
  AccordionSetting,
  AccordionSettingControlType,
} from 'src/app/shared/components/accordion/accordion-settings.model';
import { TranslatedOption } from 'src/app/shared/components/dropdown/dropdown.component';
import { SettingsSlideToggleComponent } from 'src/app/shared/components/settings/settings-slide-toggle/settings-slide-toggle.component';
import { SettingsButtonComponent } from 'src/app/shared/components/settings/settings-button/settings-button.component';
import { SettingsDropdownComponent } from 'src/app/shared/components/settings/settings-dropdown/settings-dropdown.component';
import { SettingsDropdownWithIconsComponent } from 'src/app/shared/components/settings/settings-dropdown-with-icons/settings-dropdown-with-icons.component';

export interface SettingsComponentData {
  component: Type<unknown>;
  inputs: Record<string, unknown>;
}

type GetComponentMethod = (
  data: AccordionSetting,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  selectedValue?: any,
  availableOptions?: string[]
) => SettingsComponentData;

export class CreateSettingsService {
  private _controlTypeToComponentMap = new Map<
    AccordionSettingControlType,
    GetComponentMethod
  >();

  constructor() {
    this._controlTypeToComponentMap.set(
      'radio',
      this._getToggleComponent.bind(this)
    );
    this._controlTypeToComponentMap.set(
      'dropdown',
      this._getDropdownComponent.bind(this)
    );
    this._controlTypeToComponentMap.set(
      'dropdown-w-icons',
      this._getDropdownWithIconsComponent.bind(this)
    );
    this._controlTypeToComponentMap.set(
      'button',
      this._getButtonComponent.bind(this)
    );
  }

  public getSettingComponentByValueType(type: AccordionSettingControlType) {
    const component = this._controlTypeToComponentMap.get(type);
    return component || this._getFallbackComponent;
  }

  private _getToggleComponent(
    data: AccordionSetting,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    selectedValue: any
  ): SettingsComponentData {
    return {
      component: SettingsSlideToggleComponent,
      inputs: {
        settingName: data.id,
        hideTitle: data.hideTitle,
        hideDescription: data.hideDescription,
        selectedValue: selectedValue,
        type: data.type,
      },
    };
  }

  private _getDropdownComponent(
    data: AccordionSetting,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    selectedValue?: any,
    availableOptions?: string[]
  ): SettingsComponentData {
    const options = this._createDropdownOptions(availableOptions || []);

    return {
      component: SettingsDropdownComponent,
      inputs: {
        settingName: data.id,
        options,
        hideTitle: data.hideTitle,
        hideDescription: data.hideDescription,
        selectedValue: selectedValue,
        type: data.type,
      },
    };
  }

  private _getDropdownWithIconsComponent(
    data: AccordionSetting,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    selectedValue?: any,
    availableOptions?: string[]
  ): SettingsComponentData {
    const options = this._createDropdownOptions(availableOptions || []);

    return {
      component: SettingsDropdownWithIconsComponent,
      inputs: {
        settingName: data.id,
        options,
        hideTitle: data.hideTitle,
        hideDescription: data.hideDescription,
        selectedValue: selectedValue,
        type: data.type,
      },
    };
  }

  private _getButtonComponent(data: AccordionSetting): SettingsComponentData {
    return {
      component: SettingsButtonComponent,
      inputs: {
        settingName: data.id,
        hideTitle: data.hideTitle,
        hideDescription: data.hideDescription,
        type: data.type,
      },
    };
  }

  private _getFallbackComponent(): SettingsComponentData {
    return {
      component: SettingsSlideToggleComponent,
      inputs: {
        settingName: 'test',
        hideTitle: false,
        hideDescription: true,
      },
    };
  }

  private _createDropdownOptions(options: string[]): TranslatedOption[] {
    return options.map((option: string) => {
      return {
        text: option,
        value: option,
      };
    });
  }
}
