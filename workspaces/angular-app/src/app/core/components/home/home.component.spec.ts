import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { expect } from 'expect';
import { TranslateModule } from '@ngx-translate/core';
import { DynamicCardComponent } from 'src/app/shared/components/dynamic-card/dynamic-card.component';
import { IconComponent } from 'src/app/shared/components/icon/icon.component';
import { MOCK_PROVIDERS } from 'src/app/mock-providers';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent, DynamicCardComponent, IconComponent],
      providers: [MOCK_PROVIDERS],
      imports: [TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('page header', () => {
    let element: HTMLElement;

    beforeEach(() => {
      element = fixture.debugElement.nativeElement.querySelector('h1');
    });

    it('should render h1 tag', () => {
      expect(element).toBeDefined();
    });

    it('should have "HOME.TITLE_GUEST" text', () => {
      expect(element.textContent).toBe('HOME.TITLE_GUEST');
    });
  });

  describe('page cards', () => {
    let elements: HTMLElement[];
    const cardNames: string[] = [
      'HOME.CARDS.DEVICE_USAGE',
      'HOME.CARDS.HEALTH_AND_WELLNESS',
      'HOME.CARDS.BEST_PRACTICES',
      'HOME.CARDS.SUPPORT',
    ];

    beforeEach(() => {
      elements =
        fixture.debugElement.nativeElement.querySelectorAll('oz-dynamic-card');
    });

    it('should render four cards', () => {
      expect(elements).toHaveLength(4);
    });

    for (const [index, cardName] of cardNames.entries()) {
      it(`should have card with "${cardName}.TITLE" title and "${cardName}.DESCRIPTION" description`, () => {
        expect(elements[index].querySelector('.title')?.textContent).toBe(
          `${cardName}.TITLE`
        );
        expect(elements[index].querySelector('.description')?.textContent).toBe(
          ` ${cardName}.DESCRIPTION `
        );
      });
    }
  });
});
