// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

import { Injectable } from '@angular/core';
import { LCSApiMessage, WindowApiConst } from 'shared-lib';
import { ElectronIpcService } from '../electron-ipc/electron-ipc.service';
import { LoggingService } from '../logging/logging.service';

/**
 * The LCSCommunicatorService is designed to communicate with the LCS service
 * over Electron IPC.
 *
 * Generally, it should be responsible to handle all requests and responses
 * addressed to the LCS. Individual services should use this service to communicate
 * with LCS.
 *
 * To send request to the LCS, use `sendToLCS()` method.
 *
 * To listen responses/messages received from the LCS, do add a listener with
 * `addListener()` method.
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type LCSListenerType = (lcsResponse: any) => void;

const LOGGER_PREFIX = '[LCSCommunicatorService]';

@Injectable({
  providedIn: 'root',
})
export class LCSCommunicatorService {
  private _lcsListenersMapper = new Map<string, LCSListenerType>();

  constructor(
    private electronIpc: ElectronIpcService,
    private loggerService: LoggingService
  ) {
    this.electronIpc.receive(
      WindowApiConst.LCS_RESPONSE,
      this._handleLCSResponse.bind(this)
    );
  }

  /**
   * Add LCS request listener
   * @param listenerKey LCS message type (i.e. "DeviceList" or "DeviceSettingsMetadata")
   * @param listener Listener callback function
   * @param overwrite Overwrite existing listener
   * @returns
   */
  public addListener(
    listenerKey: string,
    listener: LCSListenerType,
    overwrite = false
  ) {
    // Warn if listener already exists for the same message
    if (overwrite === false && this._lcsListenersMapper.has(listenerKey)) {
      throw new Error(
        `${LOGGER_PREFIX} Listener with the same name has already registered: ${listenerKey}`
      );
    }

    this._lcsListenersMapper.set(listenerKey, listener);
  }

  /**
   * Remove LCS response listener by provided listenerKey
   */
  public removeListener(listenerKey: string): boolean {
    return this._lcsListenersMapper.delete(listenerKey);
  }

  /**
   * Send message to LCS
   * @param channel
   * @param input
   */
  public sendToLCS(input: LCSApiMessage): void {
    this.electronIpc.send(WindowApiConst.LCS_REQUEST, input);
  }

  private _handleLCSResponse(lcsResponse: LCSApiMessage): void {
    const listener = this._lcsListenersMapper.get(lcsResponse.type);

    if (!listener) {
      this.loggerService.warn(
        `${LOGGER_PREFIX} Listener not found for`,
        lcsResponse.type
      );
      return;
    }
    listener(lcsResponse);
  }
}
