// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

import { TestBed, waitForAsync } from '@angular/core/testing';
import { expect } from 'expect';
import { APP_INIT_STATE_TOKEN } from '../../../utilities/constants';
import { AppStateType, newAppState } from '../../models/state/app-state.model';
import { StateService } from '../../state-management/state.service';
import { ElectronIpcService } from '../electron-ipc/electron-ipc.service';
import { LCSCommunicatorService } from '../lcs-communicator/lcs-communicator.service';
import { DeviceSettingsManagerService } from './device-settings-manager.service';
import { LCSDeviceSettingResponse } from '../../models/lcs-responses/device-setting-response';
import { LCSDeviceSettingsMetadataResponse } from '../../models/lcs-responses/device-settings-metadata';
import { DeviceSettingUI } from '../../models/ui/device-setting-ui';
import { DeviceUI } from '../../models/ui/device-ui.model';
import { DeviceManagerService } from '../device-manager/device-manager.service';
import { of } from 'rxjs';

const SOME_DEVICE_ID = 'someDeviceId';
const SOME_DEVICE_SETTING_ID = 'someDeviceSettingId';

const device = {
  id: '123',
  productName: 'Test Device',
  attached: true,
  parentId: 'parent',
  parent: { attached: true },
};

const deviceManagerServiceMock = {
  getDeviceById(_id: string) {
    return of(device);
  },
  selectedDevice$: of(device),
  selectedDeviceRaw$: of({ device }),
};

describe('DeviceSettingsManagerService', () => {
  const mockElectronIpcService = { receive: jest.fn(), send: jest.fn() };
  jest.spyOn(mockElectronIpcService, 'receive');
  jest.spyOn(mockElectronIpcService, 'send');

  let service: DeviceSettingsManagerService;
  let stateService: StateService<AppStateType>;
  let lcsCommunicator: LCSCommunicatorService;
  let lcsCommunicatorAddListenerSpy: unknown;
  let lcsCommunicatorSendToLCSSpy: unknown;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        StateService,
        LCSCommunicatorService,
        {
          provide: DeviceManagerService,
          useValue: deviceManagerServiceMock,
        },
        {
          provide: ElectronIpcService,
          useValue: mockElectronIpcService,
        },
        { provide: APP_INIT_STATE_TOKEN, useValue: newAppState() },
      ],
    });
    stateService = TestBed.inject(StateService<AppStateType>);
    lcsCommunicatorAddListenerSpy = jest.spyOn(
      TestBed.inject(LCSCommunicatorService),
      'addListener'
    );
    lcsCommunicatorSendToLCSSpy = jest.spyOn(
      TestBed.inject(LCSCommunicatorService),
      'sendToLCS'
    );
    service = TestBed.inject(DeviceSettingsManagerService);
    lcsCommunicator = TestBed.inject(LCSCommunicatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add LCS listeners', () => {
    expect(lcsCommunicatorAddListenerSpy).toHaveBeenNthCalledWith(
      1,
      LCSDeviceSettingResponse.type,
      expect.any(Function)
    );
    expect(lcsCommunicatorAddListenerSpy).toHaveBeenNthCalledWith(
      2,
      LCSDeviceSettingsMetadataResponse.type,
      expect.any(Function)
    );
  });

  xit('should trigger settings metadata hook ', waitForAsync(() => {
    const d = new DeviceUI('id123', 'device name', 'sn123', 'online');
    stateService.initialize({
      ...newAppState(),
      selectedDevice: {
        device: d,
        deviceId: d.deviceId,
        settingsMetadata: [],
      },
    });
    expect(lcsCommunicatorSendToLCSSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        deviceId: 'id123',
        type: 'GetDeviceSettingsMetadata',
      })
    );
  }));

  describe('loadDeviceSetting', () => {
    it('should send message to get device setting value', () => {
      jest.spyOn(lcsCommunicator, 'sendToLCS');
      service.loadDeviceSetting(SOME_DEVICE_ID, SOME_DEVICE_SETTING_ID);
      expect(lcsCommunicator.sendToLCS).toHaveBeenCalledWith(
        expect.objectContaining({
          deviceId: SOME_DEVICE_ID,
          name: SOME_DEVICE_SETTING_ID,
        })
      );
    });
  });

  describe('setDeviceSetting', () => {
    it('should send request to set device setting value', () => {
      jest.spyOn(lcsCommunicator, 'sendToLCS');
      const updatedDeviceSetting = new DeviceSettingUI(
        SOME_DEVICE_SETTING_ID,
        'boolean',
        'true'
      );
      service.setDeviceSetting(SOME_DEVICE_ID, updatedDeviceSetting);
      expect(lcsCommunicator.sendToLCS).toHaveBeenCalledWith(
        expect.objectContaining({
          deviceId: SOME_DEVICE_ID,
        })
      );
    });
  });
});
