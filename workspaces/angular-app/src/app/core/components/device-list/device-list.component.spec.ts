// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceListComponent } from './device-list.component';
import { expect } from 'expect';

describe('DeviceListComponent', () => {
	let component: DeviceListComponent;
	let fixture: ComponentFixture<DeviceListComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [DeviceListComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(DeviceListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
