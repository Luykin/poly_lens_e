// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

import { LCSApiMessage } from 'shared-lib';

export class LCSClientRegisteredResponse extends LCSApiMessage {
  static type = 'ClientRegistered';
  serviceVersion: string | undefined;
  serviceProductName: string | undefined;

  constructor() {
    super();
    this.type = LCSClientRegisteredResponse.type;
  }
}
