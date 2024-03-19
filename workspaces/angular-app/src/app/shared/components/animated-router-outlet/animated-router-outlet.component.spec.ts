// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { AnimatedRouterOutletComponent } from './animated-router-outlet.component';
import { expect } from 'expect';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppModule } from '../../../app.module';
import { MOCK_PROVIDERS } from '../../../mock-providers';

describe('AnimatedRouterOutletComponent', () => {
  let component: AnimatedRouterOutletComponent;
  let fixture: ComponentFixture<AnimatedRouterOutletComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [AppModule, NoopAnimationsModule],
      providers: [...MOCK_PROVIDERS],
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimatedRouterOutletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
