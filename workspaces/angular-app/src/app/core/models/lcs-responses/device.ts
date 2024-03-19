// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

export class LCSDevice {
  deviceId: string;
  parentId?: string;
  productName: string;
  manufacturerName?: string;
  serialNumber: string;
  attached: boolean = false;
  lastAttachedUtc?: string;
  state: string;
  multiComponentStatus?: {
    [component: string]: string;
  };

  constructor(
    deviceId: string,
    productName: string,
    serialNumber: string,
    state: string
  ) {
    this.deviceId = deviceId;
    this.productName = productName;
    this.serialNumber = serialNumber;
    this.state = state;
  }
}
