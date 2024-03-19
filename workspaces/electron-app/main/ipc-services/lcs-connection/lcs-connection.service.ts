// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

import { Subject } from 'rxjs';
import { WindowApiConst } from 'shared-lib';
import { AbstractService } from '../abstract-service';
import { ISocketClient } from '../../socket-client/abstract-socket-client';
import { SocketConnection } from 'shared-lib/.dist/models/socket-connection.model';
import { BrowserWindow } from 'electron';
import { takeUntil } from 'rxjs/operators';

export class LCSConnectionService extends AbstractService<
  SocketConnection,
  SocketConnection
> {
  private _electronWindow: BrowserWindow | undefined;
  private _destroy$: Subject<void> = new Subject();
  private _socketClient: ISocketClient;
  private _socketConnection: SocketConnection = {
    connectionEstablishedOnce: false,
    disconnected: false,
  };

  public events$?: Subject<SocketConnection> = new Subject();

  constructor() {
    super();
  }

  receptionChannel(): string {
    return WindowApiConst.LCS_CONNECTION_REQUEST;
  }

  sendingChannel(): string {
    return WindowApiConst.LCS_CONNECTION_RESPONSE;
  }

  process(): void {
    this._sendSocketConnectionStatus();
  }

  initialize(
    electronWindow: BrowserWindow | undefined,
    socket: ISocketClient
  ): void {
    this._setWindow(electronWindow);
    this._setSocket(socket);
    this._onWindowClose();
    this._onSocketConnection();
  }

  private _setSocket(socket: ISocketClient): void {
    this._socketClient = socket;
  }

  private _setWindow(electronWindow: BrowserWindow | undefined): void {
    this._electronWindow = electronWindow;
  }

  private _onWindowClose(): void {
    this._electronWindow?.on('closed', () => {
      this._destroy$.next();
      this._destroy$.complete();

      delete this._electronWindow;
    });
  }

  private _onSocketConnection(): void {
    this._socketClient.connect$
      .pipe(takeUntil(this._destroy$))
      .subscribe(() => {
        if (!this._socketConnection.connectionEstablishedOnce) {
          this._socketConnection.connectionEstablishedOnce = true;
        }

        if (this._socketConnection.disconnected) {
          this._socketConnection.disconnected = false;
        }

        this._sendSocketConnectionStatus();
      });

    this._socketClient.disconnect$
      .pipe(takeUntil(this._destroy$))
      .subscribe(() => {
        this._socketConnection.disconnected = true;
        this._sendSocketConnectionStatus();
      });
  }

  private _sendSocketConnectionStatus(): void {
    this.events$?.next(this._socketConnection);
  }
}
