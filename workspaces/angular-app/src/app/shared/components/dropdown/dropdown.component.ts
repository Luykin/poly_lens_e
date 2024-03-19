import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface TranslatedOption {
  // if value not always set, must set useIndexAsValue
  value?: string;
  text: string;
  // this will override the text value if present and a non-empty string
  translatedText?: string;
  params?: { [key: string]: string | number };
  disabled?: boolean;
}

export enum Placeholder {
  UNAVAILABLE_PLACEHOLDER,
  SELECT_PLACEHOLDER,
}

export type TranslatedOptions = Array<TranslatedOption>;
export type DropdownPlaceholder = {
  value: DropdownValue;
  text: string;
};
export type DropdownValue = string | number | undefined;

/**
 * Note regarding translate option:
 * Optional translation of 'text' with optional 'params' of a TranslatedOption (see type above)
 * @example oz-dropdown([translate]="true", [options]="[{value: 0, text: 'GENERAL.FAVORITE_NUMBER', params: {number: 0}}]")
 *
 */
@Component({
  selector: 'oz-dropdown',
  templateUrl: './dropdown.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true,
    },
  ],
})
export class DropdownComponent implements ControlValueAccessor {
  @Input() className?: string;
  @Input() options!: TranslatedOption[];
  @Input() disabled: boolean = false;
  @Input() translateOptions: boolean = false;
  @Input() useIndexAsValue: boolean = false;

  public value: DropdownValue;
  public currentPlaceholder: DropdownPlaceholder = {
    text: '',
    value: undefined,
  };

  public get placeholder(): typeof Placeholder {
    return Placeholder;
  }

  private _onChange = (_: DropdownValue): void => {};
  private _onTouched = (_: DropdownValue): void => {};

  /**
   * Emits a change event, notifying listeners of the current value.
   *
   * @fires onChange - Triggered with the current value as its argument.
   *
   * @remarks
   * This function MUST pair with the `[value]` logic on the `option` tag in
   * the `dropdown.component.html` template to ensure proper value synchronization.
   */
  emitChanges() {
    this._onChange(this.value);
  }

  /**
   * Sets the internal value of the component and updates the placeholder.
   *
   * @param {DropdownValue} value - The new value to set.
   * @remarks
   * This function is typically used by a parent component to control the
   * selected value of the dropdown.
   */
  writeValue(value: DropdownValue): void {
    this.value = value;
    this.setPlaceholder();
  }

  /**
   * Sets a callback function to be invoked when the value changes.
   *
   * @param {() => void} callback - The callback function to register.
   * @remarks
   * This is commonly used to perform actions based on the selected value,
   * such as updating other components or triggering data fetching.
   */
  registerOnChange(callback: () => void): void {
    this._onChange = callback;
  }

  /**
   * Sets a callback function to be invoked when the component loses focus.
   *
   * @param {() => void} callback - The callback function to register.
   * @remarks
   * This can be used to perform validation or trigger side effects when
   * the user interacts with the dropdown but does not make a selection.
   */
  registerOnTouched(callback: () => void): void {
    this._onTouched = callback;
  }

  /**
   * Tracking function for Angular's `@for` loop, used for efficient option rendering.
   *
   * @param {number} index - The index of the option in the options array.
   * @param {TranslatedOption} option - The option object being tracked.
   * @returns {number | string} - The unique identifier for the option, either its index or value.
   *
   * @remarks
   * This function is crucial for performance optimization when dealing with large option lists.
   * It helps Angular determine the minimal set of changes needed in the DOM when options are added,
   * removed, or reordered, preventing unnecessary re-renders.
   */
  trackByFn(index: number, option: TranslatedOption): DropdownValue {
    return this.useIndexAsValue ? index : option.value;
  }

  /**
   * Sets the placeholder text and value based on the available options and selected value.
   *
   * @remarks
   * This function is responsible for managing the placeholder state of the dropdown,
   * ensuring it displays appropriate guidance to the user in different scenarios.
   */
  setPlaceholder(): void {
    if (!this.options || this.options.length === 0) {
      this.currentPlaceholder = {
        value: this.placeholder.UNAVAILABLE_PLACEHOLDER,
        text: 'DROPDOWN.UNAVAILABLE_PLACEHOLDER',
      };
      this.value = undefined;
      return;
    }

    const selectedOption = this.options.find((option, index) => {
      if (this.useIndexAsValue && this.value !== undefined) {
        return index === +this.value;
      }
      return option.value === this.value;
    });

    if (!selectedOption) {
      this.currentPlaceholder = {
        value: this.placeholder.SELECT_PLACEHOLDER,
        text: 'DROPDOWN.SELECT_PLACEHOLDER',
      };
      this.value = undefined;
      return;
    }

    this.currentPlaceholder = {
      value: undefined,
      text: '',
    };
  }
}
