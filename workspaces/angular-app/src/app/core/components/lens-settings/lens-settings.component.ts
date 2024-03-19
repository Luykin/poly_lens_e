// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LensSettingsManagerService } from '../../services/lens-settings-manager/lens-settings-manager.service';
import { LensSettingsAccordionCategory } from 'src/app/shared/components/accordion/accordion-settings.model';
import { LENS_SETTINGS_CATEGORIES } from './constants';

@Component({
  templateUrl: './lens-settings.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LensSettingsComponent implements OnInit {
  categories: LensSettingsAccordionCategory[] = [];
  restoring = false;
  searchString: string = '';

  constructor(private lensSettingService: LensSettingsManagerService) {}

  ngOnInit(): void {
    this.categories = LENS_SETTINGS_CATEGORIES;
  }

  search(): void {
    // TODO: Search for a specific setting name
  }

  async restoreDefault() {
    this.restoring = true;
    await this.lensSettingService.restoreDefault();
    this.restoring = false;
  }
}
