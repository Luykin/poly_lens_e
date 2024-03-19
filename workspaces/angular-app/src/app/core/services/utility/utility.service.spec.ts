// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { expect } from 'expect';
import { setupMockWindowApi } from '../../../mock-providers';
import { UtilityService } from './utility.service';

describe('UtilityService', () => {
  let service: UtilityService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let httpClient: HttpClient;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let httpTestingController: HttpTestingController;

  beforeAll(() => {
    setupMockWindowApi(global);
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    // Inject the http service and test controller for each test
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);

    service = TestBed.inject(UtilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should remove string after', () => {
    expect(UtilityService.getStringUntil('', '.')).toBe('');
    expect(UtilityService.getStringUntil('string.after', '.')).toBe('string');
  });

  it('should identify if it is running a test', () => {
    expect(UtilityService.isInTestRunner()).toBe(true);
  });
});
