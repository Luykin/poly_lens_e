export const DEFAULT_LANGUAGE = 'en';
export const EULA_AGREED_KEY = 'EULA_AGREED';
export const EULA_URL =
  'https://support.hp.com/us-en/document/ish_4416646-4390016-16';
export const EULA_VIDEO_DEVICES_URL =
  'https://support.polycom.com/content/support/polycom-agreements.html';
export const PRIVACY_POLICY_URL =
  'https://www.hp.com/us-en/privacy/privacy.html?jumpid=in_R11928_/us/en/corp/privacy-central/privacy-statements';
export const TERMS_OF_SERVICE = 'https://www.hp.com/us-en/poly.html';
export const FEEDBACK_FORM_URL = 'https://lens.poly.com/appfeedback';

/* Contact Support */
export const CONTACT_SUPPORT_URL =
  'https://support.hp.com/contact/product/poly-lens-desktop-and-web-app/2101801767/model/2101801770?source=polydropdown';
export const COMMUNITY_URL = 'https://h30434.www3.hp.com/';
export const DOCUMENTATION_URL =
  'https://documents.polycom.com/bundle/poly-lens-da/page/getting-started.html';
export const SUPPORT_EMAIL = 'poly.com/contactsupport';
export const contactSupportType = {
  APP: 'app',
  DEVICE: 'device',
} as const;

/* App State */
export const APP_INIT_STATE_TOKEN = 'APP_INIT_STATE';

/* Route related: */
export const ROUTE_HOME = 'home';

export const COLOR_SUCCESS = '#26870d';
export const COLOR_DANGER = '#e91a42';

/**
 * Modal IDs
 */
export const MODAL_ID_RESTORE_DEFAULTS_CONFIRM = 'restoreDefaultsConfirm';
export const MODAL_ID_RESTORE_DEFAULTS_COMPLETE = 'restoreDefaultsComplete';
export const MODAL_ID_DFU_CONFIRM = 'dfuConfirm';
export const MODAL_ID_LCS_CONNECTION = 'lcsConnection';
export const MODAL_ID_SETTING_INFO = 'settingInfo';

/**
 * Modal Close Types
 */
export const MODAL_CLOSE_TYPE = {
  CONFIRM: 'confirm',
  CANCEL: 'cancel',
} as const;

/* Time constants: */
export const MS_IN_SECOND = 1000;
export const MS_IN_MINUTE = 60 * MS_IN_SECOND;
export const MS_IN_HOUR = 60 * MS_IN_MINUTE;
export const MS_IN_DAY = 24 * MS_IN_HOUR;

/* Device Setting Related */
export const DEVICE_SETTING_ID_FIRMWARE_VERSION = 'Firmware Version';
export const DEVICE_SETTING_ID_SINGULAR_BATTERY_INFO = 'Singular Battery Info';
export const DEVICE_SETTING_ID_DEVICE_IMAGE = 'Device Image';
//for osprey device
export const DEVICE_SETTING_ID_LEFT_BATTERY_INFO = 'Left Earbud Battery Info';
export const DEVICE_SETTING_ID_RIGHT_BATTERY_INFO = 'Right Earbud Battery Info';
export const DEVICE_SETTING_ID_LEFT_DEVICE_IMAGE = 'Left Earbud Image';
export const DEVICE_SETTING_ID_RIGHT_DEVICE_IMAGE = 'Right Earbud Image';

/**
 * Automation Test Id Types
 */
export const ELEMENT_ID_TYPE = {
  TITLE: 'title',
  TEXT: 'text',
  CONTAINER: 'container',
  HEADING: 'heading',
  LINK: 'link',
} as const;

/**
 * Device Settings: Global Device Settings IDs
 */
