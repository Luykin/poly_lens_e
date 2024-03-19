import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnyIconTooltipComponent } from './any-icon-tooltip.component';

describe('AnyIconTooltipComponent', () => {
  let component: AnyIconTooltipComponent;
  let fixture: ComponentFixture<AnyIconTooltipComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnyIconTooltipComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AnyIconTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should show tooltip', () => {
    // Mock the tooltipContent
    const tooltipContentMock = {
      nativeElement: {
        style: {
          display: 'none',
          setProperty: jest.fn(),
        },
        getBoundingClientRect: jest.fn(() => ({
          top: 0,
          left: 0,
          width: 100,
          height: 50,
        })),
      },
    };
    component.tooltipContent = tooltipContentMock;
    component.showTooltip();

    expect(tooltipContentMock.nativeElement.style.display).toBe('block');
  });

  it('should hide tooltip', () => {
    // Mock the tooltipContent
    const tooltipContentMock = {
      nativeElement: {
        style: {
          display: 'block',
          setProperty: jest.fn(),
        },
      },
    };
    component.tooltipContent = tooltipContentMock;

    component.hideTooltip();

    expect(tooltipContentMock.nativeElement.style.display).toBe('none');
  });
});
