// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

import { TestBed } from '@angular/core/testing';
import { expect } from 'expect';
import { APP_INIT_STATE_TOKEN } from '../../../utilities/constants';
import { newAppState } from '../../models/state/app-state.model';
import { StateService } from '../../state-management/state.service';
import { ElectronIpcService } from '../electron-ipc/electron-ipc.service';
import { LCSCommunicatorService } from '../lcs-communicator/lcs-communicator.service';
import { DFUManagerService } from './dfu-manager.service';
import { LoggingService } from '../logging/logging.service';
import { LCSDfuExecutionStatusResponse } from '../../models/lcs-responses/dfu-execution-status';
import { LCSAvailableNewerDFUResponse } from '../../models/lcs-responses/lcs-available-newer-dfu';
import { ToastrModule, ToastrService } from 'ngx-toastr';

const SOME_DEVICE_ID = 'someDeviceId';
const SOME_ARCHIVE_PATH = 'somePath';

describe('DFUManagerService', () => {
  let service: DFUManagerService;
  let lcsCommunicator: LCSCommunicatorService;
  let lcsCommunicatorAddListenerSpy: unknown;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ToastrModule.forRoot()],
      providers: [
        StateService,
        LoggingService,
        LCSCommunicatorService,
        ElectronIpcService,
        {
          provide: ToastrService,
          useValue: { success: jest.fn(), error: jest.fn() },
        },
        { provide: APP_INIT_STATE_TOKEN, useValue: newAppState() },
      ],
    });
    lcsCommunicatorAddListenerSpy = jest.spyOn(
      TestBed.inject(LCSCommunicatorService),
      'addListener'
    );
    // lcsCommunicatorSendToLCSSpy = jest.spyOn(
    //   TestBed.inject(LCSCommunicatorService),
    //   'sendToLCS'
    // );
    service = TestBed.inject(DFUManagerService);
    lcsCommunicator = TestBed.inject(LCSCommunicatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add LCS listeners', () => {
    expect(lcsCommunicatorAddListenerSpy).toHaveBeenNthCalledWith(
      1,
      LCSAvailableNewerDFUResponse.type,
      expect.any(Function)
    );
    expect(lcsCommunicatorAddListenerSpy).toHaveBeenNthCalledWith(
      2,
      LCSDfuExecutionStatusResponse.type,
      expect.any(Function)
    );
  });

  describe('scheduleNewestDFU', () => {
    it('should custom DFU', () => {
      jest.spyOn(lcsCommunicator, 'sendToLCS');
      service.scheduleNewestDFU(SOME_DEVICE_ID);
      expect(lcsCommunicator.sendToLCS).toHaveBeenCalledWith(
        expect.objectContaining({
          deviceId: SOME_DEVICE_ID,
        })
      );
    });
  });

  describe('scheduleCustomDFU', () => {
    it('should custom DFU', () => {
      jest.spyOn(lcsCommunicator, 'sendToLCS');
      service.scheduleCustomDFU(SOME_DEVICE_ID, SOME_ARCHIVE_PATH);
      expect(lcsCommunicator.sendToLCS).toHaveBeenCalledWith(
        expect.objectContaining({
          deviceId: SOME_DEVICE_ID,
          firmwareFile: `\"${SOME_ARCHIVE_PATH}\"`,
        })
      );
    });
  });
});