export const DEVICE_SETTING_ID_RESTORE_DEFAULTS = 'Factory Reset';
export const DEVICE_SETTING_ID_ANSWER_IGNORE = 'Answer/Ignore';
export const DEVICE_SETTING_ID_ANSWERING_CALL_ALERT = 'Answering Call Alert';
export const DEVICE_SETTING_ID_AUDIO_CHANNEL_TONE = 'Audio Channel Tone';
export const DEVICE_SETTING_ID_ACTIVE_AUDIO_TONE = 'Active Audio Tone';
export const DEVICE_SETTING_ID_MUTE_REMINDER_TIMING = 'Mute Reminder Time';
export const DEVICE_SETTING_ID_ONLINE_INDICATOR = 'Online Indicator';
export const DEVICE_SETTING_ID_SECOND_INCOMING_CALL = 'Second Incoming Call';
export const DEVICE_SETTING_ID_MUTE_ALERT_TYPES = 'Mute On/Off Alerts';
export const DEVICE_SETTING_ID_NOTIFICATION_TONES = 'Notification Tones';
export const DEVICE_SETTING_ID_INCOMING_CALL_ALERT = 'Answering Call';
export const DEVICE_SETTING_ID_CONNECTION_INDICATION = 'Connection Indication';
export const DEVICE_SETTING_ID_ROCKET_BUTTON_BEHAVIOR = 'Custom Button';
export const DEVICE_SETTING_ID_EQUALIZER = 'Equalizer';
export const DEVICE_SETTING_ID_SIDETONE = 'Sidetone';
export const DEVICE_SETTING_ID_VOLUME_LEVEL_TONES = 'Volume Level Tones';
export const DEVICE_SETTING_ID_TRANSPARENCY_MODE = 'Transparency Mode';
export const DEVICE_SETTING_ID_CUSTOM_SLIDER_IDLE = 'Custom Swipe Sensor Idle';
export const DEVICE_SETTING_ID_CUSTOM_SLIDER_CALL =
  'Custom Swipe Sensor In Call';
export const DEVICE_SETTING_ID_CUSTOM_SLIDER_MEDIA =
  'Custom Swipe Sensor Streaming Media';
export const DEVICE_SETTING_ID_RINGTONE = 'Ringtone';
export const DEVICE_SETTING_ID_VOLUME_MIN_MAX_ALERTS = 'Volume Min/Max Alerts';
export const DEVICE_SETTING_ID_WEARING_SENSOR_MASTER = 'Wearing Sensor';
export const DEVICE_SETTING_ID_ACTIVE_CALL_AUDIO = 'Active Call Audio';
export const DEVICE_SETTING_ID_AUTO_ANSWER = 'Auto-Answer';
export const DEVICE_SETTING_ID_AUTO_ANSWER_NO_SENSOR =
  'Auto-Answer (No Sensor)';
export const DEVICE_SETTING_ID_AUTO_PAUSE_MUSIC = 'Auto-Pause Music';
export const DEVICE_SETTING_ID_HD_VOICE = 'HD Voice';
export const DEVICE_SETTING_ID_NOISE_EXPOSURE = 'Noise Exposure';
export const DEVICE_SETTING_ID_HOURS_ON_PHONE_PER_DAY =
  'Hours on Phone Per Day';
export const DEVICE_SETTING_ID_CLEAR_TRUSTED_DEVICES = 'Clear Trusted Devices';
export const DEVICE_SETTING_ID_MANAGE_ALL = 'Manage All';
export const DEVICE_SETTING_ID_INCOMING_CALL = 'Incoming Call';

//here are auto generated settings, needs revision in constant values
export const DEVICE_SETTING_ID_MUTE_ALERTS_ENABLED = 'Mute Alerts Enabled';
export const DEVICE_SETTING_ID_PAIRING_MODE = 'Pairing Mode';
export const DEVICE_SETTING_ID_RESTART_DEVICE = 'Restart Device';
export const DEVICE_SETTING_ID_AUDIO_SENSING = 'Audio Sensing';
export const DEVICE_SETTING_ID_CLOSE_CONVERSATION_LIMITING =
  'Close Conversation Limiting';
export const DEVICE_SETTING_ID_CALLED_ID = 'Called Id';
export const DEVICE_SETTING_ID_MUTE_OFF_ALERT = 'Mute Off Alert';
export const DEVICE_SETTING_ID_MUTE_REMINDER_MODE = 'Mute Reminder';
export const DEVICE_SETTING_ID_DEFAULT_PHONE_LINE = 'Default Phone Line';
export const DEVICE_SETTING_ID_SELECT_HEADSET_TYPE = 'Select Headset Type';
export const DEVICE_SETTING_ID_TONE_CONTROL = 'Tone Control';
export const DEVICE_SETTING_ID_MUTE_ALERTS = 'Mute Alerts';
export const DEVICE_SETTING_ID_HOLD_REMINDER = 'Hold Reminder';
export const DEVICE_SETTING_ID_DAISY_CHAIN_AUDIO = 'Daisy Chain Audio';
export const DEVICE_SETTING_ID_BATTERY_LEVEL_PROMPT = 'Battery Level Prompt';
export const DEVICE_SETTING_ID_MUTE_REMINDER_MODE_FOR_SPEAKER_PHONES =
  'Mute Reminder Mode For Speaker Phones';
