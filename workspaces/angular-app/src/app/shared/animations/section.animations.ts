// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const sectionExpanded = trigger('sectionExpanded', [
  state('expanded', style({ height: '*', visibility: 'visible', opacity: 1 })),
  state(
    'collapsed',
    style({ height: '0px', visibility: 'hidden', opacity: 0 })
  ),
  transition(
    'expanded <=> collapsed',
    animate('0.2s cubic-bezier(0.3, 1, 0.6, 0.9)')
  ),
]);
