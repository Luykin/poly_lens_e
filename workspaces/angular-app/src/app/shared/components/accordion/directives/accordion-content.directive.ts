// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[ozAccordionContent]',
})
export class AccordionContent {
  constructor(public templateReference: TemplateRef<HTMLElement>) {}
}
