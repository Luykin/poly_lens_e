import { TestBed, waitForAsync } from '@angular/core/testing';
import { expect } from 'expect';
import { MOCK_PROVIDERS } from '../../../mock-providers';
import { AdminConfig } from './admin-config.service';

describe('AdminStorageService', () => {
  let service: AdminConfig;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [...MOCK_PROVIDERS],
    });
    service = TestBed.inject(AdminConfig);
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
