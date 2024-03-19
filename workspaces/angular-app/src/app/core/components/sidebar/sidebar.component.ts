// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { DeviceListItemUI } from '../../models/ui/device-list-item.model';
import { AnimationOptions } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';
import { DeviceManagerService } from '../../services/device-manager/device-manager.service';
import { DeviceUI } from '../../models/ui/device-ui.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { DFUManagerService } from '../../services/dfu-manager/dfu-manager.service';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  private _deviceListSignal = toSignal(this.deviceManagerService.deviceList$, {
    initialValue: [],
  });

  private _availableNewerDFUAllDevicesSignal = toSignal(
    this.dfuManagerService.availableNewerDFUAllDevices$
  );

  public dfuExecutionStatusAllDevicesSignal = toSignal(
    this.dfuManagerService.dfuExecutionStatusAllDevices$
  );

  public selectedDeviceSignal = toSignal(
    this.deviceManagerService.selectedDeviceRaw$
  );

  // eslint-disable-next-line unicorn/consistent-function-scoping
  public deviceListItemsComputed = computed<DeviceListItemUI[]>(() => {
    const availableDFUList = this._availableNewerDFUAllDevicesSignal();
    return this._deviceListSignal()
      .map((device: DeviceUI) => {
        const deviceListItem = new DeviceListItemUI(device);
        deviceListItem.badgeValue = availableDFUList?.[device.deviceId] ? 1 : 0;
        deviceListItem.hasActionInProgress =
          device.state?.toLowerCase() === 'dfumode';
        return deviceListItem;
      })
      .sort((a: DeviceListItemUI, b: DeviceListItemUI) => {
        return +b.device.attached - +a.device.attached;
      });
  });

  public showDeviceListComputed = computed<boolean>(
    // eslint-disable-next-line unicorn/consistent-function-scoping
    () => !!this._deviceListSignal() && this._deviceListSignal().length > 0
  );

  constructor(
    private router: Router,
    private deviceManagerService: DeviceManagerService,
    private dfuManagerService: DFUManagerService
  ) {}

  handleDeviceSelection(deviceId: string): void {
    this.deviceManagerService.setSelectedDevice(deviceId);
    this.router.navigate(['/detail', deviceId, 'overview']);
  }

  // very laggy Windows performance has been observed due to lottie; this improves the condition by not
  // rendering more subframes than necessary based on JSON After Effects frames per second
  public animationCreated(animationItem: AnimationItem): void {
    animationItem.setSubframe(false);
  }

  public animationOptions: AnimationOptions = {
    path: 'assets/lottie/no_devices.json',
  };
}
