import { TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { MOCK_PROVIDERS } from '../../mock-providers';
import { SHARED_COMPONENTS } from '../../shared/shared-components';
import { StorageService } from './storage.service';

// in this file, `any` is often used to bypass type safety and test the method itself
/* eslint-disable @typescript-eslint/no-explicit-any */

describe('StorageService', () => {
  let service: StorageService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [...SHARED_COMPONENTS],
      providers: [...MOCK_PROVIDERS],
      imports: [TranslateModule.forRoot(), RouterTestingModule],
    });
    service = TestBed.inject(StorageService);
    localStorage.clear();
  }));

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('sets and retrieves JavaScript primitives', () => {
    // NOTE currently not testing BigInt or Symbol as unlikely to be useful in this context
    const tests = [
      'a long string',
      42,
      false,
      // typed as any to force test of undefined
      undefined as any,
      { 'test key': { 'sub key': 5 } },
    ];
    const testKey = 'EULA_AGREED';

    for (const item of tests) {
      StorageService.clearAllItems();
      StorageService.setItem(testKey, item);
      const result = StorageService.getItem(testKey);

      expect(result).toEqual(item);

      StorageService.clearItem(testKey);
      const clearedResult = StorageService.getItem(testKey);

      expect(clearedResult).toBeUndefined();
    }
  });

  it('default value works as expected when a stored item is falsy or not retrieved', () => {
    const unknownKey = '1337';
    const defaultValue = 'I=()/2 SLL/2E';
    const result = StorageService.getItem(unknownKey, defaultValue);
    expect(result).toEqual(defaultValue as any);

    const result2 = StorageService.getItem(unknownKey);
    expect(result2).toEqual(undefined);

    const uniqueKey = 'xyz';
    const storeValue = '123';
    StorageService.setItem(uniqueKey as any, storeValue as any);
    const result3 = StorageService.getItem(uniqueKey, defaultValue);
    expect(result3).toEqual(storeValue as any);
  });
});
