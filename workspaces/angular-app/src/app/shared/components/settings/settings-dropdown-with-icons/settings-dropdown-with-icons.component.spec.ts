// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { expect } from 'expect';
import { SettingsDropdownWithIconsComponent } from './settings-dropdown-with-icons.component';
import { APP_INIT_STATE_TOKEN } from 'src/app/utilities/constants';
import { StateService } from 'src/app/core/state-management/state.service';
import { newAppState } from 'src/app/core/models/state/app-state.model';
import {
  TranslateFakeLoader,
  TranslateLoader,
  TranslateModule,
} from '@ngx-translate/core';

describe('DeviceSettingsDropdownWithIconsComponent', () => {
  let component: SettingsDropdownWithIconsComponent;
  let fixture: ComponentFixture<SettingsDropdownWithIconsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SettingsDropdownWithIconsComponent],
      imports: [
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader,
          },
        }),
      ],
      providers: [
        { provide: APP_INIT_STATE_TOKEN, useValue: newAppState() },
        StateService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsDropdownWithIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
