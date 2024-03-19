// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

import { LCSAvailableNewerDFUResponse } from '../lcs-responses/lcs-available-newer-dfu';

export class AvailableNewerDFUUI {
  deviceId!: string;
  availableDFUVersion!: string;
  warnings?: string[];
  releaseNoteUrl?: string;

  static fromLCS(
    lcsResponse: LCSAvailableNewerDFUResponse
  ): AvailableNewerDFUUI {
    return {
      deviceId: lcsResponse.deviceId,
      availableDFUVersion: lcsResponse.availableDFUVersion,
      warnings: lcsResponse.warnings,
      releaseNoteUrl: lcsResponse.releaseNoteUrl,
    };
  }
}
