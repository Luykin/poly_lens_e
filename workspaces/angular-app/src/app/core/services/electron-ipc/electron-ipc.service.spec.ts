import { TestBed } from '@angular/core/testing';
import { expect } from 'expect';
import { ElectronIpcService } from './electron-ipc.service';

describe('ElectronIpcService', () => {
  let service: ElectronIpcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ElectronIpcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
