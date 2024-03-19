// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { DeviceListItemUI } from '../../../models/ui/device-list-item.model';
import { SelectedDevice } from '../../../models/state/selected-device.model';

@Component({
  selector: 'oz-device-list',
  templateUrl: './device-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeviceListComponent {
  @Input({ required: true }) deviceList!: DeviceListItemUI[];
  @Input() selectedDevice!: SelectedDevice;
  @Output() deviceSelectionChange = new EventEmitter<string>();

  constructor() {}

  showBadge(device: DeviceListItemUI): boolean {
    return (
      device &&
      !!device.badgeValue &&
      device.device.attached &&
      !device.hasActionInProgress
    );
  }

  handleDeviceSelection(event: string): void {
    this.deviceSelectionChange.next(event);
  }

  isActive(deviceId: string): boolean {
    return this.selectedDevice?.device.deviceId === deviceId;
  }
}
