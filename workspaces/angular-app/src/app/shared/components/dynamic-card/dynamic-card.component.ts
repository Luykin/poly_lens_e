// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { UtilityService } from '../../../core/services/utility/utility.service';

export enum DynamicCardStyleTypes {
  RECTANGLE_CARD,
  DETAIL_CARD,
}
@Component({
  selector: 'oz-dynamic-card',
  templateUrl: './dynamic-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicCardComponent {
  @Input() header?: string;
  @Input() title!: string;
  @Input() logo!: string;
  @Input() style: DynamicCardStyleTypes;
  @Input() description!: string;
  @Input() index!: string;
  @Input() sourceLink!: string;
  @Input() sourceLinkLabel!: string;
  @Input() source!: string;
  @Input() disabled = false;
  @Input() tooltipText!: string;
  @Input() id!: string;

  handleOpenBrowser() {
    UtilityService.openExternalBrowser(this.sourceLink);
  }

  constructor() {
    this.style = DynamicCardStyleTypes.RECTANGLE_CARD;
  }

  get isRectangleCard(): boolean {
    return this.style === DynamicCardStyleTypes.RECTANGLE_CARD;
  }

  get isDetailCard(): boolean {
    return this.style === DynamicCardStyleTypes.DETAIL_CARD;
  }
}
