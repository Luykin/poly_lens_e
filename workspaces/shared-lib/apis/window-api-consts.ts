// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

export class WindowApiConst {
  /** Channel used by the renderer process to send data to the main process */
  public static readonly MULTIPLES_INPUT = 'getMultiplesInput';
  public static readonly LCS_REQUEST = 'lcs.request';
  public static readonly LCS_CONNECTION_REQUEST = 'lcs.connection.request';
  public static readonly WINDOW_REQUEST = 'window.request';

  /** Channel used by the renderer process to receive data from the main process */
  public static readonly MULTIPLES_OUTPUT = 'getMultiplesOutput';
  public static readonly LCS_RESPONSE = 'lcs.response';
  public static readonly LCS_CONNECTION_RESPONSE = 'lcs.connection.response';

  /** Whitelist of the safe channels to use when sending data to the main process */
  public static readonly SENDING_SAFE_CHANNELS = [
    WindowApiConst.MULTIPLES_INPUT,
    WindowApiConst.LCS_REQUEST,
    WindowApiConst.WINDOW_REQUEST,
    WindowApiConst.LCS_CONNECTION_REQUEST,
  ];

  /** Whitelist of the safe channels to use when receiving data from the main process */
  public static readonly RECEIVING_SAFE_CHANNELS = [
    WindowApiConst.MULTIPLES_OUTPUT,
    WindowApiConst.LCS_RESPONSE,
    WindowApiConst.LCS_CONNECTION_RESPONSE,
  ];
}
