// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  Input,
  forwardRef,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { timer } from 'rxjs';

@Component({
  selector: 'oz-slide-toggle',
  templateUrl: './slide-toggle.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SlideToggleComponent),
      multi: true,
    },
  ],
})
export class SlideToggleComponent implements ControlValueAccessor {
  @Input() id: string = '';
  @Input() set disabled(value: boolean) {
    this.isDisabled = value;
  }
  @Input() waitForAnimation: boolean = false;

  readonly animationTimeout: number = 360;

  changeDetector = inject(ChangeDetectorRef);
  destroyRef = inject(DestroyRef);

  value!: boolean;
  isDisabled!: boolean;

  registerOnTouched(_: () => void): void {
    return;
  }

  registerOnChange(function_: () => void): void {
    this.populateChange = function_;
  }

  writeValue(value: boolean): void {
    this.value = value;
    this.changeDetector.markForCheck();
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  populateChange: (value: boolean) => void = () => {
    return;
  };

  onChange(value: boolean): void {
    if (this.waitForAnimation) {
      this.waitForAnimationToComplete(value);
    } else {
      this.populateChange(value);
    }
  }

  waitForAnimationToComplete(value: boolean): void {
    timer(this.animationTimeout)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.populateChange(value);
      });
  }
}
