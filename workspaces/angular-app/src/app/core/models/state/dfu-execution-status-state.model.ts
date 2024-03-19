// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

import { DfuExecutionStatusUI } from '../ui/dfu-execution-status-ui.model';

export interface DfuExecutionStatusState {
  [deviceId: string]: DfuExecutionStatusUI;
}
