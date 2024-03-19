// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UtilityService } from '../../core/services/utility/utility.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { DeviceManagerService } from '../../core/services/device-manager/device-manager.service';
import { DynamicCardStyleTypes } from '../../shared/components/dynamic-card/dynamic-card.component';
import { DetailNavService } from 'src/app/core/services/detail-nav/detail-nav.service';

@Component({
  selector: 'oz-device-support',
  templateUrl: './device-support.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeviceSupportComponent implements OnInit {
  public selectedDevice = toSignal(
    this.deviceManagerService.selectedDeviceRaw$
  );
  public DynamicCardStyleEnum = DynamicCardStyleTypes;
  parentDevice: undefined;

  constructor(
    private deviceManagerService: DeviceManagerService,
    private detailNavService: DetailNavService
  ) {}

  ngOnInit(): void {
    this.detailNavService.setDetailNavOptions({
      showDeviceHeading: true,
      showNav: true,
    });
  }

  handleOpenBrowser(url: string) {
    if (this.isCloud) {
      UtilityService.openExternalBrowser(url);
    }
  }

  get isCloud(): boolean {
    // TODO: Needs to implement logic
    return false;
  }
}
