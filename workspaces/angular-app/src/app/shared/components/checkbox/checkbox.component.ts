import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'oz-checkbox',
  templateUrl: './checkbox.component.html',
})
export class CheckboxComponent implements OnInit {
  isChecked: boolean = false;

  @Input() set value(newValue: boolean) {
    this.isChecked = newValue;
  }
  @Input() isDisabled?: boolean;
  @Input() checkboxId!: string;
  @Output() valueChanged = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {
    if (this.checkboxId === undefined || this.checkboxId === null) {
      throw new Error('Must provide checkboxId to checkbox component.');
    }
  }

  /**
   * @description This method is called when the checkbox value is changed.
   * It emits the new value to the parent component.
   * @param event
   */
  public onChange(event: Event): void {
    const targetElement = <HTMLInputElement>event.target;
    this.valueChanged.emit(targetElement.checked);
  }
}
