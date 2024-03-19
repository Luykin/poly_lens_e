import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ConnectionIndicatorComponent } from './connection-indicator.component';
import { expect } from 'expect';
import { IconComponent } from '../icon/icon.component';

describe('ConnectionIndicatorComponent', () => {
  let component: ConnectionIndicatorComponent;
  let fixture: ComponentFixture<ConnectionIndicatorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [IconComponent, ConnectionIndicatorComponent],
      imports: [],
      providers: [],
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectionIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
