// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

export enum SocketEventName {
  CONNECTED = 'CONNECTED',
  MESSAGE = 'MESSAGE',
  END = 'END',
  ERROR = 'ERROR',
  CLOSED = 'CLOSED',
}

export class SocketEvent {
  public name: SocketEventName;
  public data?: string;

  constructor(name: SocketEventName, data?: string) {
    this.name = name;
    if (data) {
      this.data = data;
    }
  }
}
