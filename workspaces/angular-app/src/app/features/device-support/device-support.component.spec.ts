import { ComponentFixture, TestBed } from '@angular/core/testing';
import { expect } from 'expect';
import { DeviceSupportComponent } from './device-support.component';
import { DeviceManagerService } from '../../core/services/device-manager/device-manager.service';
import { newAppState } from '../../core/models/state/app-state.model';
import { APP_INIT_STATE_TOKEN } from '../../utilities/constants';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { DynamicCardComponent } from '../../shared/components/dynamic-card/dynamic-card.component';

describe('DeviceSupportComponent', () => {
  let component: DeviceSupportComponent;
  let fixture: ComponentFixture<DeviceSupportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeviceSupportComponent, DynamicCardComponent],
      imports: [CommonModule, TranslateModule.forRoot()],
      providers: [
        { provide: APP_INIT_STATE_TOKEN, useValue: newAppState() },
        DeviceManagerService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DeviceSupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
