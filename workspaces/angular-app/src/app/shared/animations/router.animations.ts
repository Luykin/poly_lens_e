// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

import {
  animate,
  animateChild,
  group,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';

const resetRoute = [
  style({ position: 'relative' }),
  query(':enter, :leave', [
    style({
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
    }),
  ]),
];

const options = { optional: true };

const resetSubRoute = [
  style({ position: 'relative' }),
  query(
    ':enter, :leave',
    [
      style({
        position: 'absolute',
        left: 0,
        width: '100%',
      }),
    ],
    options
  ),
];

const QUERY_ENTER = ':enter';
const QUERY_LEAVE = ':leave';
const EASE_OUT_300MS = '300ms ease-out';
const EASE_OUT_500MS = '500ms ease-out';
export const routeAnimation = trigger('routeAnimations', [
  transition('HomePage => OtherPage', [
    ...resetRoute,
    query(QUERY_ENTER, [style({ left: '100%' })]),
    // query(QUERY_LEAVE, animateChild()),
    group([
      query(QUERY_LEAVE, [animate(EASE_OUT_300MS, style({ left: '-100%' }))]),
      query(QUERY_ENTER, [animate(EASE_OUT_300MS, style({ left: '0%' }))]),
    ]),
  ]),
  transition('OtherPage => HomePage', [
    ...resetRoute,
    query(QUERY_ENTER, [style({ left: '-100%' })]),
    group([
      query(QUERY_LEAVE, [animate(EASE_OUT_300MS, style({ left: '100%' }))]),
      query(QUERY_ENTER, [animate(EASE_OUT_300MS, style({ left: '0%' }))]),
    ]),
  ]),
]);

/**
 * Animations for "tabbed" routes, eg. the tabs in "Best Practices"
 *
 * Uses values passed into the animation to determine direction.
 * @help https://medium.com/frontend-coach/angular-router-animations-what-they-dont-tell-you-3d2737a7f20b
 */
export const subRouteAnimation = trigger('subRouteAnimations', [
  transition('* <=> *', [
    ...resetSubRoute,
    query(QUERY_ENTER, [style({ left: '{{offsetEnter}}%' })], options),
    query(QUERY_LEAVE, animateChild(), options),
    group([
      query(
        QUERY_LEAVE,
        [animate(EASE_OUT_300MS, style({ left: '{{offsetLeave}}%' }))],
        options
      ),
      query(
        QUERY_ENTER,
        [animate(EASE_OUT_300MS, style({ left: '0%' }))],
        options
      ),
    ]),
    query(QUERY_ENTER, animateChild(), options),
  ]),
]);

export const topNavAnimation = trigger('topNavAnimation', [
  transition(QUERY_ENTER, [
    style({ opacity: 0 }),
    animate(EASE_OUT_500MS, style({ opacity: 1 })),
  ]),
  transition(QUERY_LEAVE, [
    style({ opacity: 1 }),
    animate(EASE_OUT_500MS, style({ opacity: 0 })),
  ]),
]);
