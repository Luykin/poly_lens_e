// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { DeviceManagerService } from '../../services/device-manager/device-manager.service';
import { DFUManagerService } from '../../services/dfu-manager/dfu-manager.service';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { DetailNavOptions } from '../../models/state/detail-nav-options.model';
import { DetailNavService } from '../../services/detail-nav/detail-nav.service';
import { ReconnectDeviceEvents } from 'src/app/core/services/reconnect-device-events.service';
import { map, of, startWith, switchMap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ELEMENT_ID_TYPE, MS_IN_SECOND } from 'src/app/utilities/constants';
import { UtilityService } from '../../services/utility/utility.service';

@Component({
  selector: 'app-device-menu',
  templateUrl: './device-menu.component.html',
})
export class DeviceMenuComponent implements OnInit {
  private _destroyRef = inject(DestroyRef);

  controlsState = {
    controlsRoute: false,
    cameraMax: false,
    hideNavigation: false,
  };
  hasDevices = true;
  hasSettings = true;
  deviceReconnecting = false;
  isVideoDevice = false;
  detailNavOptions!: DetailNavOptions;

  selectedDeviceSignal = toSignal(this.deviceManager.selectedDeviceRaw$);
  private _availableDFUSignal = toSignal(
    this.dfuManagerService.availableNewerDFUSelectedDevice$
  );
  public detailNavOptionsSignal = toSignal(
    this.detailNavService.showDetailNavOptions$
  );

  public dfuStatusSignal = toSignal(
    this.dfuManagerService.dfuExecutionStatusForSelectedDevice$
  );

  constructor(
    private deviceManager: DeviceManagerService,
    private dfuManagerService: DFUManagerService,
    private detailNavService: DetailNavService,
    private reconnectDeviceEvents: ReconnectDeviceEvents,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.deviceManager.selectedDeviceRaw$
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        switchMap((selectedDevice) => {
          // this.device = selectedDevice?.device;
          if (selectedDevice?.device) {
            // Use the selected device in the reconnecting status observable
            return this.reconnectDeviceEvents
              .getStatus(selectedDevice.device)
              .pipe(
                map((status) => status === 'Reconnecting'),
                startWith(false) // Initial value before status is available
              );
          }
          return of(false);
        })
      )
      .subscribe((isReconnecting) => {
        this.deviceReconnecting = isReconnecting;

        // If device is reconnecting, navigate to overview after 5 seconds
        if (this.deviceReconnecting) {
          setTimeout(() => {
            this.router.navigate(['./overview'], {
              relativeTo: this.route,
            });
          }, 5 * MS_IN_SECOND);
        }
      });
  }

  get shouldDisableSettings(): boolean | undefined {
    return (
      !this.selectedDeviceSignal()?.device?.attached ||
      this.deviceReconnecting ||
      this.hasDfuOnGoing
    );
  }

  /**
   * Has available DFU for selected device
   */
  get hasAvailableDFU(): boolean {
    return this._availableDFUSignal() !== undefined;
  }

  /**
   * Has ongoing DFU for selected device
   */
  get hasDfuOnGoing(): boolean {
    return (
      this.selectedDeviceSignal()?.device.state?.toLowerCase() === 'dfumode'
    );
  }

  get deviceTitle(): string | undefined {
    return (
      this.detailNavOptionsSignal()?.deviceHeading ||
      this.selectedDeviceSignal()?.device?.productName
    );
  }

  get id(): string {
    return UtilityService.prepareIdsForAutomationTests(
      this.deviceTitle!,
      ELEMENT_ID_TYPE.HEADING
    );
  }
}
