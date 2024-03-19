import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DropdownWithIconsComponent } from './dropdown-with-icons.component';
import {
  TranslateFakeLoader,
  TranslateLoader,
  TranslateModule,
} from '@ngx-translate/core';
import { expect } from '@jest/globals';
import { FormsModule } from '@angular/forms';

const mockedFunction = () => 'Hello code reviewer ;)';

describe('DropdownWithIconsComponent', () => {
  let component: DropdownWithIconsComponent;
  let fixture: ComponentFixture<DropdownWithIconsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DropdownWithIconsComponent],
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
    fixture = TestBed.createComponent(DropdownWithIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('(emitChanges) should set value, placeholder and call onChange', () => {
    const optionTest = {
      value: 'test',
      text: 'test',
    };
    jest.spyOn(component, 'setPlaceholder').mockReturnValue(void 0);
    component.emitChanges(optionTest);
    expect(component.value).toEqual('test');
    expect(component.setPlaceholder).toHaveBeenCalled();
  });

  it('(writeValue) should set value and placeholder', () => {
    const valueTest = 'test';
    jest.spyOn(component, 'setPlaceholder').mockReturnValue(void 0);
    component.writeValue(valueTest);
    expect(component.value).toEqual(valueTest);
    expect(component.setPlaceholder).toHaveBeenCalled();
  });

  it('(setPlaceholder) should set placeholder', () => {
    const testString = 'test';
    component.value = '';
    component.placeholder = testString;
    component.setPlaceholder();
    expect(component.placeholderText).toEqual(testString);
    expect(component.placeholderIcons).toEqual([]);
  });

  it('(setPlaceholder) should set placeholder on non-empty value', () => {
    const testString = 'test';
    component.value = 'test2';
    component.placeholder = testString;
    component.options = [
      {
        value: 'test1',
        text: 'test1',
        icons: [],
      },
      {
        value: 'test2',
        text: 'test2',
        icons: [],
      },
    ];
    component.setPlaceholder();
    expect(component.placeholderText).toEqual('test2');
    expect(component.placeholderIcons).toEqual([]);
  });

  it('(setPlaceholder) should set placeholder on non-empty value with icons', () => {
    const testString = 'test';
    component.value = 'test2';
    component.placeholder = testString;
    component.options = [
      {
        value: 'test1',
        text: 'test1',
        icons: [{ name: 'icon1', size: 5 }],
      },
      {
        value: 'test2',
        text: 'test2',
        icons: [{ name: 'icon2', size: 5 }],
      },
    ];
    component.setPlaceholder();
    expect(component.placeholderText).toEqual('test2');
    expect(component.placeholderIcons).toEqual([{ name: 'icon2', size: 5 }]);
  });

  it('(registerOnChange) should set function', () => {
    component.registerOnChange(mockedFunction);
    expect(component['_onChange']).toEqual(mockedFunction);
  });

  it('(registerOnTouched) should set function', () => {
    component.registerOnTouched(mockedFunction);
    expect(component['_onTouched']).toEqual(mockedFunction);
  });

  it('(toggleDropdown) should toggle dropdown', () => {
    component.scrollIntoView = true;
    jest.useFakeTimers();
    jest.spyOn(window, 'setTimeout');
    component.toggleDropdown();
    expect(component.openDropdown).toEqual(true);
    expect(setTimeout).toHaveBeenCalled();
  });

  it('(toggleDropdown) should not settimeout for toggle dropdown', () => {
    component.scrollIntoView = false;
    jest.useFakeTimers();
    jest.spyOn(window, 'setTimeout');
    component.toggleDropdown();
    expect(component.openDropdown).toEqual(true);
    expect(setTimeout).toHaveBeenCalledTimes(0);
  });

  it('should simulate click and touch', () => {
    component.disabled = false;
    document.dispatchEvent(new MouseEvent('click'));
    expect(component.openDropdown).toBe(false);
  });
});
