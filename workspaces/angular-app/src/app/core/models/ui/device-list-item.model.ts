// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

import { DeviceUI } from './device-ui.model';

export class DeviceListItemUI {
  public device: DeviceUI;
  public badgeValue?: number;
  public hasActionInProgress = false;
  public supported = true;

  constructor(device: DeviceUI) {
    this.device = device;
  }
}
