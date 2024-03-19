// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

import { Injectable } from '@angular/core';
import { distinctUntilChanged, filter, first, map, Observable } from 'rxjs';
import { LCSGetDeviceListRequest } from '../../models/lcs-requests/get-device-list';
import { LCSDeviceAttachedResponse } from '../../models/lcs-responses/device-attached';
import { LCSDeviceDetachedResponse } from '../../models/lcs-responses/device-detached';
import { LCSDevice } from '../../models/lcs-responses/device';
import { LCSDeviceListResponse } from '../../models/lcs-responses/device-list';
import { AppStateType } from '../../models/state/app-state.model';
import { DeviceUI } from '../../models/ui/device-ui.model';
import { Operator, StateService } from '../../state-management/state.service';
import { SelectedDevice } from '../../models/state/selected-device.model';
import { LCSCommunicatorService } from '../lcs-communicator/lcs-communicator.service';
import { LCSDeviceUpdatedResponse } from '../../models/lcs-responses/device-updated';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const LOGGER_PREFIX = '[DeviceManagerService]';

@Injectable({
  providedIn: 'root',
})
export class DeviceManagerService {
  constructor(
    private lcsCommunicator: LCSCommunicatorService,
    private state: StateService<AppStateType>
  ) {
    this._prepareIpcListeners();
    this._prepareHooksOnAppReady();
  }

  // Prepare LCS listeners
  private _prepareIpcListeners(): void {
    this.lcsCommunicator.addListener(
      LCSDeviceListResponse.type,
      this._handleLCSResponseDeviceList.bind(this)
    );

    // Set device attach listener
    this.lcsCommunicator.addListener(
      LCSDeviceAttachedResponse.type,
      this._handleLCSResponseDeviceAttached.bind(this)
    );

    // Set device detach listener
    this.lcsCommunicator.addListener(
      LCSDeviceDetachedResponse.type,
      this._handleLCSResponseDeviceDetached.bind(this)
    );

    // Set device update listener
    this.lcsCommunicator.addListener(
      LCSDeviceUpdatedResponse.type,
      this._handleLCSResponseDeviceUpdated.bind(this)
    );
  }

  private _prepareHooksOnAppReady() {
    this.state
      .select$((s) => s.app.ready)
      .pipe(
        distinctUntilChanged(),
        filter((ready) => ready)
      )
      .subscribe(() => {
        this.loadDeviceList();
      });
  }

  /**
   * Request devices from LCS
   */
  public loadDeviceList(): void {
    const getDeviceListRequest = new LCSGetDeviceListRequest();
    this.lcsCommunicator.sendToLCS(getDeviceListRequest);
  }

  /**
   * Returns all registered devices
   */
  public get deviceList$(): Observable<DeviceUI[]> {
    return this.state.select$((s) => s.deviceList);
  }

  /**
   * Returns device for provided deviceId
   */
  public getDeviceById(deviceId: string): Observable<DeviceUI | undefined> {
    return this.deviceList$.pipe(
      map((deviceList) =>
        deviceList.find((device) => device.deviceId === deviceId)
      )
    );
  }

  /**
   * Set the selected device in the AppState
   */
  public setSelectedDevice(deviceId: string) {
    const deviceList = this.state.getSnapshot<DeviceUI[]>('deviceList');
    const deviceToSelect = deviceList.find(
      (device) => device.deviceId === deviceId
    );
    this.state.updateEntity$<SelectedDevice>('selectedDevice', {
      operator: Operator.FUNCTION,
      updateFunction: (selectedDevice) => {
        if (selectedDevice && selectedDevice.device.deviceId === deviceId) {
          return selectedDevice;
        }

        return {
          device: deviceToSelect!,
          deviceId,
          settingsMetadata: [],
        };
      },
    });
  }

  public unselectDevice() {
    this.state.updateEntity$<SelectedDevice>('selectedDevice', {
      operator: Operator.EMPTY_ENTITY,
    });
  }

  /**
   * Currently selected device on the state
   */
  public get selectedDevice$(): Observable<SelectedDevice | undefined> {
    return this.state.select$((s) => s.selectedDevice);
  }

  /**
   * Currently selected device on the state
   * with detection of changes inside of the device
   */
  public get selectedDeviceRaw$(): Observable<SelectedDevice | undefined> {
    return this.state.select$((s) => {
      if (!!!s.selectedDevice || !!!s.selectedDevice.deviceId) {
        return;
      }

      return {
        device: s.deviceList.find(
          (d) => d.deviceId === s.selectedDevice?.deviceId
        ),
        deviceId: s.selectedDevice?.deviceId,
        settingsMetadata: s.selectedDevice?.settingsMetadata,
      };
    });
  }

