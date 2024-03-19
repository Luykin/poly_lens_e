import { TestBed } from '@angular/core/testing';
import { expect } from 'expect';
import { APP_INIT_STATE_TOKEN } from '../../../utilities/constants';
import { newAppState } from '../../models/state/app-state.model';
import { StateService } from '../../state-management/state.service';
import { ElectronIpcService } from '../electron-ipc/electron-ipc.service';
import { LCSCommunicatorService } from './lcs-communicator.service';
import { LCSApiMessage } from 'shared-lib';

const SOME_LISTENER_NAME = 'someListener';
const DUPLICATED_LISTENER_NAME = 'duplicatedListener';

describe('LCSCommunicatorService', () => {
  const mockElectronIpcService = { receive: jest.fn(), send: jest.fn() };
  jest.spyOn(mockElectronIpcService, 'receive');
  jest.spyOn(mockElectronIpcService, 'send');

  let service: LCSCommunicatorService;
  let electronIpcService: ElectronIpcService;

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
    service = TestBed.inject(LCSCommunicatorService);
    electronIpcService = TestBed.inject(ElectronIpcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('addListener', () => {
    it('should add a new listener', () => {
      expect(() => {
        service.addListener(SOME_LISTENER_NAME, () => {});
      }).not.toThrowError();
    });

    it('should throw error on a duplicated listener', () => {
      service.addListener(DUPLICATED_LISTENER_NAME, () => {});
      expect(() => {
        service.addListener(DUPLICATED_LISTENER_NAME, () => {});
      }).toThrowError();
    });

    it('should not throw error on a duplicated listener when overwrite is allowed', () => {
      service.addListener(DUPLICATED_LISTENER_NAME, () => {});
      expect(() => {
        service.addListener(DUPLICATED_LISTENER_NAME, () => {}, true);
      }).not.toThrowError();
    });
  });

  describe('removeListener', () => {
    it('should remove listener', () => {
      // first to add any
      service.addListener(SOME_LISTENER_NAME, () => {});
      // than let's remove it
      service.removeListener(SOME_LISTENER_NAME);
      // not to throw as it's removed previously
      expect(() => {
        service.addListener(SOME_LISTENER_NAME, () => {});
      }).not.toThrowError();
    });
  });

  describe('sendToLCS', () => {
    it('should send an IPC message', () => {
      jest.spyOn(electronIpcService, 'send');
      service.sendToLCS(new LCSApiMessage());
      expect(electronIpcService.send).toHaveBeenCalled();
    });
  });
});
