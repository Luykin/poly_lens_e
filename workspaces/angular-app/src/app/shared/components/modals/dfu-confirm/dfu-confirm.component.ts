// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { DeviceUI } from 'src/app/core/models/ui/device-ui.model';
import { DFUManagerService } from 'src/app/core/services/dfu-manager/dfu-manager.service';
import { MODAL_ID_DFU_CONFIRM } from 'src/app/utilities/constants';

interface DfuConfirmModalData {
  path: string;
  device: DeviceUI;
}

@Component({
  templateUrl: './dfu-confirm.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DfuConfirmComponent implements AfterViewInit {
  private _destroyRef = inject(DestroyRef);
  private _changeDetectorRef = inject(ChangeDetectorRef);

  data!: DfuConfirmModalData;

  get deviceName(): string {
    return this.data?.device?.productName || '';
  }

  constructor(
    private ngxSmartModalService: NgxSmartModalService,
    private dfuManagerService: DFUManagerService
  ) {}

  ngAfterViewInit(): void {
    this.ngxSmartModalService
      .getModal(MODAL_ID_DFU_CONFIRM)
      .onDataAdded.pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((data: DfuConfirmModalData) => {
        this.data = data;
        this._changeDetectorRef.markForCheck();
      });
  }

  public close(): void {
    this.ngxSmartModalService.close(MODAL_ID_DFU_CONFIRM);
  }

  public confirm(): void {
    this.close();

    if (this.data.device) {
      this.dfuManagerService.scheduleCustomDFU(
        this.data.device.deviceId,
        this.data.path
      );
    }
  }
}
