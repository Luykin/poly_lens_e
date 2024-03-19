// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

import { Component, DestroyRef, OnInit, effect, inject } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { DeviceCommonSettingsService } from 'src/app/core/services/device-common-settings/device-common-settings.service';
import { DeviceManagerService } from 'src/app/core/services/device-manager/device-manager.service';
import {
  CreateSettingsService,
  SettingsComponentData,
} from '../../shared/services/settings/create-settings.service';
import {
  AccordionCategory,
  AccordionSetting,
} from 'src/app/shared/components/accordion/accordion-settings.model';
import {
  UpdateSettingsService,
  UpdateSetting,
} from '../../shared/services/settings/update-settings.service';
import { DeviceSettingsManagerService } from '../../core/services/device-settings-manager/device-settings-manager.service';
import { DeviceSettingMetadataUI } from '../../core/models/ui/device-setting-metadata-ui.model';
import { throttleTime } from 'rxjs';
import { Router } from '@angular/router';
import { SingleDeviceSettingsState } from 'src/app/core/models/state/device-settings-state.model';
import { SelectedDevice } from 'src/app/core/models/state/selected-device.model';

export interface DeviceSettingsCategories {
  settingsMetadata: AccordionSetting[];
  components: SettingsComponentData[];
}

@Component({
  selector: 'oz-device-settings',
  templateUrl: './device-settings.component.html',
  providers: [CreateSettingsService],
})
export class DeviceSettingsComponent implements OnInit {
  categories: AccordionCategory[] = [];
  settingsForCategory: DeviceSettingsCategories[] = [];
  loading = true;

  private _destroyRef = inject(DestroyRef);
  private _selectedCategory: number = -1;
  private _deviceSignal = toSignal(this.deviceManager.selectedDeviceRaw$);
  private _settingsValueSignal = toSignal(
    this.deviceSettingsManager.settingsForSelectedDevice$.pipe(
      throttleTime(250, undefined, { leading: true, trailing: true })
    )
  );
  private _settingsMetadataSignal = toSignal(
    this.deviceSettingsManager.settingsMetadataForDevice$
  );
  private _mappedSettingsValue: {
    [key: string]: string | number | boolean | undefined;
  } = {};

  constructor(
    private deviceManager: DeviceManagerService,
    private deviceSettingsManager: DeviceSettingsManagerService,
    private globalListOfSettings: DeviceCommonSettingsService,
    private createSettingsService: CreateSettingsService,
    private updateSettingsService: UpdateSettingsService,
    private deviceSettingsManagerService: DeviceSettingsManagerService,
    private router: Router
  ) {
    effect(() => {
      const settings = this._settingsValueSignal();
      const settingsMetadata = this._settingsMetadataSignal();
      const device = this._deviceSignal();

      // This will run throughout the settings and set values for
      // loaded components inside the accordion category
      this._setValuesForComponents(settings);

      // Prepare Categories
      if (settingsMetadata) {
        this._prepareCategories(settingsMetadata);
      }

      // Go to overview page if device is not attached
      this._goToOverviewPage(device);
    });
  }

  public ngOnInit(): void {
    this._listenForSettingsUpdates();
  }

  private _setValuesForComponents(
    settings: SingleDeviceSettingsState | undefined
  ): void {
    if (settings) {
      const settingsKeys = Object.keys(settings);

      for (const settingKey of settingsKeys) {
        const setting = settings[settingKey];
        if (setting?.value !== undefined) {
          this._mappedSettingsValue[setting.name] = setting.value;
        } else if (setting?.value_compound !== undefined) {
          this._mappedSettingsValue[setting.name] = setting.value_compound.find(
            (settingCompound) => settingCompound.name === setting.name
          )?.value;
        }
      }
    }

    if (this._selectedCategory > -1) {
      const activeCategory = this.settingsForCategory[this._selectedCategory];
      const componentsInCategory = activeCategory.components;

      this._pushValuesToComponents(componentsInCategory);
    }
  }

  private _goToOverviewPage(device: SelectedDevice | undefined): void {
    if (device?.device.attached === false) {
      this.router.navigate(['/detail', device.deviceId, 'overview']);
    }
  }

