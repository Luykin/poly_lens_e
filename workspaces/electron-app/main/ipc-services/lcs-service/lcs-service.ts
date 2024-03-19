// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

import { Observable } from 'rxjs';
import { WindowApiConst, LCSApiMessage } from 'shared-lib';
import { AbstractService } from '../abstract-service';
import { LensServiceProcessAgent } from '../../utils/lcs-process-agent';
import { ISocketClient } from '../../socket-client/abstract-socket-client';

export class LCSService extends AbstractService<LCSApiMessage, LCSApiMessage> {
  lcsProcessAgent: LensServiceProcessAgent;
  socketClient: ISocketClient;

  public events$?: Observable<LCSApiMessage>;

  constructor() {
    super();
    // Instance of the Lens Service API
    this.lcsProcessAgent = new LensServiceProcessAgent();
    this.lcsProcessAgent.connect();
    this.socketClient = this.lcsProcessAgent.socketClient;
    this.events$ = this.socketClient.data$;
  }

  receptionChannel(): string {
    return WindowApiConst.LCS_REQUEST;
  }

  sendingChannel(): string {
    return WindowApiConst.LCS_RESPONSE;
  }

  process(input: LCSApiMessage): void {
    this.socketClient.send(input);
  }
}
