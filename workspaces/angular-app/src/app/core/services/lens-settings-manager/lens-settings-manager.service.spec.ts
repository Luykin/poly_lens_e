import { TestBed, waitForAsync } from '@angular/core/testing';
import { expect } from 'expect';
import { COMMON_TESTING_MODULES } from '../../../common-modules';
import { MOCK_PROVIDERS } from '../../../mock-providers';
import { LensSettingsManagerService } from './lens-settings-manager.service';
import { newAppState } from '../../models/state/app-state.model';
import { APP_INIT_STATE_TOKEN } from 'src/app/utilities/constants';

describe('LensSettingsService', () => {
  let service: LensSettingsManagerService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        ...MOCK_PROVIDERS,
        { provide: APP_INIT_STATE_TOKEN, useValue: newAppState() },
      ],
      imports: [...COMMON_TESTING_MODULES],
    });

    service = TestBed.inject(LensSettingsManagerService);
  }));

  it('should create', () => {
    expect(service).toBeTruthy();
  });
});
