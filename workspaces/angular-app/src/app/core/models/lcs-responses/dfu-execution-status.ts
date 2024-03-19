// Copyright 2009, 2024 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

import { LCSApiMessage } from 'shared-lib';
import { DFUStatus, DownloadStatus } from '../ui/dfu-execution-status-ui.model';

export class LCSDfuExecutionStatusResponse extends LCSApiMessage {
  public static type = 'DfuExecutionStatus';
  public dfuRequestId!: string;
  public deviceId!: string;
  public status!: DFUStatus;
  public progress!: string;
  public errorCode?: number | undefined;
  public firmwareDownloadStatus!: DownloadStatus;
  public firmwareSize?: string | undefined; //size in bytes
  public firmwareDownloadedSize?: string | undefined; //size in bytes
  public firmwareVersion!: string;

  constructor() {
    super();
    this.type = LCSDfuExecutionStatusResponse.type;
  }
}
