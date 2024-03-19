// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

import { LCSApiMessage } from 'shared-lib';

export class LCSAvailableNewerDFUResponse extends LCSApiMessage {
  static type = 'AvailableNewerDFU';
  deviceId!: string;
  availableDFUVersion!: string;
  warnings?: string[];
  releaseNoteUrl?: string;

  constructor() {
    super();
    this.type = LCSAvailableNewerDFUResponse.type;
  }
}
