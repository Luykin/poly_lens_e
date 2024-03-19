import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeviceMenuComponent } from './device-menu.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { DeviceManagerService } from '../../services/device-manager/device-manager.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { expect } from 'expect';
import { APP_INIT_STATE_TOKEN } from '../../../utilities/constants';
import { AppStateType, newAppState } from '../../models/state/app-state.model';
import { StateService } from '../../state-management/state.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';

// Create a mock ActivatedRoute
const mockActivatedRoute = {
  paramMap: of(new Map<string, string>([['id', '123']])), // Mock whatever data you need here
};

const device = {
  id: '123',
  productName: 'Test Device',
  attached: true,
  parentId: 'parent',
  parent: { attached: true },
};

const deviceManagerServiceMock = {
  getDeviceById(_id: string) {
    return of(device);
  },
  selectedDevice$: of(device),
  selectedDeviceRaw$: of({ device }),
};

describe('DeviceMenuComponent', () => {
  let component: DeviceMenuComponent;
  let fixture: ComponentFixture<DeviceMenuComponent>;
  let stateService: StateService<AppStateType>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeviceMenuComponent],
      imports: [
        CommonModule,
        TranslateModule.forRoot(),
        ToastrModule.forRoot(),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {
          provide: ToastrService,
          useValue: { success: jest.fn(), error: jest.fn() },
        },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: DeviceManagerService, useValue: deviceManagerServiceMock },
        { provide: APP_INIT_STATE_TOKEN, useValue: newAppState() },
        StateService,
      ],
    }).compileComponents();

    stateService = TestBed.inject(StateService<AppStateType>);
    stateService.initialize(newAppState());
    fixture = TestBed.createComponent(DeviceMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
