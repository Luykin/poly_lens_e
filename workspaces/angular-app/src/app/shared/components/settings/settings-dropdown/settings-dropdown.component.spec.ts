// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { expect } from 'expect';
import { SettingsDropdownComponent } from './settings-dropdown.component';
import { APP_INIT_STATE_TOKEN } from 'src/app/utilities/constants';
import { newAppState } from 'src/app/core/models/state/app-state.model';
import { StateService } from 'src/app/core/state-management/state.service';

describe('GenericSettingComponent', () => {
  let component: SettingsDropdownComponent;
  let fixture: ComponentFixture<SettingsDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SettingsDropdownComponent],
      providers: [
        { provide: APP_INIT_STATE_TOKEN, useValue: newAppState() },
        StateService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
