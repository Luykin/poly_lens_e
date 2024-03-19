// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

import { Tray, Menu } from 'electron';
import { join } from 'node:path';
import { Subject, Observable } from 'rxjs';
import { Logger } from '../utils/logger';

export enum TrayEvent {
  Open,
}

export class SystemTray {
  public event$: Observable<TrayEvent>;
  private eventSubject: Subject<TrayEvent>;

  private systemTray: Tray;
  private contextMenu: Menu;
  private tooltip: string;

  constructor() {
    this.eventSubject = new Subject<TrayEvent>();
    this.event$ = this.eventSubject.asObservable();

    this.tooltip = 'Poly Lens';
    this.contextMenu = this.buildMenu();
    this.systemTray = new Tray(
      join(__dirname, '../main/icons/tray/connected_white.png')
    );
    this.systemTray.setContextMenu(this.contextMenu);
    this.systemTray.addListener('double-click', this.onDoubleClick);
    this.systemTray.setToolTip(this.tooltip);
  }

  private buildMenu(): Menu {
    return Menu.buildFromTemplate([
      { label: 'Open', type: 'normal', click: this.onOpen },
      { type: 'separator' },
      { label: 'Quit', type: 'normal', role: 'quit' },
    ]);
  }

  private onOpen = (): void => {
    Logger.debug('Tray Open clicked');
    this.eventSubject.next(TrayEvent.Open);
  };

  private onDoubleClick = (
    _event: Electron.KeyboardEvent,
    _bounds: Electron.Rectangle
  ): void => {
    Logger.debug('Tray double-clicked');
    this.eventSubject.next(TrayEvent.Open);
  };
}
