// Copyright 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

import { WindowApiConst, WindowCommands } from 'shared-lib';
import { AbstractService } from '../abstract-service';
import { BrowserWindow } from 'electron';

export class WindowService extends AbstractService<
  WindowCommands,
  WindowCommands
> {
  private _electronWindow: BrowserWindow | undefined;

  constructor() {
    super();
  }

  setWindow(electronWindow: BrowserWindow | undefined): void {
    this._electronWindow = electronWindow;
  }

  receptionChannel(): string {
    return WindowApiConst.WINDOW_REQUEST;
  }

  process(_input: WindowCommands): void {
    this.onWindowEventRecieved(_input);
  }

  private onWindowEventRecieved(event: WindowCommands) {
    switch (event) {
      case WindowCommands.Minimize: {
        this._electronWindow?.minimize();
        return;
      }
      case WindowCommands.Maximize: {
        this._electronWindow?.maximize();
        return;
      }
      case WindowCommands.Restore: {
        this._electronWindow?.restore();
        return;
      }
      case WindowCommands.Close: {
        this._electronWindow?.close();
        return;
      }
    }
  }
}
