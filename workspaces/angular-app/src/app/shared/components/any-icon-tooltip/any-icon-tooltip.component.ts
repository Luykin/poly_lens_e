import { Component, ElementRef, Input, ViewChild } from '@angular/core';

export type TooltipDirection = 'left' | 'right' | 'bottom';

@Component({
  selector: 'oz-any-icon-tooltip',
  templateUrl: './any-icon-tooltip.component.html',
})
export class AnyIconTooltipComponent {
  @ViewChild('iconContainerRef') iconContainer?: ElementRef;
  @ViewChild('tooltipContentRef') tooltipContent?: ElementRef;
  @Input() icon!: string;
  @Input() size!: number;
  @Input() direction: TooltipDirection = 'right';
  @Input() spinAnimation: boolean = false;
  @Input() offset: number = 15;

  public showTooltip() {
    if (this.tooltipContent) {
      this.tooltipContent.nativeElement.style.display = 'block'; // Show the tooltip
      this._calculateAndApplyPosition();
    }
  }

  public hideTooltip() {
    if (this.tooltipContent) {
      this.tooltipContent.nativeElement.style.display = 'none'; // Hide the tooltip
    }
  }

  private _calculateAndApplyPosition() {
    if (!this.iconContainer || !this.tooltipContent) {
      return;
    }

    const tooltipRect =
      this.tooltipContent.nativeElement.getBoundingClientRect();
    const iconRect = this.iconContainer.nativeElement.getBoundingClientRect();

    switch (this.direction) {
      case 'left': {
        this._positionTooltipLeft(iconRect, tooltipRect, this.offset);
        break;
      }
      case 'right': {
        this._positionTooltipRight(iconRect, tooltipRect, this.offset);
        break;
      }
      case 'bottom': {
        this._positionTooltipBottom(iconRect, tooltipRect, this.offset);
        break;
      }
      default: {
        throw new Error(`Unsupported direction: ${this.direction}`);
      }
    }
  }

  private _positionTooltipLeft(
    iconRect: DOMRect,
    tooltipRect: DOMRect,
    offset: number
  ) {
    const left = iconRect.left - tooltipRect.width - offset;
    const top = iconRect.top + iconRect.height / 2 - tooltipRect.height / 2;

    this._setTooltipPosition(left, top);
  }

  private _positionTooltipRight(
    iconRect: DOMRect,
    tooltipRect: DOMRect,
    offset: number
  ) {
    const left = iconRect.right + offset;
    const top = iconRect.top + iconRect.height / 2 - tooltipRect.height / 2;

    this._setTooltipPosition(left, top);
  }

  private _positionTooltipBottom(
    iconRect: DOMRect,
    tooltipRect: DOMRect,
    offset: number
  ) {
    const left = iconRect.left + iconRect.width - tooltipRect.width / 2;
    const top = iconRect.bottom + offset;

    this._setTooltipPosition(left, top);
  }

  private _setTooltipPosition(left: number, top: number) {
    this.tooltipContent!.nativeElement.style.left = `${left}px`;
    this.tooltipContent!.nativeElement.style.top = `${top}px`;
  }
}
