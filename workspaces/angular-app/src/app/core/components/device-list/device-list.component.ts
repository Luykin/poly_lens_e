// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

import { Component, OnInit } from '@angular/core';
import { ElectronIpcService } from '../../services/electron-ipc/electron-ipc.service';
import { LCSApiMessage, WindowApiConst } from 'shared-lib';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { GetDeviceList } from '../../models/lcs-requests/get-device-list';
import { RegisterClient } from '../../models/lcs-requests/register-client';
import { ClientRegistered } from '../../models/lcs-responses/client-registered';
import { Device } from '../../models/lcs-responses/device';
import { DeviceList } from '../../models/lcs-responses/device-list';

@Component({
	selector: 'app-device-list',
	templateUrl: './device-list.component.html',
	styleUrl: './device-list.component.scss',
})
export class DeviceListComponent implements OnInit {
	private clientRegisteredSubject = new BehaviorSubject<boolean>(false);
	public clientRegistered$ = this.clientRegisteredSubject.asObservable();
	private deviceListSubject = new BehaviorSubject<Device[]>([]);
	public deviceList$ = this.deviceListSubject.asObservable();

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	private lcsListenersMapper = new Map<string, any>();

	constructor(private electronIpc: ElectronIpcService) {
		// Prepare LCS listeners
		this.lcsListenersMapper.set(
			ClientRegistered.prototype.constructor.name,
			this.handleLCSResponseClientRegistered.bind(this)
		);
		this.lcsListenersMapper.set(
			DeviceList.prototype.constructor.name,
			this.handleLCSResponseDeviceList.bind(this)
		);
	}

	ngOnInit(): void {
		this.electronIpc.receive(
			WindowApiConst.LCS_RESPONSE,
			this.handleLCSResponse.bind(this)
		);
	}

	handleLCSResponse(lcsResponse: LCSApiMessage): void {
		const listener = this.lcsListenersMapper.get(lcsResponse.type);

		if (!listener) {
			// console.log('Listener not found for', lcsResponse.type);
			return;
		}
		listener(lcsResponse);
	}

	handleLCSResponseClientRegistered(_lcsResponse: ClientRegistered): void {
		this.clientRegisteredSubject.next(true);
	}

	handleLCSResponseDeviceList(lcsResponse: DeviceList): void {
		const devices = lcsResponse.devices;
		this.deviceListSubject.next(devices);
	}

	handleShowDevices(): void {
		if (this.clientRegisteredSubject.getValue()) {
			const getDeviceListRequest = new GetDeviceList();
			this.electronIpc.send(WindowApiConst.LCS_REQUEST, getDeviceListRequest);
		}
	}

	handleConnect(): void {
		if (!this.clientRegisteredSubject.getValue()) {
			const registerClientRequest = new RegisterClient();
			this.electronIpc.send(WindowApiConst.LCS_REQUEST, registerClientRequest);
		}
	}

	get showDeviceList$(): Observable<boolean> {
		return this.deviceList$.pipe(
			map((deviceList) => deviceList && deviceList.length > 0)
		);
	}
}
