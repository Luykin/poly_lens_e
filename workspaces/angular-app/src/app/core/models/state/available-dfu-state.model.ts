// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

import { AvailableNewerDFUUI } from '../ui/available-newer-dfu.model';

export interface AvailableNewestDFUState {
  [deviceId: string]: AvailableNewerDFUUI;
}
