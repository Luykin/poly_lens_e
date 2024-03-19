// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

import net from 'node:net';
import { BehaviorSubject, Subject } from 'rxjs';
import { LCSApiMessage } from 'shared-lib/models/lcs-api-message';
import { Logger } from '../utils/logger';
import { ISocketClient } from './abstract-socket-client';
import { SocketEvent, SocketEventName } from './abstract-socket-event';

const HOST = '127.0.0.1';
const LOGGER_PREFIX = '[SocketClient]';

enum SOCKET_EVENT_CHANNELS {
  connect = 'connect',
  ready = 'ready',
  end = 'end',
  close = 'close',
  error = 'error',
  data = 'data',
}

/**
 * Socket client for communication with Lens Control Service
 */
export class SocketClient implements ISocketClient {
  private client: net.Socket;

  private connectSubject = new Subject<SocketEvent>();
  public connect$ = this.connectSubject.asObservable();
  private disconnectSubject = new Subject<SocketEvent>();
  public disconnect$ = this.disconnectSubject.asObservable();
  private errorSubject = new Subject<SocketEvent>();
  public error$ = this.errorSubject.asObservable();
  private messageSubject = new Subject<SocketEvent>();
  public message$ = this.messageSubject.asObservable();
  private dataSubject = new Subject<LCSApiMessage>();
  public data$ = this.dataSubject.asObservable();
  public connected$ = new BehaviorSubject<boolean>(false);

  private messageDelimiter: string;

  constructor() {}

  public createConnection(port: number, messageDelimiter: string): void {
    this.messageDelimiter = messageDelimiter;
    Logger.debug(
      `${LOGGER_PREFIX} Trying to establish connection on port`,
      port
    );
    this.client = net.createConnection(port, HOST);

    // Events Listeners
    this.client.on(
      SOCKET_EVENT_CHANNELS.connect,
      this.handleConnect.bind(this)
    );
    this.client.on(SOCKET_EVENT_CHANNELS.ready, this.handleReady.bind(this));
    this.client.on(SOCKET_EVENT_CHANNELS.end, this.handleEnd.bind(this));
    this.client.on(SOCKET_EVENT_CHANNELS.close, this.handleClose.bind(this));
    this.client.on(SOCKET_EVENT_CHANNELS.error, this.handleError.bind(this));
    this.client.on(SOCKET_EVENT_CHANNELS.data, this.handleData.bind(this));
  }

  handleConnect = () => {
    Logger.debug(`${LOGGER_PREFIX} Connect`);
  };

  handleReady = () => {
    Logger.debug(`${LOGGER_PREFIX} Ready`);
    this.connected$.next(true);
    const eventMessage = new SocketEvent(SocketEventName.CONNECTED);
    this.connectSubject.next(eventMessage);
  };

  handleEnd = () => {
    Logger.debug(`${LOGGER_PREFIX} End`);
    this.connected$.next(false);
    const eventMessage = new SocketEvent(SocketEventName.END);
    this.disconnectSubject.next(eventMessage);
  };

  handleClose = (hadError: string) => {
    Logger.debug(`${LOGGER_PREFIX} Close`);
    this.connected$.next(false);
    const eventMessage = new SocketEvent(SocketEventName.CLOSED, hadError);
    this.disconnectSubject.next(eventMessage);
  };

  handleError = (error: string) => {
    Logger.debug(`${LOGGER_PREFIX} Error`, error);
    this.connected$.next(false);
    const eventMessage = new SocketEvent(SocketEventName.ERROR, error);
    this.errorSubject.next(eventMessage);
    // this.tryReconnectOnFailure(RETRY_SOCKET_CONNECTION_INTERVAL);
  };

  handleData = (
    data: WithImplicitCoercion<ArrayBuffer | SharedArrayBuffer>
  ) => {
    const rawMessage = Buffer.from(data).toString();
    Logger.debug(`${LOGGER_PREFIX} ReceivedFromLCS (raw)`, rawMessage);
    const eventMessage = new SocketEvent(SocketEventName.MESSAGE, rawMessage);
    this.messageSubject.next(eventMessage);

    const messageArray = rawMessage.split(this.messageDelimiter);
    for (const message of messageArray) {
      if (!message) {
        continue;
      }

      try {
        const data = JSON.parse(message);
        this.dataSubject.next(data);
      } catch (error) {
        Logger.debug(`${LOGGER_PREFIX} Could not parse invalid JSON message.`, {
          error,
          message,
        });
      }
    }
  };

  private sendMessage(message: string): void {
    if (this.connected$.getValue() === false) {
      return;
    }
    const messageToSend = message + this.messageDelimiter;
    Logger.debug(`${LOGGER_PREFIX} SendToLCS`, messageToSend);
    this.client.write(messageToSend);
  }

  /**
   * Send message to the LCS
   * @param message LCS structured message
   */
  public send(message: object): void {
    try {
      const messageString = JSON.stringify(message);
      this.sendMessage(messageString);
    } catch (error) {
      Logger.debug(
        `${LOGGER_PREFIX} Could not stringify, will not send message.`,
        {
          error,
          message,
        }
      );
    }
  }

  public stop(): void {
    if (this.client) {
      this.client.destroy();
    }
  }
}