  private _prepareCategories(
    settingsMetadata: DeviceSettingMetadataUI[]
  ): void {
    if (settingsMetadata.length > 0) {
      const settingNames: string[] = settingsMetadata.map(
        (settingMetadata) => settingMetadata.name
      );

      this.categories =
        this.globalListOfSettings.getDistinctCategoriesForSettings(
          settingNames
        );

      for (const category of this.categories) {
        const settingsMetadataForCategory = category.settings.filter(
          (setting) => settingNames.includes(setting.id)
        );

        this.settingsForCategory.push({
          settingsMetadata: settingsMetadataForCategory,
          components: settingsMetadataForCategory.map((setting) =>
            this._createComponentInstance(setting, settingsMetadata)
          ),
        });
      }

      // Disable loading indicator to reveal the order settings section (upon successful categories generation).
      this.loading = false;
    }
  }

  private _createComponentInstance(
    setting: AccordionSetting,
    settingsMetadata: DeviceSettingMetadataUI[],
    isChild = false
  ) {
    const component = this.createSettingsService.getSettingComponentByValueType(
      setting.type
    );

    let availableOptions;

    for (const sm of settingsMetadata) {
      if (sm.meta?.type === 'compound') {
        availableOptions = sm?.meta.value_compound?.find((ss) => {
          return ss.name === setting.id;
        })?.possible_values;

        if (availableOptions) {
          break;
        }
      } else if (sm.name === setting.id) {
        availableOptions = sm ? sm?.meta?.possible_values : undefined;
        break;
      }
    }

    const componentInstance = component(
      setting,
      this._mappedSettingsValue[setting.id] || undefined,
      availableOptions
    );

    componentInstance.inputs.isChild = isChild;

    if (setting.subsettings?.length) {
      const settingNames = new Set(
        settingsMetadata.map((settingMetadata) => settingMetadata.name)
      );
      const subsettingsMetadata = setting.subsettings?.filter((setting) =>
        settingNames.has(setting.id)
      );
      const children = subsettingsMetadata?.map((subSetting) => {
        return this._createComponentInstance(
          subSetting,
          settingsMetadata,
          true
        );
      });

      componentInstance.inputs.childrenComponents = children;
    }

    return componentInstance;
  }

  /**
   * Requests to load settings values for selected category
   */
  public getValuesForCategory(categoryIndex: number): void {
    this._selectedCategory = categoryIndex;

    const device = this._deviceSignal();
    const activeCategory = this.settingsForCategory[categoryIndex];
    const flatSettingsInCategory = this.globalListOfSettings.flatSettings(
      activeCategory.settingsMetadata
    );
    const categorySettingNames = flatSettingsInCategory.map((s) => s.id);

    for (const settingName of categorySettingNames) {
      this.deviceSettingsManager.loadDeviceSetting(
        device!.device.deviceId,
        settingName
      );
    }
  }

  /**
   * Will update all components with settings values
   */
  private _pushValuesToComponents(components: SettingsComponentData[]): void {
    for (const component of components) {
      const settingName = component.inputs.settingName as string;
      const settingValue = this._mappedSettingsValue[settingName];

      if (settingValue !== undefined) {
        const mappedValue = this._mapLCSUIValue(
          settingName,
          settingValue,
          true
        );

        component.inputs.selectedValue = mappedValue;
      }

      // Do the same for child components
      if (component.inputs.childrenComponents) {
        const children = component.inputs
          .childrenComponents as SettingsComponentData[];

        component.inputs.childrenComponents = [...children];

        this._pushValuesToComponents(children);
      }
    }
  }

  private _listenForSettingsUpdates(): void {
    this.updateSettingsService
      .onUpdate$()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((update: UpdateSetting) => {
        const settingsMetadata = this._settingsMetadataSignal();
        const setting = settingsMetadata!.find(
          (setting) => setting.name === update.settingName
        );

        if (setting && this._deviceSignal()) {
          const settingPayload = {
            name: update.settingName,
            type: setting.meta.type,
            value: update.value,
          };

          this.deviceSettingsManagerService.setDeviceSetting(
            this._deviceSignal()!.device.deviceId,
            settingPayload
          );
        }
      });
  }

  private _mapLCSUIValue(
    settingName: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    settingValue: any,
    returnUIValue: boolean
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): any {
    const settingConfiguration =
      this.globalListOfSettings.getSettingByName(settingName);
    if (settingConfiguration && settingConfiguration.valueRules) {
      const rules = settingConfiguration.valueRules;
      if (returnUIValue) {
        const uiRepresentativeValueList = Object.keys(rules);
        for (const uiValue of uiRepresentativeValueList) {
          if (rules[uiValue] === settingValue) {
            return uiValue;
          }
        }
        return settingValue; // fallback
      } else {
        return rules[settingValue as string];
      }
    }
    return settingValue;
  }
}
