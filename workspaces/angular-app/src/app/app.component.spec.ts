import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { expect } from 'expect';
import { AppComponent } from './app.component';
import { TitleBarComponent } from './core/components/title-bar/title-bar.component';
import { setupMockWindowApi } from './mock-providers';
import { SHARED_COMPONENTS } from './shared/shared-components';
import { newAppState } from './core/models/state/app-state.model';
import { APP_INIT_STATE_TOKEN } from './utilities/constants';
import { ModalService } from 'src/app/core/services/modal.service';
import { NgxSmartModalModule, NgxSmartModalService } from 'ngx-smart-modal';

describe('AppComponent', () => {
  beforeAll(() => {
    setupMockWindowApi(global);
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, NgxSmartModalModule.forRoot()],
      declarations: [SHARED_COMPONENTS, TitleBarComponent, AppComponent],
      providers: [
        {
          provide: APP_INIT_STATE_TOKEN,
          useValue: newAppState(),
        },
        NgxSmartModalService,
        ModalService,
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(
      compiled.querySelector('.content span')?.textContent
    ).toBeUndefined();
  });
});
