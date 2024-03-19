import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeviceInfoAndLogsComponent } from './device-info-and-logs.component';
import { expect } from 'expect';
import { DeviceManagerService } from '../../core/services/device-manager/device-manager.service';
import { newAppState } from '../../core/models/state/app-state.model';
import { APP_INIT_STATE_TOKEN } from '../../utilities/constants';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ModalService } from 'src/app/core/services/modal.service';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { DeviceImagePipe } from 'src/app/shared/pipes/device-image.pipe';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';

describe('DeviceInfoAndLogsComponent', () => {
  let component: DeviceInfoAndLogsComponent;
  let fixture: ComponentFixture<DeviceInfoAndLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeviceInfoAndLogsComponent, DeviceImagePipe],
      imports: [
        CommonModule,
        HttpClientTestingModule,
        TranslateModule.forRoot(),
        NgxSmartModalModule.forRoot(),
        ToastrModule.forRoot(),
      ],
      providers: [
        { provide: APP_INIT_STATE_TOKEN, useValue: newAppState() },
        {
          provide: ToastrService,
          useValue: { success: jest.fn(), error: jest.fn() },
        },
        DeviceManagerService,
        ModalService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DeviceInfoAndLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
