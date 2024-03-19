// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

import { LCSApiMessage } from 'shared-lib';
import { Softphone } from '../ui/softphone-ui.model';

export class LCSSoftphoneListResponse extends LCSApiMessage {
  static type = 'SoftphonesList';
  softphones!: Softphone[];

  constructor() {
    super();
    this.type = LCSSoftphoneListResponse.type;
  }
}