export const DEVICE_SETTING_ID_SPEAKER_TRACKING = 'Speaker Tracking';
export const DEVICE_SETTING_ID_SPEAKER_TRACKING_MODE = 'Speaker Tracking Mode';
export const DEVICE_SETTING_ID_BLUETOOTH_PERMISSIONS = 'Bluetooth Permissions';
export const DEVICE_SETTING_ID_DESKPHONE_TONE = 'Deskphone Tone';
export const DEVICE_SETTING_ID_DESKPHONE_VOLUME = 'Deskphone Volume';
export const DEVICE_SETTING_ID_MOBILE_PHONE = 'Mobile Phone';
export const DEVICE_SETTING_ID_MOBILE_PHONE_VOLUME = 'Mobile Phone Volume';
export const DEVICE_SETTING_ID_PC = 'Pc';
export const DEVICE_SETTING_ID_PC_VOLUME = 'Pc Volume';
export const DEVICE_SETTING_ID_CHARGE_CONFIRMATION = 'Charge Confirmation';
export const DEVICE_SETTING_ID_VIBRATE_ON_RING = 'Vibrate On Ring';
export const DEVICE_SETTING_ID_INDEPENDENT_VOLUME_CONTROL =
  'Independent Volume Control';
export const DEVICE_SETTING_ID_ANC_TIMEOUT = 'Anc Timeout';
export const DEVICE_SETTING_ID_MUTE_REMINDER_VOLUME = 'Mute Reminder Volume';
export const DEVICE_SETTING_ID_SYSTEM_TONE = 'System Tone';
export const DEVICE_SETTING_ID_WEARING_PREFERENCE_FOR_VOLUME_CONTROL =
  'Wearing Preference For Volume Control';
export const DEVICE_SETTING_ID_AUDIO_BASS = 'Audio Bass';
export const DEVICE_SETTING_ID_AUDIO_TREBLE = 'Audio Treble';
export const DEVICE_SETTING_ID_CALL_BUTTON_LOCK = 'Call Button Lock';
export const DEVICE_SETTING_ID_SMART_AUDIO_TRANSFER = 'Smart Audio Transfer';
export const DEVICE_SETTING_ID_AUTO_MUTE = 'Auto Mute';
export const DEVICE_SETTING_ID_DIAL_TONE = 'Dial Tone';
export const DEVICE_SETTING_ID_AUDIO_QUALITY = 'Audio Quality';
export const DEVICE_SETTING_ID_EXTENDED_RANGE_MODE = 'Extended Range Mode (PC)';
export const DEVICE_SETTING_ID_AUTO_CONNECT_TO_MOBILE_PHONE =
  'Auto Connect To Mobile Phone';
export const DEVICE_SETTING_ID_AUTO_CONNECT_TO_MOBILE_PHONE_2 =
  'Auto Connect To Mobile Phone 2';
export const DEVICE_SETTING_ID_BLUETOOTH = 'Bluetooth';
export const DEVICE_SETTING_ID_BLUETOOTH_2 = 'Bluetooth 2';
export const DEVICE_SETTING_ID_DESKPHONE_AUDIO_BANDWIDTH =
  'Deskphone Audio Bandwidth';
export const DEVICE_SETTING_ID_PC_AUDIO_BANDWIDTH = 'Pc Audio Bandwidth';
export const DEVICE_SETTING_ID_MOBILE_VOICE_COMMANDS = 'Mobile Voice Commands';
export const DEVICE_SETTING_ID_OVER_THE_AIR_SUBSCRIPTION =
  'Over The Air Subscription';
export const DEVICE_SETTING_ID_RANGE = 'Range';
export const DEVICE_SETTING_ID_STREAMING_AUDIO = 'Streaming Audio';
export const DEVICE_SETTING_ID_CLEAR_TRUSTED_DEVICE_LIST =
  'Clear Trusted Device List';
export const DEVICE_SETTING_ID_SECURE_BLUETOOTH = 'Secure Bluetooth';
export const DEVICE_SETTING_ID_ANTI_STARTLE = 'Anti-Startle';
export const DEVICE_SETTING_ID_ANTI_STARTLE_2 = 'Anti Startle 2';
export const DEVICE_SETTING_ID_ANC_MODE = 'ANC Mode';
export const DEVICE_SETTING_ID_BISTO = 'Bisto';
export const DEVICE_SETTING_ID_PC_AUDIO_PERSISTENCE_MODE =
  'Pc Audio Persistence Mode';
