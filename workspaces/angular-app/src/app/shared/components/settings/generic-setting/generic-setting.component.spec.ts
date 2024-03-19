// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { expect } from 'expect';
import {
  TranslateModule,
  TranslateLoader,
  TranslateFakeLoader,
} from '@ngx-translate/core';
import { GenericSettingComponent } from './generic-setting.component';
import { DeviceManagerService } from 'src/app/core/services/device-manager/device-manager.service';
import { APP_INIT_STATE_TOKEN } from 'src/app/utilities/constants';
import { of } from 'rxjs';
import { newAppState } from 'src/app/core/models/state/app-state.model';
import { StateService } from 'src/app/core/state-management/state.service';
import { DeviceSettingsManagerService } from 'src/app/core/services/device-settings-manager/device-settings-manager.service';

const device = {
  id: '123',
  productName: 'Test Device',
  attached: true,
  parentId: 'parent',
  parent: { attached: true },
};

const deviceSettingUI = {
  auto_mode: false,
  meta: undefined,
  name: 'Test setting',
};

const deviceManagerServiceMock = {
  getDeviceById(_id: string) {
    return of(device);
  },
  selectedDevice$: of(device),
};

const deviceSettingsManagerServiceMock = {
  loadDeviceSetting(_deviceId: string, _settingName: string) {},
  deviceSelectedSettings$: of(deviceSettingUI),
};

describe('GenericSettingComponent', () => {
  let component: GenericSettingComponent;
  let fixture: ComponentFixture<GenericSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GenericSettingComponent],
      imports: [
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader,
          },
        }),
      ],
      providers: [
        { provide: DeviceManagerService, useValue: deviceManagerServiceMock },
        {
          provide: DeviceSettingsManagerService,
          useValue: deviceSettingsManagerServiceMock,
        },
        { provide: APP_INIT_STATE_TOKEN, useValue: newAppState() },
        StateService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GenericSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
