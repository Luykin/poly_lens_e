// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { AppStateType } from '../../models/state/app-state.model';
import { Operator, StateService } from '../../state-management/state.service';
import { v4 as UUID } from 'uuid';
import { LCSScheduleDFURequest } from '../../models/lcs-requests/schedule-dfu';
import { DeviceUI } from '../../models/ui/device-ui.model';
import { LCSDfuExecutionStatusResponse } from '../../models/lcs-responses/dfu-execution-status';
import { LCSAvailableNewerDFUResponse } from '../../models/lcs-responses/lcs-available-newer-dfu';
import { AvailableNewerDFUUI } from '../../models/ui/available-newer-dfu.model';
import { AvailableNewestDFUState } from '../../models/state/available-dfu-state.model';
import {
  Observable,
  catchError,
  distinctUntilChanged,
  of,
  switchMap,
  withLatestFrom,
} from 'rxjs';
import { LCSGetAvailableNewerDFUResponse } from '../../models/lcs-requests/get-available-newer-dfu';
import {
  DFUStatus,
  DfuExecutionStatusUI,
  DownloadStatus,
} from '../../models/ui/dfu-execution-status-ui.model';
import { DfuExecutionStatusState } from '../../models/state/dfu-execution-status-state.model';
import { LoggingService } from '../logging/logging.service';
import { SelectedDevice } from '../../models/state/selected-device.model';
import { LCSCommunicatorService } from '../lcs-communicator/lcs-communicator.service';
import { ToastrService } from 'ngx-toastr';
import { ToastItemComponent } from '../../components/toast/toast-item/toast-item.component';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const LOGGER_PREFIX = '[DFUManagerService]';

@Injectable({
  providedIn: 'root',
})
export class DFUManagerService {
  constructor(
    private lcsCommunicator: LCSCommunicatorService,
    private state: StateService<AppStateType>,
    private loggingService: LoggingService,
    private toastService: ToastrService,
    private location: Location
  ) {
    this._prepareIpcListeners();
    this._prepareHooksOnDeviceList();
    this._prepareHooksOnDFUExecution();
  }

  /**
   * Fetch is there available DFU for all devices in device list
   */
  public get availableNewerDFUAllDevices$(): Observable<AvailableNewestDFUState> {
    return this.state
      .select$((s: AppStateType) => s.availableNewestDFU)
      .pipe(catchError((_error) => of()));
  }

  /**
   * Fetch is there available DFU for selected device
   */
  public get availableNewerDFUSelectedDevice$(): Observable<AvailableNewerDFUUI> {
    return this.state
      .select$((s) => s.selectedDevice)
      .pipe(
        switchMap((selectedDevice: SelectedDevice) => {
          return this.state.select$(
            (s: AppStateType) =>
              s.availableNewestDFU[selectedDevice.device.deviceId]
          );
        }),
        catchError((_error) => of())
      );
  }

  /**
   * Request to schedule Custom DFU execution
   */
  public scheduleCustomDFU(_deviceId: string, _dfuArchivePath: string): string {
    const requestId = UUID(); // Unique id  as uuid of this DFU request
    const scheduleDFURequest = new LCSScheduleDFURequest(
      requestId,
      _deviceId,
      _dfuArchivePath
    );

    if (scheduleDFURequest.firmwareFile) {
      scheduleDFURequest.firmwareFile =
        '"' + scheduleDFURequest.firmwareFile + '"'; // to support file paths with space inside
    }

    this.lcsCommunicator.sendToLCS(scheduleDFURequest);
    return requestId;
  }

  /**
   * Request to schedule Newest DFU execution
   */
  public scheduleNewestDFU(_deviceId: string): string {
    const requestId = UUID(); // Unique id  as uuid of this DFU request
    const scheduleDFURequest = new LCSScheduleDFURequest(requestId, _deviceId);
    this.lcsCommunicator.sendToLCS(scheduleDFURequest);
    return requestId;
  }

  /**
   * Fetch DFU execution status for selected device
   */
  public get dfuExecutionStatusForSelectedDevice$(): Observable<DfuExecutionStatusUI> {
    return this.state
      .select$((s) => s.selectedDevice)
      .pipe(
        switchMap((selectedDevice: SelectedDevice) => {
          return this.state.select$(
            (s: AppStateType) =>
              s.dfuExecutionStatus[selectedDevice.device.deviceId]
          );
        }),
        catchError((_error) => of())
      );
  }

  /**
   * Fetch DFU execution status for selected device
   */
  public get dfuExecutionStatusAllDevices$(): Observable<DfuExecutionStatusState> {
    return this.state.select$((s: AppStateType) => s.dfuExecutionStatus);
  }

  ///
  /// LCS Communication listeners and hooks
  ///

  // Prepare LCS listeners
  private _prepareIpcListeners(): void {
    this.lcsCommunicator.addListener(
      LCSAvailableNewerDFUResponse.type,
      this._handleLCSAvailableNewerDFU.bind(this)
    );

    // Set DFU execution status listener
    this.lcsCommunicator.addListener(
      LCSDfuExecutionStatusResponse.type,
      this._handleLCSResponseDFUexecutionStatus.bind(this)
    );
  }

