// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

export const getIcon = (iconName: string) => {
  /* eslint-disable @typescript-eslint/no-var-requires */
  return require(`!raw-loader!../../../../assets/icons/${iconName}`).default;
};

export const icons = {
  moon: getIcon('moon.svg'),
  sun: getIcon('sun.svg'),
  link: getIcon('link.svg'),
  unlink: getIcon('unlink.svg'),
  prop: getIcon('prop.svg'),
  poly: getIcon('poly.svg'),
  LENS: getIcon('LENS.svg'),
  add: getIcon('add.svg'),
  circle: getIcon('circle.svg'),
  circle_o: getIcon('circle_o.svg'),
  question_help_circle: getIcon('question_help_circle.svg'),
  poly_logo_lens: getIcon('poly_logo_lens.svg'),
  poly_plus: getIcon('poly_plus.svg'),
  settings: getIcon('settings.svg'),
  home: getIcon('home.svg'),
  chart: getIcon('chart.svg'),
  health: getIcon('health.svg'),
  play_on_screen: getIcon('play_on_screen.svg'),
  support: getIcon('support.svg'),
  unboxing_cable_config: getIcon('unboxing_cable_config.svg'),
  health_wellness: getIcon('health_wellness.svg'),
  best_practices: getIcon('best_practices.svg'),
  device_capabilities: getIcon('device_capabilities.svg'),
  headband_adjustment: getIcon('headband_adjustment.svg'),
  boom_placement: getIcon('boom_placement.svg'),
  boom_shape: getIcon('boom_shape.svg'),
  timer_icon: getIcon('timer_icon.svg'),
  ergo_positioning: getIcon('ergo_positioning.svg'),
  ergo_forearms: getIcon('ergo_forearms.svg'),
  ergo_seated_position: getIcon('ergo_seated_position.svg'),
  voyager_focus: getIcon('voyager_focus.svg'),
  wellness_hydration: getIcon('wellness_hydration.svg'),
  back_arrow: getIcon('back_arrow.svg'),
  soundscaping: getIcon('soundscaping.svg'),
  vision_look_away: getIcon('vision_look_away.svg'),
  vision_stand_up_move: getIcon('vision_stand_up_move.svg'),
  camera_mounting: getIcon('camera_mounting.svg'),
  camera_centering: getIcon('camera_centering.svg'),
  desk_setup_desk: getIcon('desk_setup_desk.svg'),
  desk_setup_keyboard: getIcon('desk_setup_keyboard.svg'),
  camera_lighting: getIcon('camera_lighting.svg'),
  camera_background: getIcon('camera_background.svg'),
  desk_setup_chair: getIcon('desk_setup_chair.svg'),
  desk_setup_feet: getIcon('desk_setup_feet.svg'),
  desk_setup_monitor: getIcon('desk_setup_monitor.svg'),
  noiseblockai_intro: getIcon('noiseblockai_intro.svg'),
  offline: getIcon('offline.svg'),
  left_arrow: getIcon('left_arrow.svg'),
  bluetooth: getIcon('bluetooth.svg'),
  power_switch: getIcon('power_switch.svg'),
  laptop_alert: getIcon('laptop_alert.svg'),
  support_circle: getIcon('support_circle.svg'),
  moon_astronaut: getIcon('moon_astronaut.svg'),
  rocket: getIcon('rocket.svg'),
  book: getIcon('book.svg'),
  info: getIcon('info.svg'),
  info_2: getIcon('info_2.svg'),
  life_raft: getIcon('life_raft.svg'),
  cactus: getIcon('cactus.svg'),
  earth: getIcon('earth.svg'),
  phone: getIcon('phone.svg'),
  check_badge: getIcon('check_badge.svg'),
  check: getIcon('check.svg'),
  circle_check: getIcon('circle_check.svg'),
  circle_times: getIcon('circle_times.svg'),
  times: getIcon('times.svg'),
  cta: getIcon('cta.svg'),
  search: getIcon('search.svg'),
  star_empty: getIcon('star_empty.svg'),
  star_filled: getIcon('star_filled.svg'),
  contact_support: getIcon('contact_support.svg'),
  poly_lens: getIcon('poly_lens.svg'),
  prop_poly: getIcon('prop_poly.svg'),
  camera_eye: getIcon('camera_eye.svg'),
  camera_eye_slash: getIcon('camera_eye_slash.svg'),
  camera_snapshot: getIcon('camera_snapshot.svg'),
  camera_grid: getIcon('camera_grid.svg'),
  camera_contract: getIcon('camera_contract.svg'),
  camera_expand: getIcon('camera_expand.svg'),
  pan_left: getIcon('pan_left.svg'),
  pan_right: getIcon('pan_right.svg'),
  tilt_up: getIcon('tilt_up.svg'),
  tilt_down: getIcon('tilt_down.svg'),
  zoom_in: getIcon('zoom_in.svg'),
  zoom_out: getIcon('zoom_out.svg'),
  loading: getIcon('loading.svg'),
  progress_loading: getIcon('progress_loading.svg'),
  buttonSpinner: getIcon('buttonSpinner.svg'),
  video_no_signal: getIcon('video_no_signal.svg'),
  video_off: getIcon('video_off.svg'),
  warning_triangle: getIcon('warning_triangle.svg'),
  battery_flat: getIcon('battery/battery_flat.svg'),
  battery_flat_charging: getIcon('battery/battery_flat_charging.svg'),
  battery_critical: getIcon('battery/battery_critical.svg'),
  battery_critical_charging: getIcon('battery/battery_critical_charging.svg'),
  battery_low: getIcon('battery/battery_low.svg'),
  battery_low_charging: getIcon('battery/battery_low_charging.svg'),
  battery_medium: getIcon('battery/battery_medium.svg'),
  battery_medium_charging: getIcon('battery/battery_medium_charging.svg'),
  battery_high: getIcon('battery/battery_high.svg'),
  battery_high_charging: getIcon('battery/battery_high_charging.svg'),
  battery_full: getIcon('battery/battery_full.svg'),
  battery_full_charging: getIcon('battery/battery_full_charging.svg'),
  wifi_weak: getIcon('wifi/wifi_weak.svg'),
  wifi_medium: getIcon('wifi/wifi_medium.svg'),
  wifi_strong: getIcon('wifi/wifi_strong.svg'),
  wifi_disconnected: getIcon('wifi/wifi_disconnected.svg'),
  close: getIcon('close.svg'),
  copy: getIcon('copy.svg'),
  close_circle: getIcon('close_circle.svg'),
  device_detected: getIcon('device_detected.svg'),
  device_success: getIcon('device_success.svg'),
  arrow_right: getIcon('arrow_right.svg'),
  step_success: getIcon('step-success.svg'),
  step_skipped: getIcon('step-skipped.svg'),
  wrench: getIcon('wrench.svg'),
  yellow_triangle: getIcon('yellow_triangle.svg'),
  lock: getIcon('lock.svg'),
  toast_success: getIcon('toast-success.svg'),
  toast_error: getIcon('toast-error.svg'),
  toast_close: getIcon('toast-close.svg'),
  toast_info: getIcon('toast-info.svg'),
  up_arrow_white: getIcon('up-arrow-white.svg'),
  down_arrow_white: getIcon('down-arrow-white.svg'),
  toast_warning_triangle: getIcon('toast_warning_triangle.svg'),
  beta: getIcon('beta.svg'),
  preview: getIcon('preview.svg'),
  do_not_enter: getIcon('do_not_enter.svg'),
  message_bubble: getIcon('message_bubble.svg'),
  megaphone: getIcon('megaphone.svg'),
  play_circle: getIcon('play_circle.svg'),
  hp_poly_logo: getIcon('hp_poly_logo.svg'),
  hp_welcome_card: getIcon('hp_welcome_card.svg'),
  dfu_up_to_date: getIcon('dfu_up_to_date.svg'),
  dfu_available: getIcon('warning.svg'),
};