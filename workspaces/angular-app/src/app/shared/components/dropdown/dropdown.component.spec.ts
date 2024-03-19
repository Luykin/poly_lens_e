import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DropdownComponent, Placeholder } from './dropdown.component';
import { expect } from '@jest/globals';
import {
  TranslateFakeLoader,
  TranslateLoader,
  TranslateModule,
} from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

const testFunction = () => 'Hello code reviewer ;)';

describe('DropdownComponent', () => {
  let component: DropdownComponent;
  let fixture: ComponentFixture<DropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DropdownComponent],
      imports: [
        FormsModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader,
          },
        }),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('(placeholder) should test get placeholder', () => {
    const returnedPlaceholder = component.placeholder;
    expect(returnedPlaceholder).toEqual(Placeholder);
  });

  it('(writeValue) should set value and call setPlaceholder', () => {
    const valueTest = 'test';
    jest.spyOn(component, 'setPlaceholder').mockReturnValue(void 0);
    component.writeValue(valueTest);
    expect(component.value).toEqual(valueTest);
    expect(component.setPlaceholder).toHaveBeenCalled();
  });

  it('(registerOnChange) should set function', () => {
    component.registerOnChange(testFunction);
    expect(component['_onChange']).toEqual(testFunction);
  });

  it('(registerOnTouched) should set function', () => {
    component.registerOnTouched(testFunction);
    expect(component['_onTouched']).toEqual(testFunction);
  });

  it('(setPlaceholder) should sets unavailable placeholder when options are empty', () => {
    component.options = [];
    component.value = 'test';
    component.setPlaceholder();
    expect(component.currentPlaceholder.value).toEqual(
      component.placeholder.UNAVAILABLE_PLACEHOLDER
    );
    expect(component.currentPlaceholder.text).toEqual(
      'DROPDOWN.UNAVAILABLE_PLACEHOLDER'
    );
    expect(component.value).toBe(undefined);
  });

  it('(setPlaceholder) sets select placeholder when using index as value and value not found', () => {
    component.useIndexAsValue = true;
    component.value = 'test2';
    component.options = [
      {
        value: 'test1',
        text: 'test1',
      },
      {
        value: '1',
        text: 'test2',
      },
    ];
    component.setPlaceholder();
    expect(component.currentPlaceholder.value).toEqual(
      component.placeholder.SELECT_PLACEHOLDER
    );
    expect(component.currentPlaceholder.text).toEqual(
      'DROPDOWN.SELECT_PLACEHOLDER'
    );
    expect(component.value).toBe(undefined);
  });

  it('(setPlaceholder) should not set placeholder when value is found in options', () => {
    component.useIndexAsValue = false;
    component.value = 'test2';
    component.options = [
      {
        value: 'test1',
        text: 'test1',
      },
      {
        value: 'test2',
        text: 'test2',
      },
    ];
    component.setPlaceholder();
    expect(component.currentPlaceholder.value).toBeUndefined();
  });
});
