// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

import { LCSApiMessage } from 'shared-lib';

export class LCSGetDeviceListRequest extends LCSApiMessage {
  static type: string = 'GetDeviceList';

  constructor() {
    super();
    this.type = LCSGetDeviceListRequest.type;
  }
}
