// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

import { DeviceUI } from '../../../models/ui/device-ui.model';

export class DeviceListDeviceInfo {
	public device: DeviceUI;
	public badgeValue?: number;
	public supported = true;

	constructor(device: DeviceUI) {
		this.device = device;
	}
}
