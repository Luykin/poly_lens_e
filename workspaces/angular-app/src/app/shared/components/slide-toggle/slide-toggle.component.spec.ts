// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SlideToggleComponent } from './slide-toggle.component';
import { expect } from '@jest/globals';
import { ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';

describe('SlideToggle', () => {
  let component: SlideToggleComponent;
  let fixture: ComponentFixture<SlideToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SlideToggleComponent],
      imports: [FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SlideToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('writeValue', () => {
    it('should set value', () => {
      // Arrange
      component.value = false;

      // Act
      component.writeValue(true);

      // Assert
      expect(component.value).toBe(true);
    });

    it('should mark for check', () => {
      // Arrange
      const changeDetecotorReference =
        fixture.debugElement.injector.get(ChangeDetectorRef);
      jest.spyOn(
        changeDetecotorReference.constructor.prototype,
        'markForCheck'
      );

      // Act
      component.writeValue(true);

      // Assert
      expect(changeDetecotorReference.markForCheck).toHaveBeenCalledWith();
    });
  });

  describe('setDisabledState', () => {
    it('should set isDisabled', () => {
      // Arrange
      component.isDisabled = false;

      // Act
      component.setDisabledState(true);

      // Assert
      expect(component.isDisabled).toBe(true);
    });
  });

  describe('onChange', () => {
    it('should call populateChange if waitForAnimation is set to false', () => {
      // Arrange
      jest.spyOn(component, 'populateChange');

      // Act
      component.onChange(true);

      // Assert
      expect(component.populateChange).toHaveBeenNthCalledWith(1, true);
    });

    it('should not call populateChange if waitForAnimation is set to true', () => {
      // Arrange
      component.waitForAnimation = true;
      jest.spyOn(component, 'populateChange');

      // Act
      component.onChange(true);

      // Assert
      expect(component.populateChange).not.toHaveBeenCalled();
    });

    it('should call waitForAnimationToComplete if waitForAnimation is set to true', () => {
      // Arrange
      component.waitForAnimation = true;
      jest.spyOn(component, 'waitForAnimationToComplete');

      // Act
      component.onChange(true);

      // Assert
      expect(component.waitForAnimationToComplete).toHaveBeenNthCalledWith(
        1,
        true
      );
    });

    it('should not call waitForAnimationToComplete if waitForAnimation is set to false', () => {
      // Arrange
      jest.spyOn(component, 'waitForAnimationToComplete');

      // Act
      component.onChange(true);

      // Assert
      expect(component.waitForAnimationToComplete).not.toHaveBeenCalled();
    });
  });

  describe('waitForAnimationToComplete', () => {
    it('should call populateChange after animationTimeout', () => {
      // Arrange
      jest.spyOn(component, 'populateChange');
      jest.useFakeTimers();

      // Act
      component.waitForAnimationToComplete(true);
      jest.advanceTimersByTime(component.animationTimeout);

      // Assert
      expect(component.populateChange).toHaveBeenNthCalledWith(1, true);
    });
  });
});
