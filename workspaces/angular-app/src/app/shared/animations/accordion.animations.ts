// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const accordionCategoryAnimationOpen = trigger(
  'accordionCategoryAnimationOpen',
  [
    transition(':enter', [
      style({
        opacity: 0,
        height: 0,
      }),
      animate(
        '200ms ease-out',
        style({
          opacity: 1,
          height: '*',
        })
      ),
    ]),
  ]
);

export const accordionCategoryAnimationClose = trigger(
  'accordionCategoryAnimationClose',
  [
    state(
      'open',
      style({
        opacity: 1,
        height: '*',
      })
    ),
    state(
      'closed',
      style({
        opacity: 0,
        height: 0,
      })
    ),
    transition('open => closed', [animate('200ms')]),
  ]
);
