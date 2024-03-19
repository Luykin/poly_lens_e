/* eslint-disable sonarjs/no-duplicate-string */
// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

import { fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { expect } from 'expect';
import { take } from 'rxjs';
import { MOCK_PROVIDERS, setupMockStorage } from '../../mock-providers';
import {
  defaultSessionState,
  SessionState,
} from '../models/state/app-settings.model';
import { AppStateType } from '../models/state/app-state.model';
import { SelectedDevice } from '../models/state/selected-device.model';
import { DeviceUI } from '../models/ui/device-ui.model';
import { StorageService } from '../services/storage.service';
import { Operator, StateService } from './state.service';

describe('StateService', () => {
  let service: StateService<AppStateType>;
  let storageService: StorageService;
  let deviceList: DeviceUI[];
  let selectedDevice: SelectedDevice;
  const localStore: Record<string, string> = {};

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      providers: [...MOCK_PROVIDERS],
    });

    // resets mock local storage for each test
    setupMockStorage(localStore);

    service = TestBed.inject(StateService<AppStateType>);
    storageService = TestBed.inject(StorageService);
    // set up data for a fresh objects for each test
    deviceList = [
      {
        deviceId: '1',
        productName: 'Test Product Name',
        serialNumber: 'Test Serial Number',
        attached: true,
        state: 'Test state',
      },
      {
        deviceId: '2',
        productName: 'Test Product Name',
        serialNumber: 'Test Serial Number',
        attached: true,
        state: 'Test state',
      },
    ];
    selectedDevice = {
      device: deviceList[0],
      deviceId: deviceList[0].deviceId,
      settingsMetadata: [
        {
          auto_mode: false,
          name: 'Test setting 1',
          meta: {
            auto_supported: false,
            is_action: false,
            read_only: false,
            type: 'enum',
          },
        },
        {
          auto_mode: false,
          name: 'Test setting 2',
          meta: {
            auto_supported: false,
            is_action: false,
            read_only: false,
            type: 'enum',
          },
        },
      ],
    };
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(storageService).toBeTruthy();
  });

  it('should set init state', () => {
    expect(service.getSnapshot('app')).toBeDefined();
  });

  it('should update state with a device list', fakeAsync(() => {
    service.updateEntity$<DeviceUI[]>('deviceList', {
      operator: Operator.REPLACE,
      data: deviceList,
    });
    tick();
    expect(service.getSnapshot<DeviceUI[]>('deviceList').length).toBe(2);
    flush();
  }));

  it('should select from device list', fakeAsync(() => {
    service.updateEntity$<DeviceUI[]>('deviceList', {
      operator: Operator.REPLACE,
      data: deviceList,
    });
    const selectedDevice$ = service.select$((o) => o.deviceList[0]);
    tick();
    selectedDevice$.subscribe((device) => {
      expect(device.deviceId).toBe(deviceList[0].deviceId);
    });
    flush();
  }));

  it('should update state with a selected device with its settings', () => {
    service.updateEntity$<SelectedDevice>('selectedDevice', {
      operator: Operator.REPLACE,
      data: selectedDevice,
    });
    expect(
      service.getSnapshot<SelectedDevice>('selectedDevice').device
    ).toEqual(deviceList[0]);
    // should NOT be the same object, otherwise the deep clone did not work
    expect(
      service.getSnapshot<SelectedDevice>('selectedDevice').device
    ).not.toBe(deviceList[0]);
  });

  it('should get a value from the store based on a function selector', async () => {
    service.updateEntity$('selectedDevice', {
      operator: Operator.REPLACE,
      data: selectedDevice,
    });
    const data$ = service.select$((s) => s.selectedDevice);
    data$.pipe(take(1)).subscribe((data) => {
      expect(data).toBe(selectedDevice);
    });

    const data2$ = service.select$((s) => s.app.ready);
    data2$.pipe(take(1)).subscribe((data) => {
      expect(data).toBe(false);
    });
  });

  it('should not allow object mutation', fakeAsync(() => {
    service.updateEntity$<SelectedDevice>('selectedDevice', {
      operator: Operator.REPLACE,
      data: selectedDevice,
    });
    tick();
    expect(
      service.getSnapshot<SelectedDevice>('selectedDevice').settingsMetadata[0]
        .name
    ).toEqual('Test setting 1');
    selectedDevice.settingsMetadata[0].name = 'I am trying to mutate state!';
    expect(
      service.getSnapshot<SelectedDevice>('selectedDevice').settingsMetadata[0]
        .name
    ).toEqual('Test setting 1');
    flush();
  }));

  it('should clone incoming data', () => {
    service.updateEntity$<SelectedDevice>('selectedDevice', {
      operator: Operator.REPLACE,
      data: selectedDevice,
    });
    // it should be deeply equal
    expect(service.getSnapshot<SelectedDevice>('selectedDevice')).toEqual(
      selectedDevice
    );
    // but it should NOT be the same object
    expect(service.getSnapshot<SelectedDevice>('selectedDevice')).not.toBe(
      selectedDevice
    );
  });

  it('should replace a state entity', () => {
    const simpleDevice = {
      device: deviceList[0],
      settingsMetadata: [],
    };
    service.updateEntity$<SelectedDevice>('selectedDevice', {
      operator: Operator.REPLACE,
      data: simpleDevice,
    });
    expect(service.getSnapshot<SelectedDevice>('selectedDevice')).toEqual(
      simpleDevice
    );
  });

  it('should patch an existing state entity', () => {
    const simpleDevice = {
      device: deviceList[0],
      settingsMetadata: [],
    };
    // initially populate data
    service.updateEntity$<SelectedDevice>('selectedDevice', {
      operator: Operator.REPLACE,
      data: simpleDevice,
    });
    // patch data
    service.updateEntity$<SelectedDevice>('selectedDevice', {
      operator: Operator.PATCH,
      data: {
        device: deviceList[1],
      },
    });
    expect(service.getSnapshot<SelectedDevice>('selectedDevice')).toEqual({
      device: deviceList[1],
      settingsMetadata: [],
    });
    // patch data again
    service.updateEntity$<SelectedDevice>('selectedDevice', {
      operator: Operator.PATCH,
      data: {
        device: deviceList[0],
      },
    });
    expect(service.getSnapshot<SelectedDevice>('selectedDevice')).toEqual({
      device: deviceList[0],
      settingsMetadata: [],
    });
    // ensure object identity is not same (if this does not pass, patched data is passed by reference)
    expect(
      service.getSnapshot<SelectedDevice>('selectedDevice').settingsMetadata
    ).not.toBe(selectedDevice.settingsMetadata);
  });

  it('should initialize `session` to a default state when local storage is empty', () => {
    const allItems = StorageService.getAllItems();
    expect(allItems).toEqual(defaultSessionState);
  });

  it('should persist data in session to localStorage automatically', () => {
    service.updateEntity$<SessionState>('session', {
      operator: Operator.PATCH,
      data: {
        EULA_AGREED: true,
      },
    });

    const allItems = StorageService.getAllItems();
    expect(allItems).toEqual({
      ...defaultSessionState,
      EULA_AGREED: true,
    });
  });
});
