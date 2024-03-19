// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { expect } from '@jest/globals';
import { AccordionComponent } from './accordion.component';
import { QueryList } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

describe('AccordionComponent', () => {
  let component: AccordionComponent;
  let fixture: ComponentFixture<AccordionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccordionComponent],
      imports: [CommonModule, TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(AccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('toggle', () => {
    it('should not add index to expanded ids if item is disabled', () => {
      // Arrange
      component.accordionItems = Object.assign(new QueryList(), {
        _results: [{ isDisabled: true }],
      });

      // Act
      component.toggle(0);

      // Assert
      expect(component.expandedIds.size).toBe(0);
    });

    it('should delete index from expanded ids if item is already expanded', () => {
      // Arrange
      jest.spyOn(component.expandedIds, 'delete');
      component.expandedIds.add(0);

      // Act
      component.toggle(0);

      // Assert
      expect(component.expandedIds.delete).toHaveBeenNthCalledWith(1, 0);
    });

    it('should clear expanded ids if collapsible is set to true', () => {
      // Arrange
      jest.spyOn(component.expandedIds, 'clear');

      // Act
      component.toggle(0);

      // Assert
      expect(component.expandedIds.clear).toHaveBeenCalledTimes(1);
    });

    it('should not clear expanded ids if collapsible is set to false', () => {
      // Arrange
      jest.spyOn(component.expandedIds, 'clear');
      component.collapsible = false;

      // Act
      component.toggle(0);

      // Assert
      expect(component.expandedIds.clear).toHaveBeenCalledTimes(0);
    });

    it('should add index to expanded ids if item is not disabled and not expanded', () => {
      // Arrange
      jest.spyOn(component.expandedIds, 'add');

      // Act
      component.toggle(0);

      // Assert
      expect(component.expandedIds.add).toHaveBeenNthCalledWith(1, 0);
    });
  });
});
