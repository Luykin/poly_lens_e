import { LCSApiMessage } from 'shared-lib';

export enum DfuExecutionType {
  SelectedFirmware = 0,
  NewestAvailableFirmware = 1,
  CustomFirmwareFile = 2,
}

export class LCSScheduleDFURequest extends LCSApiMessage {
  static type: string = 'ScheduleDfuExecution';
  deviceId: string;
  // Unique id (uuid) of this DFU request
  // status messages referring to this id are going to be sent while DFU is in progress
  id: string;
  dfuType: DfuExecutionType;
  // Valid only in case of custom DFU
  firmwareFile?: string;

  /**
   * Create DFU Request
   * @param id Unique id (uuid) of this DFU request
   * @param deviceId
   * @param path full location of DFU archive
   */
  constructor(id: string, deviceId: string);
  constructor(id: string, deviceId: string, firmwareFile: string);
  constructor(id: string, deviceId: string, firmwareFile?: string) {
    super();
    this.type = LCSScheduleDFURequest.type;
    this.id = id;
    this.deviceId = deviceId;
    this.dfuType = firmwareFile
      ? DfuExecutionType.CustomFirmwareFile
      : DfuExecutionType.NewestAvailableFirmware;
    this.firmwareFile = firmwareFile;
  }
}
