// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

import { Injectable } from '@angular/core';
import { Observable, distinctUntilChanged, filter } from 'rxjs';
import { LCSRegisterClientRequest } from '../../models/lcs-requests/register-client';
import { LCSClientRegisteredResponse } from '../../models/lcs-responses/client-registered';
import { AppStateType } from '../../models/state/app-state.model';
import { App } from '../../models/state/app.model';
import { Operator, StateService } from '../../state-management/state.service';
import { LCSCommunicatorService } from '../lcs-communicator/lcs-communicator.service';
import { ElectronIpcService } from '../electron-ipc/electron-ipc.service';
import { SocketConnection, WindowApiConst } from 'shared-lib';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const LOGGER_PREFIX = '[LCSClientManager]';

@Injectable({
  providedIn: 'root',
})
export class LCSClientManagerService {
  /**
   * Is LD is registered as a client on LCS
   */
  public get isLCSClientRegistered$(): Observable<boolean> {
    return this.state.select$((s) => s.app.ready);
  }

  public get isLCSClientConnected$(): Observable<SocketConnection> {
    return this.state.select$((s) => s.app.connection);
  }

  constructor(
    private lcsCommunicator: LCSCommunicatorService,
    private state: StateService<AppStateType>,
    private electronIpc: ElectronIpcService
  ) {
    this.electronIpc.receive(
      WindowApiConst.LCS_CONNECTION_RESPONSE,
      this._handleLCSConectionResponse.bind(this)
    );

    this._prepareIpcListeners();
    this._prepareHookOnConnectionEstablished();
    this.requestLcsConnectionStatus();
  }

  public requestLcsConnectionStatus(): void {
    this.electronIpc.send(WindowApiConst.LCS_CONNECTION_REQUEST, {});
  }

  // Prepare LCS listeners
  private _prepareIpcListeners(): void {
    this.lcsCommunicator.addListener(
      LCSClientRegisteredResponse.type,
      this._handleLCSResponseClientRegistered.bind(this)
    );
  }

  private _prepareHookOnConnectionEstablished() {
    this.state
      .select$((state) => state.app)
      .pipe(
        distinctUntilChanged(),
        filter((app: App) => {
          return (
            !app.ready &&
            app.connection.connectionEstablishedOnce &&
            !app.connection.disconnected
          );
        })
      )
      .subscribe(() => {
        this._registerClient();
      });
  }

  private _registerClient(): void {
    const registerClientRequest = new LCSRegisterClientRequest();
    this.lcsCommunicator.sendToLCS(registerClientRequest);
  }

  private _handleLCSConectionResponse(lcsConnection: SocketConnection): void {
    this.state.updateEntity$<App>('app', {
      operator: Operator.FUNCTION,
      updateFunction: (app) => {
        return {
          ...app,
          connection: lcsConnection,
          view: {
            // Just an example of updating deep property, not used at the moment.
            // since using primitives here (true), does not need _cloneDeep
            ...app.view,
            content: true,
          },
        };
      },
    });
  }

  private _handleLCSResponseClientRegistered(
    _lcsResponse: LCSClientRegisteredResponse
  ): void {
    this.state.updateEntity$<App>('app', {
      operator: Operator.FUNCTION,
      updateFunction: (app) => {
        return {
          ...app,
          ready: true,
          view: {
            // Just an example of updating deep property, not used at the moment.
            // since using primitives here (true), does not need _cloneDeep
            ...app.view,
            content: true,
          },
        };
      },
    });
  }
}
