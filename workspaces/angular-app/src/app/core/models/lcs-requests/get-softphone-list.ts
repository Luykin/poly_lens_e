// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

import { LCSApiMessage } from 'shared-lib';

export class LCSGetSoftphoneListRequest extends LCSApiMessage {
  static type: string = 'GetSoftphonesList';

  constructor() {
    super();
    this.type = LCSGetSoftphoneListRequest.type;
  }
}
