import { ComponentFixture, TestBed } from '@angular/core/testing';
import { expect } from 'expect';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LensSettingsLanguageComponent } from './lens-settings-language.component';
import { DropdownComponent } from 'src/app/shared/components/dropdown/dropdown.component';

describe('LensSettingsLanguageComponent', () => {
  let component: LensSettingsLanguageComponent;
  let fixture: ComponentFixture<LensSettingsLanguageComponent>;

  let translateService: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LensSettingsLanguageComponent, DropdownComponent],
      providers: [TranslateService],
      imports: [TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(LensSettingsLanguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    translateService = TestBed.inject(TranslateService);
  });

  describe('ngOnInit', () => {
    it('should set selectedLanguage to the current language', () => {
      // Arrange
      translateService.currentLang = 'de';

      // Act
      component.ngOnInit();

      // Assert
      expect(component.selectedLanguage).toBe('de');
    });

    it('should set selectedLanguage to the default language', () => {
      // Arrange
      translateService.currentLang = '';
      translateService.defaultLang = 'fr';

      // Act
      component.ngOnInit();

      // Assert
      expect(component.selectedLanguage).toBe('fr');
    });

    it('should call setLanguages', () => {
      // Arrange
      jest.spyOn(component, 'setLanguages');

      // Act
      component.ngOnInit();

      // Assert
      expect(component.setLanguages).toHaveBeenCalled();
    });
  });

  describe('onLanguageChange', () => {
    it('should call translateService.use with the selected language', () => {
      // Arrange
      const spy = jest.spyOn(translateService, 'use');

      // Act
      component.onLanguageChange('de');

      // Assert
      expect(spy).toHaveBeenNthCalledWith(1, 'de');
    });
  });

  describe('setLanguages', () => {
    it('should set languages', () => {
      // Arrange
      translateService.addLangs(['en', 'de']);

      // Act
      component.setLanguages();

      // Assert
      expect(component.languages).toEqual([
        { value: 'en', text: 'LANGUAGES.en' },
        { value: 'de', text: 'LANGUAGES.de' },
      ]);
    });
  });
});
