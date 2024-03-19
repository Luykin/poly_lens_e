// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

type DeviceUIType = {
  deviceId: string;
  parentId?: string;
  productName: string;
  manufacturerName?: string;
  serialNumber: string;
  attached: boolean;
  lastAttachedUtc?: string;
  state?: string;
  // parent is excluded to avoid a circular typing reference in app-state.model.ts; parent is still available in DeviceUI
};

export class DeviceUI implements DeviceUIType {
  deviceId: string;
  parentId?: string;
  productName: string;
  manufacturerName?: string;
  serialNumber: string;
  attached: boolean = false;
  lastAttachedUtc?: string;
  state?: string;
  multiComponentStatus?: {
    [component: string]: string;
  };
  parent?: DeviceUIType;

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
