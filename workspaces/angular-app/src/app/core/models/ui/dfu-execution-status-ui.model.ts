// Copyright 2009, 2024 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

import { UtilityService } from '../../services/utility/utility.service';
import { LCSDfuExecutionStatusResponse } from '../lcs-responses/dfu-execution-status';

export enum DFUStatus {
  NOTNEEDED = 'NotNeeded',
  SCHEDULED = 'Scheduled',
  PREPARINGDEVICE = 'PreparingDevice',
  EXECUTING = 'Executing',
  SUCCEEDED = 'Succeeded',
  FAILED = 'Failed',
  CANCELED = 'Canceled',
}

export const DFUInProgressStatuses = [
  DFUStatus.SCHEDULED,
  DFUStatus.PREPARINGDEVICE,
  DFUStatus.EXECUTING,
];

export enum DownloadStatus {
  NOTNEEDED = 'NotNeeded',
  PENDING = 'Pending',
  INPROGRESS = 'InProgress',
  SUCCEEDED = 'Succeeded',
  FAILED = 'Failed',
  CANCELED = 'Canceled',
}

export const DownloadingStatuses = [
  DownloadStatus.PENDING,
  DownloadStatus.INPROGRESS,
];

export class DfuExecutionStatusUI {
  public dfuRequestId!: string;
  public deviceId!: string;
  public progress!: number;
  public firmwareSize: number | undefined; //size in bytes
  public firmwareDownloadedSize: number | undefined; //size in bytes
  private _firmwareDownloadStatus!: DownloadStatus;
  private _status!: DFUStatus;
  public errorCode: number | undefined;
  public firmwareVersion!: string;

  static fromLCS(
    lcsResponse: LCSDfuExecutionStatusResponse
  ): DfuExecutionStatusUI {
    const dfuExecutionStatusUI = new DfuExecutionStatusUI();

    dfuExecutionStatusUI.dfuRequestId = lcsResponse.dfuRequestId;
    dfuExecutionStatusUI.deviceId = lcsResponse.deviceId;
    dfuExecutionStatusUI.progress = UtilityService.stringToNumberOrZero(
      lcsResponse.progress
    );
    dfuExecutionStatusUI.firmwareSize =
      UtilityService.stringToNumberOrUndefined(lcsResponse.firmwareSize);
    dfuExecutionStatusUI.firmwareDownloadedSize =
      UtilityService.stringToNumberOrUndefined(
        lcsResponse.firmwareDownloadedSize
      );
    dfuExecutionStatusUI.firmwareDownloadStatus =
      lcsResponse.firmwareDownloadStatus;
    dfuExecutionStatusUI.status = lcsResponse.status;
    dfuExecutionStatusUI.errorCode = lcsResponse.errorCode;
    dfuExecutionStatusUI.firmwareVersion = lcsResponse.firmwareVersion;
    return dfuExecutionStatusUI;
  }

  public get isDownloadInProgress(): boolean {
    if (this._firmwareDownloadStatus) {
      return DownloadingStatuses.includes(this._firmwareDownloadStatus!);
    }
    return false;
  }

  public get isDFUInProgress(): boolean {
    return (
      DownloadingStatuses.includes(this.firmwareDownloadStatus) ||
      DFUInProgressStatuses.includes(this.status)
    );
  }

  public get status(): DFUStatus {
    return this._status;
  }

  public set status(value: DFUStatus) {
    if (Object.values(DFUStatus).includes(value)) {
      this._status = value;
    }
  }

  public get firmwareDownloadStatus(): DownloadStatus {
    return this._firmwareDownloadStatus;
  }

  public set firmwareDownloadStatus(value: DownloadStatus) {
    this._firmwareDownloadStatus = Object.values(DownloadStatus).includes(value)
      ? value
      : DownloadStatus.NOTNEEDED;
  }
}
