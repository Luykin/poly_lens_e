// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  TranslateFakeLoader,
  TranslateLoader,
  TranslateModule,
} from '@ngx-translate/core';
import { expect } from 'expect';
import { LottieModule } from 'ngx-lottie';
import { SHARED_COMPONENTS } from '../../../shared/shared-components';
import { mockPlayerFactory } from '../../factories/lottie-player.factory';
import { newAppState } from '../../models/state/app-state.model';
import { StateService } from '../../state-management/state.service';

import { SidebarComponent } from './sidebar.component';
import { APP_INIT_STATE_TOKEN } from '../../../utilities/constants';
import { ToastrModule, ToastrService } from 'ngx-toastr';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SHARED_COMPONENTS, SidebarComponent],
      imports: [
        BrowserAnimationsModule,
        BrowserModule,
        LottieModule.forRoot({ player: mockPlayerFactory }),
        ToastrModule.forRoot(),
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader,
          },
        }),
      ],
      providers: [
        { provide: APP_INIT_STATE_TOKEN, useValue: newAppState() },
        {
          provide: ToastrService,
          useValue: { success: jest.fn(), error: jest.fn() },
        },
        StateService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
