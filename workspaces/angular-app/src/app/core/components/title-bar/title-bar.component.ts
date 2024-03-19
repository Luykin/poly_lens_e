// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, startWith, switchMap } from 'rxjs/operators';
import { ElectronIpcService } from '../../services/electron-ipc/electron-ipc.service';
import { WindowApiConst, WindowCommands } from 'shared-lib';
import { UtilityService } from '../../services/utility/utility.service';
import { DeviceManagerService } from '../../services/device-manager/device-manager.service';

export interface TitleBar {
  disabled: boolean;
  hidden: boolean;
  back?: {
    labelKey: string;
    url?: string;
    goBack?: boolean;
  };
}

export const defaultTitleBar: TitleBar = {
  disabled: false,
  hidden: false,
  back: undefined,
};

@Component({
  selector: 'title-bar',
  templateUrl: './title-bar.component.html',
})
export class TitleBarComponent implements OnInit {
  @Input() title: string = 'GENERAL.HOME';
  @Input() goBack: boolean = false;
  public max = false;
  public showSettingsBadge = false;
  public state: TitleBar = defaultTitleBar;
  public isWindows;
  public isMac;

  constructor(
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private router: Router,
    private electronIpcService: ElectronIpcService,
    private deviceManager: DeviceManagerService
  ) {
    this.isWindows = UtilityService.isWindows();
    this.isMac = UtilityService.isMac();
  }

  onBackLinkClicked(): void {
    if (this.state?.back?.goBack) {
      this.location.back();
      return;
    }
    const url = this.state?.back?.url || '/';
    this.router.navigateByUrl(url);
  }

  onMinimizeClicked(): void {
    this.performWindowAction(WindowCommands.Minimize);
  }

  onMaximizeClicked(): void {
    this.max = true;
    this.performWindowAction(WindowCommands.Maximize);
  }

  onRestoreClicked(): void {
    this.max = false;
    this.performWindowAction(WindowCommands.Restore);
  }

  onCloseClicked(): void {
    this.performWindowAction(WindowCommands.Close);
  }

  private performWindowAction(action: WindowCommands): void {
    this.electronIpcService.send(WindowApiConst.WINDOW_REQUEST, action);
  }

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        startWith(this.activatedRoute),
        map(() => this.activatedRoute),
        map((route) => {
          while (route.firstChild) {
            route = route.firstChild;
          }

          return route;
        }),
        filter((route) => route.outlet === 'primary'),
        switchMap((route) => route.data)
      )
      .subscribe((data) => {
        this.state = {
          ...defaultTitleBar,
          ...data?.titleBar,
        };
      });
  }
}