export const DEVICE_SETTING_ID_CALLS_ANNOUNCEMENT = 'Calls';
export const DEVICE_SETTING_ID_ANSWERING_CALL = 'Answering Call';
export const DEVICE_SETTING_ID_ANSWER_IGNORE_2 = 'Answer Ignore 2';
export const DEVICE_SETTING_ID_CONNECTION = 'Connection Indication';
export const DEVICE_SETTING_ID_LANGUAGE_SELECTION = 'Language Selection';

/**
 * Device Settings: Categories
 */
export const DEVICE_SETTINGS_CATEGORY_LANGUAGE = 'Language';
export const DEVICE_SETTINGS_CATEGORY_ADMIN = 'Admin';
export const DEVICE_SETTINGS_CATEGORY_RESET_DEVICE = 'Reset Device';
export const DEVICE_SETTINGS_CATEGORY_GENERAL = 'General';
export const DEVICE_SETTINGS_CATEGORY_LIGHTS = 'Lights';
export const DEVICE_SETTINGS_CATEGORY_RINGTONE_AND_VOLUME =
  'Ringtones & Volume';
export const DEVICE_SETTINGS_CATEGORY_AUDIO = 'Audio';
export const DEVICE_SETTINGS_CATEGORY_SENSOR_AND_PRESENCE =
  'Sensors & Presence';
export const DEVICE_SETTINGS_CATEGORY_SOFTPHONES_AND_MEDIA_PLAYERS =
  'Softphones And Media Players';
export const DEVICE_SETTINGS_CATEGORY_WIRELESS = 'Wireless';
export const DEVICE_SETTINGS_CATEGORY_ADVANCED = 'Advanced';
export const DEVICE_SETTINGS_CATEGORY_ANC = 'ANC';
export const DEVICE_SETTINGS_CATEGORY_CUSTOM_BUTTON = 'Custom Button';
export const DEVICE_SETTINGS_CATEGORY_CUSTOM_SWIPE = 'Custom Swipe';
export const DEVICE_SETTINGS_CATEGORY_DIAGNOSTICS = 'Diagnostics';
export const DEVICE_SETTINGS_CATEGORY_SOFTWARE_SETTINGS = 'Software Settings';
export const DEVICE_SETTINGS_CATEGORY_VOICE_PROMPTS_AND_TONES =
  'Voice Prompts & Tones';

// this object is organized with an uppercase key, which assists
// with logic in controls.component.ts for specific settings
// if changing to lowercase, please review all uses of SETTINGS,
// CONTROLS_PAGE_SUPPORTED_SETTINGS and CONTROLS_PAGE_HIDDEN_SETTINGS

// SETTINGS enum tracks settings used on the control and settings pages.
// **IMPORTANT** Do **NOT** comment items in the SETTINGS enum out:
// Unsupported SETTINGS on the controls page are indicated so by not including
// in CONTROLS_PAGE_SUPPORTED_SETTINGS.
export enum SETTINGS {
  // CAUTION: this is the wrong hex code for P21 audio endpoint, do not enable until resolved
  // "AUDIO_ENDPOINT" = "0xC8C",
  'ACOUSTIC_FENCE' = '0xC15',
  'ANTI_FLICKER' = '0xC23',
  'RESOLUTION' = '0xC25',
  'ANTI_STARTLE' = '0x0504',
  'ANTI_STARTLE_ENHANCED' = '0xFFF2',
  'BASS_ADJUST' = '0xC21',
  'BASS_BOOST' = '0xC26',
  'BACK_LIGHT_COMP' = '0xC08',
  'BRIGHTNESS' = '0xC00',
  'CAMERA_MOVEMENT' = '0xC1C',
  'COLOR' = '0xC06',
  'COLOR_TEMPERATURE' = '0xC28',
  'CONTRAST' = '0xC01',
  'DISPLAY_SCREEN_BRIGHTNESS' = '0xC80',
  'DISPLAY_SCREEN_CONTRAST' = '0xC81',
  'EXPOSURE' = '0xC0E',
  'FOCUS' = '0xC10',
  'FRAME_SIZE' = '0xC1A',
  'G616_ANTI_STARTLE' = '0x0505',
  'GAIN' = '0xC09',
  'GAMMA' = '0xC05',
  'ROCKET_BUTTON' = '0xC8E',
  'HDR' = '0xC29',
  'HUE' = '0xC02',
  'IRIS' = '0xC0F',
  'INVERT' = '0xC27',
  'MAXIMUM_ZOOM' = '0xC1B',
  'NOISEBLOCK_TX' = '0xC16',
  'NOISEBLOCK_RX' = '0xC24',
  'ON_SCREEN_DISPLAY' = '0xC14',
  'PAN' = '0xC0A',
  'PARTICIPANT_COUNT' = '0xC13',
  'APP_BUTTON' = '0xC8D',
  'SATURATION' = '0xC03',
  'SHARPNESS' = '0xC04',
  'STATUS_LED_BRIGHTNESS' = '0xC82',
  'STATUS_LED_IDLE_STATE' = '0xC84',
  'STATUS_LED_INCOMING_CALL' = '0xC85',
  'STATUS_LED_ACTIVE_CALL' = '0xC86',
  'STATUS_LED_HELD_CALL' = '0xC87',
  'STATUS_LED_QI_CHARGING' = '0xC89',
  'STEREO_AUDIO' = '0xC17',
  'TILT' = '0xC0B',
  'TRACKING_MODE' = '0xC19',
  'TRACKING_SPEED' = '0xC18',
  'TREBLE_ADJUST' = '0xC22',
  'VANITY_LED_LEFT' = '0xC8F',
  'VANITY_LED_RIGHT' = '0xC83',
  'VANITY_LED_MANUAL' = '0xC8B', // allows independent vanity control
  'AMBIENT_LIGHT_SENSOR' = '0xC8A', // automatic adjustment based on ambient conditions
  'WHITE_BALANCE' = '0xC07',
  'ZOOM' = '0xC0D',
  'DISPLAY_BRIGHTNESS' = '0x0C90',
  'DISPLAY_CONTRAST' = '0x0C81',
  'BASE_RINGER_VOLUME' = '0x010A',
  'WIDE_DYNAMIC_RANGE' = '0x0C12',
}

