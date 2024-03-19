import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicCardComponent } from './dynamic-card.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { expect } from 'expect';

describe('DynamicCardComponent', () => {
  let component: DynamicCardComponent;
  let fixture: ComponentFixture<DynamicCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [],
      imports: [TranslateModule.forRoot(), RouterTestingModule],
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicCardComponent);
    fixture.componentInstance.logo = 'home';
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
