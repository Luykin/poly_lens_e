import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  forwardRef,
  HostListener,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface Icon {
  name: string;
  size: number;
}
export interface Option {
  value: string;
  text: string;
  icons?: Icon[];
  disabled?: boolean;
  params?: { [key: string]: string | number };
}

export type Options = Array<Option>;

@Component({
  selector: 'oz-dropdown-with-icons',
  templateUrl: './dropdown-with-icons.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownWithIconsComponent),
      multi: true,
    },
  ],
})
export class DropdownWithIconsComponent implements ControlValueAccessor {
  @Input() options!: Option[];
  @Input() additionalOptions?: Option[];
  @Input() placeholder: string = '';
  @Input() disabled: boolean = false;
  @Input() scrollIntoView: boolean = false;
  @Input() translateOptions: boolean = false;

  @ViewChild('dropdownWithIcons') dropdownRef!: ElementRef<HTMLElement>;
  @ViewChild('dropdownInput') dropdownInputRef!: ElementRef<HTMLElement>;
  @ViewChild('dropdownList') dropdownListRef!: ElementRef<HTMLElement>;

  value: string = '';
  placeholderText: string = '';
  placeholderIcons: Icon[] = [];
  openDropdown: boolean = false;

  constructor() {}

  private _onChange = (_: string) => {};
  private _onTouched = (_: string) => {};

  emitChanges(option: Option) {
    this.value = option.value;
    this.setPlaceholder();
    this._onChange(this.value);
  }

  writeValue(value: string): void {
    this.value = value;
    this.setPlaceholder();
  }

  setPlaceholder(): void {
    if (this.value) {
      for (const option of this.options) {
        if (option.value === this.value) {
          this.placeholderText = option.text;
          this.placeholderIcons = option.icons?.length ? option.icons : [];
        }
      }
    } else {
      this.placeholderText = this.placeholder;
      this.placeholderIcons = [];
    }
  }

  registerOnChange(callback: () => void): void {
    this._onChange = callback;
  }

  registerOnTouched(callback: () => void): void {
    this._onTouched = callback;
  }

  toggleDropdown(): void {
    this.openDropdown = !this.openDropdown;
    if (this.scrollIntoView && this.openDropdown) {
      setTimeout(() => {
        this.dropdownListRef?.nativeElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest',
        });
      }, 200);
    }
  }

  trackByFn(index: number): number {
    return index;
  }

  @HostListener('document:click', ['$event'])
  @HostListener('document:touchstart', ['$event'])
  onClick(event: PointerEvent | TouchEvent): void {
    const dropdownReferenceInPath = event
      .composedPath()
      .find((_event: EventTarget) => {
        return _event === this.dropdownRef?.nativeElement;
      });
    const dropdownInputReferenceInPath = event
      .composedPath()
      .find((_event: EventTarget) => {
        return _event === this.dropdownInputRef?.nativeElement;
      });
    const dropdownListReferenceInPath = event
      .composedPath()
      .find((_event: EventTarget) => {
        return _event === this.dropdownListRef?.nativeElement;
      });
    if (this.disabled && dropdownInputReferenceInPath) {
      event.preventDefault();
      return;
    }
    const isClickIn =
      !!dropdownReferenceInPath ||
      !!dropdownInputReferenceInPath ||
      !!dropdownListReferenceInPath;
    if (isClickIn) {
      this.toggleDropdown();
    } else {
      this.openDropdown = false;
    }
  }
}
