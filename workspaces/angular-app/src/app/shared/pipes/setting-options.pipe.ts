import { Pipe, PipeTransform } from '@angular/core';
import { SETTINGS } from '../../utilities/constants';
import { Option } from '../components/dropdown-with-icons/dropdown-with-icons.component';

// Map options icons
const settingOptionsIcons = new Map();
settingOptionsIcons.set(SETTINGS.TRACKING_MODE, {
  conversation: {
    name: 'preview',
    size: 4.2,
    offset: { top: '2px', left: '0' },
  },
  gallery: { name: 'preview', size: 4.2, offset: { top: '2px', left: '0' } },
});

/**
 * Designed to feed device settings into an oz-dropdown component.
 * Maps the translation path of the settings in order to pass
 * properly into the oz-dropdowns use of the translate pipe.
 */
@Pipe({
  name: 'settingOptions',
})
export class SettingOptionsPipe implements PipeTransform {
  constructor() {}
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform(setting: any) {
    return setting.options.map((option: Option) => {
      const key = `DeviceSettings.${setting.id}.options.${option.value}`;
      const icons: { name: string; size: number }[] = [];
      if (settingOptionsIcons.has(setting.id)) {
        const option = settingOptionsIcons.get(setting.id);
        if (option[option]) icons.push(option[option]);
      }
      return {
        value: option,
        text: key,
        icons,
      };
    });
  }
}
