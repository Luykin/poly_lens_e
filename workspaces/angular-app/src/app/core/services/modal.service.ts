// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

import { Injectable, Type, ViewContainerRef } from '@angular/core';
import {
  INgxSmartModalOptions,
  NgxSmartModalComponent,
  NgxSmartModalService,
} from 'ngx-smart-modal';
import { Subject, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private _destroy$: Subject<void> = new Subject();

  constructor(private ngxSmartModalService: NgxSmartModalService) {}

  create(
    id: string,
    content: Type<unknown>,
    viewContainerReference: ViewContainerRef,
    options?: INgxSmartModalOptions,
    data?: Record<string, unknown>
  ): NgxSmartModalComponent {
    const modal = this.ngxSmartModalService
      .create(id, content, viewContainerReference, {
        dismissable: false,
        escapable: false,
        ...options,
      })
      .open();

    if (data) {
      this._setData(modal, data);
    }

    this._onClose(modal);

    return modal;
  }

  private _setData(
    modal: NgxSmartModalComponent,
    data: Record<string, unknown>
  ): void {
    modal.onOpenFinished
      .pipe(takeUntil(this._destroy$))
      .subscribe((modal: NgxSmartModalComponent) => {
        modal.setData(data);
      });
  }

  private _onClose(modal: NgxSmartModalComponent): void {
    // The ngx-smart-modal component is not destroyed after it is closed.
    // So we have to do it manually.
    modal.onAnyCloseEventFinished
      .pipe(takeUntil(this._destroy$))
      .subscribe((modal: NgxSmartModalComponent) => {
        this._destroy$.next();
        this._destroy$.complete();
        modal.ngOnDestroy();
      });
  }
}
