// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

import {
  animate,
  query,
  sequence,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

const cameraControlsWidthExpandedPx = 315;
const cameraControlsWidthCollapsedPx = 155;
const cameraControlsWidthExpanded = {
  width: `${cameraControlsWidthExpandedPx}px`,
  left: `calc((100% - ${cameraControlsWidthExpandedPx}px) / 2)`,
};
const cameraControlsWidthCollapsed = {
  width: `${cameraControlsWidthCollapsedPx}px`,
  left: `calc((100% - ${cameraControlsWidthCollapsedPx}px) / 2)`,
};
const bottomShelfTransitionMS = '300ms ease-in-out';
const bottomShelfFadeMS = '400ms ease-in-out';

const bottomShelfVisible = {
  transform: 'translateY(0)',
};
const bottomShelfInvisible = {
  transform: 'translateY(100%)',
};

const ANIMATION_QUERY_PAN_TILT_ZOOM = '.animation-pan-tilt-zoom';
// .bottom-shelf animations:
// 1. an expanded (with PTZ controls) and collapsed state (without PTZ controls)
//    note, this animation may not be visible based on whether .bottom-shelf is visible
// 2. a slide in on hover of the camera image
export const cameraControlsAnimation = [
  trigger('bottomShelfAnimation', [
    state('expanded', style(cameraControlsWidthExpanded)),
    state('collapsed', style(cameraControlsWidthCollapsed)),
    transition('collapsed => expanded', [
      sequence([
        query(ANIMATION_QUERY_PAN_TILT_ZOOM, [style({ opacity: 0 })]),
        animate(bottomShelfTransitionMS, style(cameraControlsWidthExpanded)),
        query(ANIMATION_QUERY_PAN_TILT_ZOOM, [
          animate(bottomShelfFadeMS, style({ opacity: 1 })),
        ]),
      ]),
    ]),
    transition('expanded => collapsed', [
      sequence([
        query(ANIMATION_QUERY_PAN_TILT_ZOOM, [style({ opacity: 1 })]),
        query(ANIMATION_QUERY_PAN_TILT_ZOOM, [
          animate(bottomShelfFadeMS, style({ opacity: 0 })),
        ]),
        animate(bottomShelfTransitionMS, style(cameraControlsWidthCollapsed)),
      ]),
    ]),
  ]),
  trigger('bottomShelfVisibleAnimation', [
    state('visible', style(bottomShelfVisible)),
    state('invisible', style(bottomShelfInvisible)),
    transition('* => *', [animate(bottomShelfFadeMS)]),
  ]),
];