  private _handleLCSAvailableNewerDFU(
    lcsResponse: LCSAvailableNewerDFUResponse
  ): void {
    const availableNewerDFU = AvailableNewerDFUUI.fromLCS(lcsResponse);

    this.state.updateEntity$<AvailableNewestDFUState>('availableNewestDFU', {
      operator: Operator.FUNCTION,
      updateFunction: (availableNewestDFU) => {
        availableNewestDFU = {
          ...availableNewestDFU,
          [availableNewerDFU.deviceId]: availableNewerDFU,
        };
        return availableNewestDFU;
      },
    });
  }

  /**
   * Handle LCS response for DFU execution status
   * @param lcsResponse LCSDfuExecutionStatusResponse
   */
  private _handleLCSResponseDFUexecutionStatus(
    lcsResponse: LCSDfuExecutionStatusResponse
  ): void {
    const dfuExecutionStatusUI = DfuExecutionStatusUI.fromLCS(lcsResponse);

    this.state.updateEntity$<DfuExecutionStatusState>('dfuExecutionStatus', {
      operator: Operator.FUNCTION,
      updateFunction: (dfuExecutionStatus) => {
        dfuExecutionStatus = {
          ...dfuExecutionStatus,
          [dfuExecutionStatusUI.deviceId]: dfuExecutionStatusUI,
        };
        return dfuExecutionStatus;
      },
    });
  }

  // Prepare hooks
  private _prepareHooksOnDeviceList() {
    this.state
      .select$((s) => s.deviceList)
      .pipe(distinctUntilChanged())
      .subscribe((deviceList: DeviceUI[]) => {
        this.loggingService.log(
          `${LOGGER_PREFIX} Request is there available update after updating the device list.`
        );
        for (const device of deviceList)
          if (
            device.attached === true &&
            device.state?.toLowerCase() === 'online'
          ) {
            this._loadAvailableNewerDFUForDevice(device.deviceId);
          }
      });
  }

  /**
   * The hooks that needs to be executed after receiving DFU Execution Status
   * Examples: Remove available DFU, show notifications, etc.
   */
  private _prepareHooksOnDFUExecution(): void {
    let previousDFUExecutionStatus: DfuExecutionStatusState;
    const dfuExecutionStatus = this.state.select$(
      (s: AppStateType) => s.dfuExecutionStatus
    );
    const deviceList = this.state.select$((s: AppStateType) => s.deviceList);

    dfuExecutionStatus
      .pipe(withLatestFrom(deviceList), distinctUntilChanged())
      .subscribe(
        ([statusList, deviceList]: [DfuExecutionStatusState, DeviceUI[]]) => {
          const deviceIdList = Object.keys(statusList);
          for (const deviceId of deviceIdList) {
            const deviceStatus = statusList[deviceId];
            const previousDeviceStatus = previousDFUExecutionStatus[deviceId];

            // Do nothing in case of no change
            // NOTE: In case of extending the hook, this IF statement needs to be adjusted
            if (
              previousDeviceStatus &&
              previousDeviceStatus.status === deviceStatus.status &&
              previousDeviceStatus.firmwareDownloadStatus ===
                deviceStatus.firmwareDownloadStatus
            ) {
              continue;
            }

            // Find device so we can use device product name and pass it to the toaster
            const device: DeviceUI | undefined = deviceList.find(
              (device: DeviceUI) => device?.deviceId === deviceId
            );

            // Do nothing if device is not found in the list
            if (!device) {
              continue;
            }

            // Check if a user is on a overview page of the device
            const isOnDeviceOverviewPage = this.location
              .path()
              .includes(`${device?.deviceId}/overview`);

            if (deviceStatus.status === DFUStatus.SUCCEEDED) {
              this.loggingService.log(
                `${LOGGER_PREFIX} Remove available DFU when device is updated, if there is an any.`
              );
              this.state.updateEntity$<AvailableNewestDFUState>(
                'availableNewestDFU',
                {
                  operator: Operator.FUNCTION,
                  updateFunction: (availableNewestDFU) => {
                    delete availableNewestDFU[deviceStatus.deviceId];
                    return availableNewestDFU;
                  },
                }
              );

              // Show success notification with custom toaster component if a user is not on a overview page of the device
              if (!isOnDeviceOverviewPage) {
                this.toastService.success('DFU.UPDATE_COMPLETE', undefined, {
                  toastComponent: ToastItemComponent,
                  payload: {
                    translateParams: {
                      productName: device?.productName,
                    },
                  },
                });
              }
            }

            if (
              (!isOnDeviceOverviewPage &&
                deviceStatus.status === DFUStatus.FAILED) ||
              deviceStatus.firmwareDownloadStatus === DownloadStatus.FAILED
            ) {
              // Show Error notification with custom toaster component if a user is not on a overview page of the device
              this.toastService.error('DFU.UPDATE_FAILED', undefined, {
                toastComponent: ToastItemComponent,
                payload: {
                  translateParams: {
                    productName: device?.productName,
                  },
                },
              });
            }
          }

          // And save it for the next iteration
          previousDFUExecutionStatus = statusList;
        }
      );
  }

  /**
   * Will request is there available newer DFU for device
   */
  private _loadAvailableNewerDFUForDevice(deviceId: string): void {
    const getAvailableNewerDFURequest = new LCSGetAvailableNewerDFUResponse(
      deviceId
    );
    this.lcsCommunicator.sendToLCS(getAvailableNewerDFURequest);
  }
}
