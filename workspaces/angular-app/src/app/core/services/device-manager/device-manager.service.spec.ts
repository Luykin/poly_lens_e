// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

import { TestBed, waitForAsync } from '@angular/core/testing';
import { expect } from 'expect';
import { APP_INIT_STATE_TOKEN } from '../../../utilities/constants';
import { newAppState } from '../../models/state/app-state.model';
import { StateService } from '../../state-management/state.service';
import { ElectronIpcService } from '../electron-ipc/electron-ipc.service';
import { DeviceManagerService } from './device-manager.service';
import { LCSCommunicatorService } from '../lcs-communicator/lcs-communicator.service';
import { LCSDeviceListResponse } from '../../models/lcs-responses/device-list';
import { LCSDeviceAttachedResponse } from '../../models/lcs-responses/device-attached';
import { LCSDeviceDetachedResponse } from '../../models/lcs-responses/device-detached';

describe('DeviceManagerService', () => {
  const mockElectronIpcService = { receive: jest.fn(), send: jest.fn() };
  jest.spyOn(mockElectronIpcService, 'receive');
  jest.spyOn(mockElectronIpcService, 'send');

  let service: DeviceManagerService;
  let electronIpcService: ElectronIpcService;
  let lcsCommunicator: LCSCommunicatorService;
  let lcsCommunicatorAddListenerSpy: unknown;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        StateService,
        LCSCommunicatorService,
        {
          provide: ElectronIpcService,
          useValue: mockElectronIpcService,
        },
        { provide: APP_INIT_STATE_TOKEN, useValue: newAppState() },
      ],
    });
    lcsCommunicatorAddListenerSpy = jest.spyOn(
      TestBed.inject(LCSCommunicatorService),
      'addListener'
    );
    service = TestBed.inject(DeviceManagerService);
    lcsCommunicator = TestBed.inject(LCSCommunicatorService);
    electronIpcService = TestBed.inject(ElectronIpcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add LCS listeners', () => {
    expect(lcsCommunicatorAddListenerSpy).toHaveBeenNthCalledWith(
      1,
      LCSDeviceListResponse.type,
      expect.any(Function)
    );
    expect(lcsCommunicatorAddListenerSpy).toHaveBeenNthCalledWith(
      2,
      LCSDeviceAttachedResponse.type,
      expect.any(Function)
    );
    expect(lcsCommunicatorAddListenerSpy).toHaveBeenNthCalledWith(
      3,
      LCSDeviceDetachedResponse.type,
      expect.any(Function)
    );
  });

  it('should return deviceList array', waitForAsync(() => {
    service.deviceList$.subscribe((deviceList) => {
      expect(deviceList).toEqual(expect.any(Array));
    });
  }));

  it('should send GetDeviceList message', () => {
    service.loadDeviceList();
    expect(electronIpcService.send).toHaveBeenCalled();
  });

  describe('loadDeviceList', () => {
    it('should send request to load devices', () => {
      jest.spyOn(lcsCommunicator, 'sendToLCS');
      service.loadDeviceList();
      expect(lcsCommunicator.sendToLCS).toHaveBeenCalled();
    });
  });
});
