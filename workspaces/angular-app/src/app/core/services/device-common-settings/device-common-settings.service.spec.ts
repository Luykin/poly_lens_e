import { TestBed } from '@angular/core/testing';
import { expect } from 'expect';
import { DeviceCommonSettingsService } from './device-common-settings.service';

describe('DeviceSettingsService', () => {
  let service: DeviceCommonSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeviceCommonSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