// This array defines the settings and their order on the controls page
export const CONTROLS_PAGE_SUPPORTED_SETTINGS: Array<string> = [
  SETTINGS.COLOR_TEMPERATURE,
  SETTINGS.BRIGHTNESS,
  SETTINGS.CONTRAST,
  SETTINGS.HUE,
  SETTINGS.SATURATION,
  SETTINGS.SHARPNESS,
  SETTINGS.GAMMA,
  SETTINGS.WHITE_BALANCE,
  SETTINGS.COLOR,
  SETTINGS.INVERT,
  SETTINGS.BACK_LIGHT_COMP,
  SETTINGS.GAIN,
  SETTINGS.FOCUS,
  SETTINGS.EXPOSURE,
  SETTINGS.WIDE_DYNAMIC_RANGE,
  SETTINGS.IRIS,
  SETTINGS.TRACKING_MODE,
  SETTINGS.MAXIMUM_ZOOM,
  SETTINGS.CAMERA_MOVEMENT,
  SETTINGS.TRACKING_SPEED,
  SETTINGS.FRAME_SIZE,
  SETTINGS.HDR,
  SETTINGS.RESOLUTION,

  // these are supported, but hidden due to camera PTZ controls, so placed at end
  SETTINGS.PAN,
  SETTINGS.TILT,
  SETTINGS.ZOOM,
  SETTINGS.VANITY_LED_LEFT,
  SETTINGS.VANITY_LED_RIGHT,
  SETTINGS.VANITY_LED_MANUAL,
  SETTINGS.AMBIENT_LIGHT_SENSOR,
];

// supported settings, but settings that should not display in UI,
// typically because controls are already implemented in a different way
export const CONTROLS_PAGE_HIDDEN_SETTINGS: Array<string> = [
  SETTINGS.PAN,
  SETTINGS.TILT,
  SETTINGS.ZOOM,
  SETTINGS.VANITY_LED_LEFT,
  SETTINGS.VANITY_LED_RIGHT,
  SETTINGS.VANITY_LED_MANUAL,
  SETTINGS.AMBIENT_LIGHT_SENSOR,
];

export const LANGUAGES = [
  'en',
  'en-GB',
  'fr',
  'fr-ca',
  'ja',
  'da', // Danish
  'de', // German
  'fi', // Finnish
  'it', // Italian
  'nl', // Dutch
  'pl', // Polish
  'zh-cn',
  'zh-tw',
];

// Looking for language name mapping? See the en.json LANGUAGES key
export const EXPERIMENTAL_LANGUAGES = [
  'es-xl', // Spanish used in Latin America
  'es-es',
  // "hu",
  'in',
  'ko',
  'pt-pt',
  'pt-br',
  'nb',
  'sv',
  'ru-ru',
  'th',
];
