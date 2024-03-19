// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

import { ContentChild, Directive, Input } from '@angular/core';
import { AccordionContent } from './accordion-content.directive';

@Directive({
  selector: 'oz-accordion-item',
})
export class AccordionItemComponent {
  @Input({ required: true }) title!: string;
  @Input() set disabled(value: boolean) {
    this.isDisabled = value;
  }
  @ContentChild(AccordionContent) content!: AccordionContent;

  isDisabled!: boolean;
}
