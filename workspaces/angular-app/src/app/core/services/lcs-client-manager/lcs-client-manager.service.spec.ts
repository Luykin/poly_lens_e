// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

import { TestBed } from '@angular/core/testing';
import { expect } from 'expect';
import { LCSClientManagerService } from './lcs-client-manager.service';
import { ElectronIpcService } from '../electron-ipc/electron-ipc.service';
import { APP_INIT_STATE_TOKEN } from '../../../utilities/constants';
import { newAppState } from '../../models/state/app-state.model';
import { LCSCommunicatorService } from '../lcs-communicator/lcs-communicator.service';
import { LCSClientRegisteredResponse } from '../../models/lcs-responses/client-registered';

describe('LCSClientManager', () => {
  const mockElectronIpcService = { receive: jest.fn(), send: jest.fn() };
  jest.spyOn(mockElectronIpcService, 'receive');
  jest.spyOn(mockElectronIpcService, 'send');

  let service: LCSClientManagerService;
  let electronIpcService: ElectronIpcService;
  let lcsCommunicatorAddListenerSpy: unknown;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
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
    service = TestBed.inject(LCSClientManagerService);
    electronIpcService = TestBed.inject(ElectronIpcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add LCS listeners', () => {
    expect(lcsCommunicatorAddListenerSpy).toHaveBeenNthCalledWith(
      1,
      LCSClientRegisteredResponse.type,
      expect.any(Function)
    );
  });

  describe('requestLcsConnectionStatus', () => {
    it('should send request for connection status', () => {
      jest.spyOn(electronIpcService, 'send');
      service.requestLcsConnectionStatus();
      expect(electronIpcService.send).toHaveBeenCalled();
    });
  });
});
