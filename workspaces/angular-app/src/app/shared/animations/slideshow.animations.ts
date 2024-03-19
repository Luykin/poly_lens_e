// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

import { animate, style, transition, trigger } from '@angular/animations';

const defaults = {
  delayEnter: '0ms',
  delayLeave: '0ms',
  timingEnter: '500ms',
  timingLeave: '500ms',
};

export const flyInOutRTLAnimation = trigger('flyInOutRTL', [
  transition(
    ':enter',
    [
      style({ transform: 'translate(0)' }),
      animate(
        '{{timingEnter}} {{delayEnter}} ease',
        style({ transform: 'translateX(-100%)' })
      ),
    ],
    {
      params: {
        delayEnter: defaults.delayEnter,
        timingEnter: defaults.timingEnter,
      },
    }
  ),
  transition(
    ':leave',
    [
      animate(
        '{{timingLeave}} {{delayLeave}} ease',
        style({ transform: 'translateX(-100%)' })
      ),
    ],
    {
      params: {
        delayLeave: defaults.delayLeave,
        timingLeave: defaults.timingLeave,
      },
    }
  ),
]);
