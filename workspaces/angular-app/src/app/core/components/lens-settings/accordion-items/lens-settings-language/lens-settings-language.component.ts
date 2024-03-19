// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslatedOption } from 'src/app/shared/components/dropdown/dropdown.component';

@Component({
  selector: 'oz-lens-settings-language',
  templateUrl: './lens-settings-language.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LensSettingsLanguageComponent implements OnInit {
  selectedLanguage!: string;
  languages!: TranslatedOption[];

  constructor(private translateService: TranslateService) {}

  public ngOnInit(): void {
    this.selectedLanguage =
      this.translateService.currentLang || this.translateService.defaultLang;
    this.setLanguages();
  }

  public onLanguageChange(language: string): void {
    this.translateService.use(language);
  }

  public setLanguages(): void {
    const languages = this.translateService.getLangs();

    this.languages = languages.map((language: string) => {
      return {
        value: language,
        text: `LANGUAGES.${language}`,
      };
    });
  }
}