  private _handleLCSResponseDeviceList(
    lcsResponse: LCSDeviceListResponse
  ): void {
    const deviceList = lcsResponse.devices.map((lcsDevice) =>
      this._LCSDeviceToDeviceUIConvertor(lcsDevice)
    );
    this.state.updateEntity$<DeviceUI[]>('deviceList', { data: deviceList });
  }

  /**
   * Handle LCS response for device attached
   * @param lcsResponse LCSDeviceAttachedResponse
   **/
  private _handleLCSResponseDeviceAttached(
    lcsResponse: LCSDeviceAttachedResponse
  ): void {
    this.state.updateEntity$<DeviceUI[]>('deviceList', {
      operator: Operator.FUNCTION,
      updateFunction: (deviceList: DeviceUI[]) => {
        const deviceAttached = lcsResponse.device;
        // Find device in the device list
        const deviceFromState = deviceList.find(
          (device: DeviceUI) => device.deviceId === deviceAttached.deviceId
        );
        // If there is the device in the device list, update the device in the list
        if (deviceFromState) {
          deviceFromState.attached = true;
          deviceFromState.lastAttachedUtc = deviceAttached.lastAttachedUtc;
        } else {
          // If there is no device in the device list, add device to the list
          deviceList.push(this._LCSDeviceToDeviceUIConvertor(deviceAttached));
        }
        // Return new device list
        return [...deviceList];
      },
    });
  }

  /**
   * Handle LCS response for device updated
   * @param lcsResponse LCSDeviceAttachedResponse
   **/
  private _handleLCSResponseDeviceUpdated(
    lcsResponse: LCSDeviceUpdatedResponse
  ): void {
    this.state.updateEntity$<DeviceUI[]>('deviceList', {
      operator: Operator.FUNCTION,
      updateFunction: (deviceList: DeviceUI[]) => {
        const deviceUpdated = lcsResponse.device;
        deviceUpdated.attached = true; // TODO: Remove, as it's temporary fix on LD
        // Find device in the device list
        const deviceFromStateIndex = deviceList.findIndex(
          (device: DeviceUI) => device.deviceId === deviceUpdated.deviceId
        );

        // If there is no device in the device list, do nothing
        if (deviceFromStateIndex === -1) {
          return deviceList;
        }
        // If there is the device in the device list, replace it with the updated
        deviceList.splice(deviceFromStateIndex, 1, deviceUpdated);
        return [...deviceList];
      },
    });
    // Refresh selected device on DeviceUpdate
    this.selectedDevice$.pipe(first()).subscribe((selectedDevice) => {
      if (selectedDevice?.deviceId === lcsResponse.device.deviceId) {
        this.setSelectedDevice(lcsResponse.device.deviceId);
      }
    });
  }

  /**
   * Handle LCS response for device detached
   * @param lcsResponse LCSDeviceDetachedResponse
   */
  private _handleLCSResponseDeviceDetached(
    lcsResponse: LCSDeviceDetachedResponse
  ): void {
    const detachedDeviceId = lcsResponse.deviceId;

    this.state.updateEntity$<DeviceUI[]>('deviceList', {
      operator: Operator.FUNCTION,
      updateFunction: (deviceList: DeviceUI[]) => {
        // Find device in the device list
        const deviceIndex = deviceList.findIndex(
          (device: DeviceUI) => device.deviceId === detachedDeviceId
        );
        // If there is no device in the device list, leave the method and do nothing
        if (deviceIndex === -1) return deviceList;

        // Otherwise, update the device list and return new device list
        deviceList[deviceIndex].attached = false;
        deviceList[deviceIndex].state = 'Offline';
        return [...deviceList];
      },
    });
  }

  private _LCSDeviceToDeviceUIConvertor(lcsDevice: LCSDevice): DeviceUI {
    const deviceUI = new DeviceUI(
      lcsDevice.deviceId,
      lcsDevice.productName,
      lcsDevice.serialNumber,
      lcsDevice.state
    );
    deviceUI.attached = lcsDevice.attached;
    deviceUI.lastAttachedUtc = lcsDevice.lastAttachedUtc;
    deviceUI.manufacturerName = lcsDevice.manufacturerName;
    deviceUI.multiComponentStatus = lcsDevice.multiComponentStatus;
    deviceUI.parentId = lcsDevice.parentId;
    return deviceUI;
  }
}
