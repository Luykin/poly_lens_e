// Copyright 2009, 2024 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { timer } from 'rxjs';
import { SocketConnection } from 'shared-lib';
import {
  MODAL_ID_LCS_CONNECTION,
  ROUTE_HOME,
} from 'src/app/utilities/constants';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './lcs-connection.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LcsConnectionModalComponent {
  private _destroyRef = inject(DestroyRef);
  private _changeDetectorRef = inject(ChangeDetectorRef);
  private _troubleshootingUrl =
    'https://info.lens.poly.com/docs/category/troubleshooting';
  private _switchViewTimer = 5;

  connection!: SocketConnection;
  connectionEstablishedAnimationOptions: AnimationOptions = {
    path: 'assets/lottie/lcs_connection_not_established.json',
  };
  disconnectedAnimationOptions: AnimationOptions = {
    path: 'assets/lottie/no_devices.json',
  };
  timerFinished = false;

  get isConnectionEstablished(): boolean {
    return this.connection?.connectionEstablishedOnce;
  }

  get isDisconnected(): boolean {
    return this.connection?.disconnected;
  }

  constructor(
    private ngxSmartModalService: NgxSmartModalService,
    private router: Router
  ) {}

  public ngAfterViewInit(): void {
    this._navigateToHomePage();
    this._onModalEvents();
    this._switchView();
  }

  public animationCreated(animationItem: AnimationItem): void {
    animationItem.setSubframe(false);
  }

  public openTroubleshootingPage(): void {
    UtilityService.openExternalBrowser(this._troubleshootingUrl);
  }

  public close(): void {
    const modal = this.ngxSmartModalService.getModal(MODAL_ID_LCS_CONNECTION);

    modal?.setData(
      {
        ...this.connection,
        preventModalToShow: true,
      },
      true
    );
    modal?.close();
  }

  private _navigateToHomePage(): void {
    this.router.navigate([ROUTE_HOME]);
  }

  private _onModalEvents(): void {
    const modal = this.ngxSmartModalService.getModal(MODAL_ID_LCS_CONNECTION);

    modal?.onDataAdded
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((data: SocketConnection) => {
        this.connection = {
          connectionEstablishedOnce: data.connectionEstablishedOnce,
          disconnected: data.disconnected,
        };
        this._changeDetectorRef.markForCheck();
        this._tryToCloseModal();
      });

    modal?.onOpenFinished
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(() => {
        this._tryToCloseModal();
      });
  }

  /**
   * It's changing the view from connection not established to disconnected after certain time.
   */
  private _switchView(): void {
    timer(this._switchViewTimer * 1000)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(() => {
        this.timerFinished = true;
      });
  }

  private _tryToCloseModal(): void {
    if (
      this.connection?.connectionEstablishedOnce &&
      !this.connection?.disconnected
    ) {
      this.ngxSmartModalService.close(MODAL_ID_LCS_CONNECTION);
    }
  }
}
