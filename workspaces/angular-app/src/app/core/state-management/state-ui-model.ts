// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

export type StateUI<T extends string> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key in T]: any;
};
