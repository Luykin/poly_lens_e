// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

export interface Battery {
  /**
   * Current battery level.
   */
  level: number;
  /**
   * If true, device is charging.
   */
  charging: boolean;
  /**
   * Current state of battery.
   */
  state: string;
}
