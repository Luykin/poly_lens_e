// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

import {
  AfterViewInit,
  Component,
  DestroyRef,
  ViewContainerRef,
  effect,
  inject,
} from '@angular/core';
import { LCSClientManagerService } from './core/services/lcs-client-manager/lcs-client-manager.service';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { ModalService } from './core/services/modal.service';
import { MODAL_ID_LCS_CONNECTION, ROUTE_HOME } from './utilities/constants';
import { NgxSmartModalComponent, NgxSmartModalService } from 'ngx-smart-modal';
import { LcsConnectionModalComponent } from './shared/components/modals/lcs-connection/lcs-connection.component';
import { SocketConnection } from 'shared-lib';
import { timer } from 'rxjs';
import { Router } from '@angular/router';

interface LcsConnectionModalData extends SocketConnection {
  preventModalToShow?: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements AfterViewInit {
  private _destroyRef = inject(DestroyRef);
  private _preventModalToShowTimer = 300; // 5 minutes
  private _preventModalToShow = false;

  isLCSClientConnected = toSignal(
    this.lcsClientManagerService.isLCSClientConnected$
  );

  constructor(
    private lcsClientManagerService: LCSClientManagerService,
    private modalService: ModalService,
    private ngxSmartModalService: NgxSmartModalService,
    private viewContainerReference: ViewContainerRef,
    private router: Router
  ) {
    effect(() => {
      this._checkConnectionStatus();
    });
  }

  ngAfterViewInit(): void {
    // TODO: It will be changed later when we implement logic with login
    // right now we have to timeout this to avoid ExpressionChangedAfterItHasBeenCheckedError
    setTimeout(() => {
      this.router.navigate([ROUTE_HOME]);
    }, 0);
  }

  private _checkConnectionStatus(): void {
    const connection = this.isLCSClientConnected();
    const modals = this.ngxSmartModalService.getOpenedModals();
    const modalInstance = modals.find(
      (modal) => modal.id === MODAL_ID_LCS_CONNECTION
    );

    if (
      (!connection?.connectionEstablishedOnce || connection?.disconnected) &&
      !modalInstance &&
      !this._preventModalToShow
    ) {
      const lcsConnectionModal = this.modalService.create(
        MODAL_ID_LCS_CONNECTION,
        LcsConnectionModalComponent,
        this.viewContainerReference,
        {
          customClass: 'wide',
        },
        { ...connection }
      );

      lcsConnectionModal.onClose.subscribe((modal: NgxSmartModalComponent) => {
        const data = modal.getData() as LcsConnectionModalData;

        if (data.preventModalToShow) {
          this._setTimeoutForModal();
        }
      });
    } else if (modalInstance && !this._preventModalToShow) {
      modalInstance.modal.setData(connection, true);
    }
  }

  private _setTimeoutForModal(): void {
    this._preventModalToShow = true;

    timer(this._preventModalToShowTimer * 1000)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(() => {
        this._preventModalToShow = false;
      });
  }
}
