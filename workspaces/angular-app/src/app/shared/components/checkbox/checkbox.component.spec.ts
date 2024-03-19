import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CheckboxComponent } from './checkbox.component';
import { expect } from '@jest/globals';

describe('CheckboxComponent', () => {
  let component: CheckboxComponent;
  let fixture: ComponentFixture<CheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CheckboxComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckboxComponent);
    component = fixture.componentInstance;
  });

  it('should update isChecked when value input changes', () => {
    // Set checkboxId and value
    component.checkboxId = 'checkbox-id-test-1';
    component.value = true;

    // Trigger change detection
    fixture.detectChanges();

    // Check if isChecked is updated
    expect(component.isChecked).toBeTruthy();
  });

  it('should emit valueChanged event on checkbox toggle', () => {
    // Set checkboxId
    component.checkboxId = 'checkbox-id-test-2';
    let emittedValue: boolean | undefined;
    component.valueChanged.subscribe((value) => (emittedValue = value));

    const checkboxElement =
      fixture.debugElement.nativeElement.querySelector('input');
    // Simulate a click event on the checkbox
    checkboxElement.click();
    fixture.detectChanges();

    // Check if valueChanged event was emitted
    expect(emittedValue).toBeTruthy();
  });

  it('should throw an error if checkboxId is not provided', () => {
    expect(() => component.ngOnInit()).toThrowError(
      'Must provide checkboxId to checkbox component.'
    );
  });
});
