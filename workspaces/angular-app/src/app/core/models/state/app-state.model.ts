// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

import { StorageService } from '../../services/storage.service';
import { UtilityService } from '../../services/utility/utility.service';
import { DeviceUI } from '../ui/device-ui.model';
import { SessionState } from './app-settings.model';
import { App } from './app.model';
import { AvailableNewestDFUState } from './available-dfu-state.model';
import { DetailNavOptions } from './detail-nav-options.model';
import { DeviceSettingsState } from './device-settings-state.model';
import { DfuExecutionStatusState } from './dfu-execution-status-state.model';
import { LensSettingsState } from './lens-settings.model';
import { SelectedDevice } from './selected-device.model';

export interface AppStateType {
  app: App;
  session: SessionState;
  deviceList: DeviceUI[];
  detailNavOptions: DetailNavOptions;
  selectedDevice: SelectedDevice | undefined;
  lensSettings: LensSettingsState;
  deviceSettings: DeviceSettingsState;
  availableNewestDFU: AvailableNewestDFUState;
  dfuExecutionStatus: DfuExecutionStatusState;
}

export type StateUIType = keyof AppStateType;

let newAppStateCalled = 0;

/**
 * AppState initializes the state management service with core data.
 * A new object is created on every call to defensively protect against mutation.
 *
 * Other than in spec tests, app.module.ts should be the ONLY place that calls this method due
 * to how it hydrates from local storage.  If there is more than one app call of newAppState,
 * seriously review if this is necessary and consider if local storage handling should change.
 */
export const newAppState = (): AppStateType => {
  const session = StorageService.ensureSessionStateInitialized();

  newAppStateCalled++;
  if (!UtilityService.isInTestRunner() && newAppStateCalled > 1) {
    console.warn(
      'newAppState has been called more than once in the app.  This may lead to non-deterministic behavior of state management and local storage.  Please review.'
    );
  }

  return {
    app: {
      ready: false,
      selectedLanguage: 'en',
      connection: {
        connectionEstablishedOnce: false,
        disconnected: false,
      },
      view: {
        content: false,
        titlebar: false,
      },
    },
    session,
    deviceList: [],
    selectedDevice: undefined,
    lensSettings: {},
    deviceSettings: {},
    availableNewestDFU: {},
    dfuExecutionStatus: {},
    detailNavOptions: {
      showNav: true,
      showDeviceHeading: true,
      deviceHeading: '',
    },
  };
};
