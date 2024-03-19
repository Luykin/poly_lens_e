// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

import { Observable, BehaviorSubject } from 'rxjs';
import { SocketEvent } from './abstract-socket-event';
import { LCSApiMessage } from 'shared-lib';

export interface ISocketClient {
  // TODO: Revisit
  data$: Observable<LCSApiMessage>;
  connect$: Observable<SocketEvent>;
  disconnect$: Observable<SocketEvent>;
  error$: Observable<SocketEvent>;
  message$: Observable<SocketEvent>;

  connected$: BehaviorSubject<boolean>;

  createConnection(port: number, messageDelimiter: string): void;

  // sendMessage(message: string): void;
  send(message: object): void;

  // /**
  //  * Send socket command. One way, does not expect any response.
  //  * @param Type Type of command
  //  * @param payload Payload, JSON usually
  //  */
  // send(type: string, payload?: any): void;

  // /**
  //  * Send socket command and subscribe as listener for the responses.
  //  * @param type Type of command
  //  * @param payload Payload, JSON usually
  //  * @returns Response from the socket observable wrapped
  //  */
  // sendAndListen<T>(type: string, payload?: any): Observable<T>;

  // /**
  //  * Send socket command, subscribe and wait for the first response.
  //  * Will be completed after the first response.
  //  * @param type Type of command
  //  * @param payload Payload, JSON usually
  //  * @returns Response from the socket observable wrapped
  //  */
  // sendAndListenOnce<T>(type: string, payload?: any): Observable<T>;

  stop(): void;
}

export interface ISocketData<T> {
  type: string;
  data: T;
}
