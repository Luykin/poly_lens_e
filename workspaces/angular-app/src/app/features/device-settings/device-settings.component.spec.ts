// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeviceSettingsComponent } from './device-settings.component';
import { expect } from 'expect';
import { StateService } from 'src/app/core/state-management/state.service';
import { newAppState } from 'src/app/core/models/state/app-state.model';
import { APP_INIT_STATE_TOKEN } from '../../utilities/constants';
import { TranslateModule } from '@ngx-translate/core';

describe('DeviceSettingsComponent', () => {
  let component: DeviceSettingsComponent;
  let fixture: ComponentFixture<DeviceSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeviceSettingsComponent],
      imports: [TranslateModule.forRoot()],
      providers: [
        { provide: APP_INIT_STATE_TOKEN, useValue: newAppState() },
        StateService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DeviceSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
