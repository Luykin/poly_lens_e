import {
  DEVICE_SETTING_ID_RESTORE_DEFAULTS,
  SETTINGS,
  DEVICE_SETTING_ID_RESTART_DEVICE,
  DEVICE_SETTING_ID_ANSWER_IGNORE,
  DEVICE_SETTING_ID_ANSWERING_CALL_ALERT,
  DEVICE_SETTING_ID_ANSWERING_CALL,
  DEVICE_SETTING_ID_AUDIO_CHANNEL_TONE,
  DEVICE_SETTING_ID_ACTIVE_AUDIO_TONE,
  DEVICE_SETTING_ID_AUDIO_SENSING,
  DEVICE_SETTING_ID_CLOSE_CONVERSATION_LIMITING,
  DEVICE_SETTING_ID_CALLED_ID,
  DEVICE_SETTING_ID_MUTE_OFF_ALERT,
  DEVICE_SETTING_ID_MUTE_REMINDER_MODE,
  DEVICE_SETTING_ID_MUTE_REMINDER_TIMING,
  DEVICE_SETTING_ID_ONLINE_INDICATOR,
  DEVICE_SETTING_ID_AUTO_ANSWER_NO_SENSOR,
  DEVICE_SETTING_ID_DEFAULT_PHONE_LINE,
  DEVICE_SETTING_ID_SECOND_INCOMING_CALL,
  DEVICE_SETTING_ID_SELECT_HEADSET_TYPE,
  DEVICE_SETTING_ID_TONE_CONTROL,
  DEVICE_SETTING_ID_MUTE_ALERTS,
  DEVICE_SETTING_ID_MUTE_ALERT_TYPES,
  DEVICE_SETTING_ID_NOTIFICATION_TONES,
  // DEVICE_SETTING_ID_INCOMMING_CALL_ALERT,
  DEVICE_SETTING_ID_HOLD_REMINDER,
  DEVICE_SETTING_ID_CONNECTION_INDICATION,
  DEVICE_SETTING_ID_ROCKET_BUTTON_BEHAVIOR,
  DEVICE_SETTING_ID_DAISY_CHAIN_AUDIO,
  DEVICE_SETTING_ID_BATTERY_LEVEL_PROMPT,
  DEVICE_SETTING_ID_MUTE_REMINDER_MODE_FOR_SPEAKER_PHONES,
  DEVICE_SETTING_ID_SPEAKER_TRACKING,
  DEVICE_SETTING_ID_SPEAKER_TRACKING_MODE,
  DEVICE_SETTING_ID_BLUETOOTH_PERMISSIONS,
  DEVICE_SETTING_ID_EQUALIZER,
  DEVICE_SETTING_ID_DESKPHONE_TONE,
  DEVICE_SETTING_ID_DESKPHONE_VOLUME,
  DEVICE_SETTING_ID_MOBILE_PHONE,
  DEVICE_SETTING_ID_MOBILE_PHONE_VOLUME,
  DEVICE_SETTING_ID_PC,
  DEVICE_SETTING_ID_PC_VOLUME,
  DEVICE_SETTING_ID_CHARGE_CONFIRMATION,
  DEVICE_SETTING_ID_SIDETONE,
  DEVICE_SETTING_ID_VIBRATE_ON_RING,
  DEVICE_SETTING_ID_VOLUME_LEVEL_TONES,
  DEVICE_SETTING_ID_INDEPENDENT_VOLUME_CONTROL,
  DEVICE_SETTING_ID_ANC_TIMEOUT,
  DEVICE_SETTING_ID_MUTE_REMINDER_VOLUME,
  DEVICE_SETTING_ID_SYSTEM_TONE,
  DEVICE_SETTING_ID_WEARING_PREFERENCE_FOR_VOLUME_CONTROL,
  DEVICE_SETTING_ID_RINGTONE,
  DEVICE_SETTING_ID_VOLUME_MIN_MAX_ALERTS,
  DEVICE_SETTING_ID_AUDIO_BASS,
  DEVICE_SETTING_ID_AUDIO_TREBLE,
  DEVICE_SETTING_ID_WEARING_SENSOR_MASTER,
  DEVICE_SETTING_ID_ACTIVE_CALL_AUDIO,
  DEVICE_SETTING_ID_AUTO_ANSWER,
  DEVICE_SETTING_ID_AUTO_PAUSE_MUSIC,
  DEVICE_SETTING_ID_CALL_BUTTON_LOCK,
  DEVICE_SETTING_ID_SMART_AUDIO_TRANSFER,
  DEVICE_SETTING_ID_AUTO_MUTE,
  DEVICE_SETTING_ID_DIAL_TONE,
  DEVICE_SETTING_ID_AUDIO_QUALITY,
  DEVICE_SETTING_ID_EXTENDED_RANGE_MODE,
  DEVICE_SETTING_ID_HD_VOICE,
  DEVICE_SETTING_ID_AUTO_CONNECT_TO_MOBILE_PHONE,
  DEVICE_SETTING_ID_AUTO_CONNECT_TO_MOBILE_PHONE_2,
  DEVICE_SETTING_ID_BLUETOOTH,
  DEVICE_SETTING_ID_BLUETOOTH_2,
  DEVICE_SETTING_ID_DESKPHONE_AUDIO_BANDWIDTH,
  DEVICE_SETTING_ID_PC_AUDIO_BANDWIDTH,
  DEVICE_SETTING_ID_MOBILE_VOICE_COMMANDS,
  DEVICE_SETTING_ID_OVER_THE_AIR_SUBSCRIPTION,
  DEVICE_SETTING_ID_RANGE,
  DEVICE_SETTING_ID_STREAMING_AUDIO,
  DEVICE_SETTING_ID_CLEAR_TRUSTED_DEVICE_LIST,
  DEVICE_SETTING_ID_SECURE_BLUETOOTH,
  DEVICE_SETTING_ID_ANTI_STARTLE,
  DEVICE_SETTING_ID_ANTI_STARTLE_2,
  DEVICE_SETTING_ID_NOISE_EXPOSURE,
  DEVICE_SETTING_ID_HOURS_ON_PHONE_PER_DAY,
  DEVICE_SETTING_ID_BISTO,
  DEVICE_SETTING_ID_CLEAR_TRUSTED_DEVICES,
  DEVICE_SETTINGS_CATEGORY_RESET_DEVICE,
  DEVICE_SETTINGS_CATEGORY_GENERAL,
  DEVICE_SETTINGS_CATEGORY_LANGUAGE,
  DEVICE_SETTINGS_CATEGORY_LIGHTS,
  DEVICE_SETTINGS_CATEGORY_RINGTONE_AND_VOLUME,
  DEVICE_SETTINGS_CATEGORY_AUDIO,
  DEVICE_SETTINGS_CATEGORY_SENSOR_AND_PRESENCE,
  DEVICE_SETTINGS_CATEGORY_SOFTPHONES_AND_MEDIA_PLAYERS,
  DEVICE_SETTINGS_CATEGORY_WIRELESS,
  DEVICE_SETTINGS_CATEGORY_ADVANCED,
  DEVICE_SETTINGS_CATEGORY_ANC,
  DEVICE_SETTINGS_CATEGORY_CUSTOM_BUTTON,
  DEVICE_SETTINGS_CATEGORY_CUSTOM_SWIPE,
  DEVICE_SETTING_ID_ANC_MODE,
  DEVICE_SETTING_ID_TRANSPARENCY_MODE,
  DEVICE_SETTING_ID_CUSTOM_SLIDER_IDLE,
  DEVICE_SETTING_ID_CUSTOM_SLIDER_CALL,
  DEVICE_SETTING_ID_CUSTOM_SLIDER_MEDIA,
  DEVICE_SETTINGS_CATEGORY_DIAGNOSTICS,
  DEVICE_SETTING_ID_PC_AUDIO_PERSISTENCE_MODE,
  DEVICE_SETTINGS_CATEGORY_VOICE_PROMPTS_AND_TONES,
  DEVICE_SETTING_ID_MANAGE_ALL,
  DEVICE_SETTING_ID_INCOMING_CALL,
  DEVICE_SETTING_ID_CALLS_ANNOUNCEMENT,
  DEVICE_SETTING_ID_LANGUAGE_SELECTION,
} from '../../../utilities/constants';
import { AccordionCategory } from '../../../shared/components/accordion/accordion-settings.model';

export const settingTypes = {
  RADIO: 'radio',
  DROPDOWN: 'dropdown',
  DROPDOWN_W_ICONS: 'dropdown-w-icons',
  BUTTON: 'button',
  SLIDER: 'slider',
  UP_DOWN: 'up-down',
  RESTART_DEVICE: 'restart-device',
  RESTORE_DEFAULTS: 'restore-defaults',
  CLEAR_TRUSTED_DEVICES: 'clear-trusted-devices',
} as const;

/**
 * List of device setting supported by Lens Desktop
 */
export const supportedDeviceSettings: AccordionCategory[] = [
  {
    order: 1,
    category: DEVICE_SETTINGS_CATEGORY_GENERAL,
    settings: [
      {
        order: 1,
        id: SETTINGS.PARTICIPANT_COUNT,
        type: settingTypes.RADIO,
      },
      {
        order: 2,
        id: SETTINGS.APP_BUTTON,
        type: settingTypes.DROPDOWN_W_ICONS,
      },
      {
        order: 3,
        id: SETTINGS.ANTI_FLICKER,
        type: settingTypes.DROPDOWN_W_ICONS,
      },
      {
        order: 4,
        id: DEVICE_SETTING_ID_ANSWERING_CALL_ALERT,
        type: settingTypes.RADIO,
      },
      {
        order: 5,
        id: DEVICE_SETTING_ID_AUDIO_CHANNEL_TONE,
        type: settingTypes.RADIO,
      },
      {
        order: 6,
        id: DEVICE_SETTING_ID_AUDIO_SENSING,
        type: settingTypes.RADIO,
      },
      {
        order: 7,
        id: DEVICE_SETTING_ID_CLOSE_CONVERSATION_LIMITING,
        type: settingTypes.DROPDOWN_W_ICONS,
      },
      {
        order: 8,
        id: DEVICE_SETTING_ID_CALLED_ID,
        type: settingTypes.RADIO,
      },
      {
        order: 9,
        id: DEVICE_SETTING_ID_MUTE_OFF_ALERT,
        type: settingTypes.DROPDOWN_W_ICONS,
      },
      {
        order: 10,
        id: DEVICE_SETTING_ID_MUTE_REMINDER_MODE,
        type: settingTypes.DROPDOWN_W_ICONS,
        subsettings: [
          {
            order: 11,
            id: DEVICE_SETTING_ID_MUTE_REMINDER_TIMING,
            hideDescription: true,
            hideTitle: true,
            type: settingTypes.DROPDOWN,
          },
        ],
      },
      {
        order: 12,
        id: DEVICE_SETTING_ID_ONLINE_INDICATOR,
        type: settingTypes.RADIO,
      },
      {
        order: 13,
        id: DEVICE_SETTING_ID_AUTO_ANSWER_NO_SENSOR,
        type: settingTypes.RADIO,
      },
      {
        order: 14,
        id: DEVICE_SETTING_ID_DEFAULT_PHONE_LINE,
        type: settingTypes.DROPDOWN_W_ICONS,
      },
      {
        order: 15,
        id: DEVICE_SETTING_ID_SECOND_INCOMING_CALL,
        type: settingTypes.DROPDOWN_W_ICONS,
      },
      {
        order: 16,
        id: DEVICE_SETTING_ID_TONE_CONTROL,
        type: settingTypes.DROPDOWN_W_ICONS,
      },
      {
        order: 17,
        id: DEVICE_SETTING_ID_MUTE_ALERTS,
        type: settingTypes.RADIO,
      },
      {
        order: 18,
        id: DEVICE_SETTING_ID_MUTE_ALERT_TYPES,
        type: settingTypes.DROPDOWN_W_ICONS,
      },
      {
        order: 19,
        id: DEVICE_SETTING_ID_NOTIFICATION_TONES,
        type: settingTypes.RADIO,
      },
      // Duplicated name
      // {
      //   order: 21,
      //   id: DEVICE_SETTING_ID_INCOMMING_CALL_ALERT,
      //   type: settingTypes.RADIO,
      // },
      {
        order: 22,
        id: DEVICE_SETTING_ID_DAISY_CHAIN_AUDIO,
        type: settingTypes.DROPDOWN_W_ICONS,
      },
      {
        order: 23,
        id: DEVICE_SETTING_ID_BATTERY_LEVEL_PROMPT,
        type: settingTypes.RADIO,
      },
      {
        order: 24,
        id: DEVICE_SETTING_ID_MUTE_REMINDER_MODE_FOR_SPEAKER_PHONES,
        type: settingTypes.DROPDOWN_W_ICONS,
      },
      {
        order: 25,
        id: DEVICE_SETTING_ID_SPEAKER_TRACKING,
        type: settingTypes.RADIO,
      },
      {
        order: 26,
        id: DEVICE_SETTING_ID_SPEAKER_TRACKING_MODE,
        type: settingTypes.DROPDOWN_W_ICONS,
      },
      {
        order: 27,
        id: DEVICE_SETTING_ID_BLUETOOTH_PERMISSIONS,
        type: settingTypes.RADIO,
      },
      {
        order: 28,
        id: SETTINGS.DISPLAY_BRIGHTNESS,
        type: settingTypes.UP_DOWN,
      },
      {
        order: 29,
        id: SETTINGS.DISPLAY_CONTRAST,
        type: settingTypes.SLIDER,
      },
      {
        order: 30,
        id: DEVICE_SETTING_ID_EQUALIZER,
        type: settingTypes.DROPDOWN_W_ICONS,
      },
      {
        order: 31,
        id: DEVICE_SETTING_ID_PC_AUDIO_PERSISTENCE_MODE,
        type: settingTypes.RADIO,
      },
    ],
  },
  {
    order: 2,
    category: DEVICE_SETTINGS_CATEGORY_LANGUAGE,
    settings: [
      {
        order: 1,
        id: DEVICE_SETTING_ID_LANGUAGE_SELECTION,
        type: settingTypes.DROPDOWN_W_ICONS,
      },
    ],
  },
  {
    order: 3,
    category: DEVICE_SETTINGS_CATEGORY_VOICE_PROMPTS_AND_TONES,
    settings: [
      {
        order: 1,
        id: DEVICE_SETTING_ID_MANAGE_ALL,
        type: settingTypes.RADIO,
      },
      {
        order: 2,
        id: DEVICE_SETTING_ID_CALLS_ANNOUNCEMENT,
        type: settingTypes.RADIO,
        subsettings: [
          {
            order: 3,
            id: DEVICE_SETTING_ID_INCOMING_CALL,
            type: settingTypes.RADIO,
            hideDescription: true,
          },
          {
            order: 4,
            id: DEVICE_SETTING_ID_ANSWERING_CALL,
            type: settingTypes.RADIO,
            hideDescription: true,
          },
          {
            order: 5,
            id: DEVICE_SETTING_ID_ANSWER_IGNORE,
            type: settingTypes.RADIO,
            hideDescription: true,
          },
          {
            order: 6,
            id: DEVICE_SETTING_ID_ACTIVE_AUDIO_TONE,
            type: settingTypes.RADIO,
            hideDescription: true,
          },
        ],
      },
      {
        order: 7,
        id: DEVICE_SETTING_ID_CONNECTION_INDICATION,
        type: settingTypes.RADIO,
      },
      {
        order: 8,
        id: DEVICE_SETTING_ID_HOLD_REMINDER,
        type: settingTypes.RADIO,
      },
    ],
  },
  {
    order: 9,
    category: DEVICE_SETTINGS_CATEGORY_LIGHTS,
    settings: [
      {
        order: 1,
        id: SETTINGS.STATUS_LED_BRIGHTNESS,
        type: settingTypes.SLIDER,
      },
      {
        order: 2,
        id: SETTINGS.STATUS_LED_IDLE_STATE,
        type: settingTypes.RADIO,
      },
      {
        order: 3,
        id: SETTINGS.STATUS_LED_INCOMING_CALL,
        type: settingTypes.RADIO,
      },
      {
        order: 4,
        id: SETTINGS.STATUS_LED_ACTIVE_CALL,
        type: settingTypes.RADIO,
      },
      {
        order: 5,
        id: SETTINGS.STATUS_LED_HELD_CALL,
        type: settingTypes.RADIO,
      },
      {
        order: 6,
        id: SETTINGS.STATUS_LED_QI_CHARGING,
        type: settingTypes.RADIO,
      },
    ],
  },
  {
    order: 4,
    category: DEVICE_SETTINGS_CATEGORY_RINGTONE_AND_VOLUME,
    settings: [
      {
        order: 1,
        id: DEVICE_SETTING_ID_SIDETONE,
        type: settingTypes.DROPDOWN_W_ICONS,
      },
      {
        order: 2,
        id: DEVICE_SETTING_ID_VOLUME_LEVEL_TONES,
        type: settingTypes.DROPDOWN_W_ICONS,
      },
      {
        order: 3,
        id: DEVICE_SETTING_ID_RINGTONE,
        type: settingTypes.RADIO,
      },
      {
        order: 4,
        id: SETTINGS.BASE_RINGER_VOLUME,
        type: settingTypes.DROPDOWN_W_ICONS,
      },
      {
        order: 2,
        id: DEVICE_SETTING_ID_DESKPHONE_TONE,
        type: settingTypes.DROPDOWN_W_ICONS,
      },
      {
        order: 3,
        id: DEVICE_SETTING_ID_DESKPHONE_VOLUME,
        type: settingTypes.DROPDOWN_W_ICONS,
      },
      {
        order: 4,
        id: DEVICE_SETTING_ID_MOBILE_PHONE,
        type: settingTypes.DROPDOWN_W_ICONS,
      },
      {
        order: 5,
        id: DEVICE_SETTING_ID_MOBILE_PHONE_VOLUME,
        type: settingTypes.DROPDOWN_W_ICONS,
      },
      {
        order: 6,
        id: DEVICE_SETTING_ID_PC,
        type: settingTypes.DROPDOWN_W_ICONS,
      },
      {
        order: 7,
        id: DEVICE_SETTING_ID_PC_VOLUME,
        type: settingTypes.DROPDOWN_W_ICONS,
      },
      {
        order: 8,
        id: DEVICE_SETTING_ID_CHARGE_CONFIRMATION,
        type: settingTypes.RADIO,
      },
      {
        order: 10,
        id: DEVICE_SETTING_ID_VIBRATE_ON_RING,
        type: settingTypes.RADIO,
      },
      {
        order: 12,
        id: DEVICE_SETTING_ID_INDEPENDENT_VOLUME_CONTROL,
        type: settingTypes.RADIO,
      },
      {
        order: 13,
        id: DEVICE_SETTING_ID_ANC_TIMEOUT,
        type: settingTypes.DROPDOWN_W_ICONS,
      },
      {
        order: 14,
        id: DEVICE_SETTING_ID_MUTE_REMINDER_VOLUME,
        type: settingTypes.DROPDOWN_W_ICONS,
      },
      {
        order: 15,
        id: DEVICE_SETTING_ID_SYSTEM_TONE,
        type: settingTypes.DROPDOWN_W_ICONS,
      },
      {
        order: 16,
        id: DEVICE_SETTING_ID_WEARING_PREFERENCE_FOR_VOLUME_CONTROL,
        type: settingTypes.DROPDOWN_W_ICONS,
      },
      {
        order: 18,
        id: DEVICE_SETTING_ID_VOLUME_MIN_MAX_ALERTS,
        type: settingTypes.DROPDOWN_W_ICONS,
      },
    ],
  },
  {
    order: 19,
    category: DEVICE_SETTINGS_CATEGORY_AUDIO,
    settings: [
      {
        order: 1,
        id: SETTINGS.ACOUSTIC_FENCE,
        type: settingTypes.DROPDOWN_W_ICONS,
        modalId: 'ACOUSTIC_FENCE',
      },
      {
        order: 2,
        id: SETTINGS.NOISEBLOCK_TX,
        type: settingTypes.RADIO,
        modalId: 'NOISEBLOCKAI',
      },
      {
        order: 3,
        id: SETTINGS.NOISEBLOCK_RX,
        type: settingTypes.RADIO,
        modalId: 'NOISEBLOCKAI',
      },
      {
        order: 4,
        id: SETTINGS.BASS_BOOST,
        type: settingTypes.RADIO,
      },
      {
        order: 5,
        id: SETTINGS.STEREO_AUDIO,
        type: settingTypes.RADIO,
      },
      {
        order: 6,
        id: DEVICE_SETTING_ID_AUDIO_BASS,
        type: settingTypes.SLIDER,
      },
      {
        order: 7,
        id: DEVICE_SETTING_ID_AUDIO_TREBLE,
        type: settingTypes.SLIDER,
      },
    ],
  },
  {
    order: 5,
    category: DEVICE_SETTINGS_CATEGORY_SENSOR_AND_PRESENCE,
    settings: [
      {
        order: 1,
        id: DEVICE_SETTING_ID_WEARING_SENSOR_MASTER,
        type: settingTypes.RADIO,
      },
      {
        order: 2,
        id: DEVICE_SETTING_ID_ACTIVE_CALL_AUDIO,
        type: settingTypes.DROPDOWN_W_ICONS,
      },
      {
        order: 3,
        id: DEVICE_SETTING_ID_AUTO_ANSWER,
        type: settingTypes.RADIO,
      },
      {
        order: 4,
        id: DEVICE_SETTING_ID_AUTO_PAUSE_MUSIC,
        type: settingTypes.RADIO,
      },
      {
        order: 5,
        id: DEVICE_SETTING_ID_CALL_BUTTON_LOCK,
        type: settingTypes.RADIO,
      },
      {
        order: 6,
        id: DEVICE_SETTING_ID_SMART_AUDIO_TRANSFER,
        type: settingTypes.RADIO,
      },
      {
        order: 7,
        id: DEVICE_SETTING_ID_AUTO_MUTE,
        type: settingTypes.RADIO,
      },
    ],
  },
  {
    order: 8,
    category: DEVICE_SETTINGS_CATEGORY_SOFTPHONES_AND_MEDIA_PLAYERS,
    settings: [
      {
        order: 1,
        id: DEVICE_SETTING_ID_DIAL_TONE,
        type: settingTypes.RADIO,
      },
    ],
  },
  {
    order: 3,
    category: DEVICE_SETTINGS_CATEGORY_WIRELESS,
    settings: [
      {
        order: 1,
        id: DEVICE_SETTING_ID_AUDIO_QUALITY,
        type: settingTypes.DROPDOWN_W_ICONS,
      },
      {
        order: 2,
        id: DEVICE_SETTING_ID_EXTENDED_RANGE_MODE,
        type: settingTypes.RADIO,
      },
      {
        order: 3,
        id: DEVICE_SETTING_ID_HD_VOICE,
        type: settingTypes.RADIO,
      },
      {
        order: 4,
        id: DEVICE_SETTING_ID_AUTO_CONNECT_TO_MOBILE_PHONE,
        type: settingTypes.RADIO,
      },
      {
        order: 5,
        id: DEVICE_SETTING_ID_AUTO_CONNECT_TO_MOBILE_PHONE_2,
        type: settingTypes.DROPDOWN_W_ICONS,
      },
      {
        order: 6,
        id: DEVICE_SETTING_ID_BLUETOOTH,
        type: settingTypes.RADIO,
      },
      {
        order: 7,
        id: DEVICE_SETTING_ID_BLUETOOTH_2,
        type: settingTypes.RADIO,
      },
      {
        order: 8,
        id: DEVICE_SETTING_ID_DESKPHONE_AUDIO_BANDWIDTH,
        type: settingTypes.DROPDOWN_W_ICONS,
      },
      {
        order: 9,
        id: DEVICE_SETTING_ID_PC_AUDIO_BANDWIDTH,
        type: settingTypes.DROPDOWN_W_ICONS,
      },
      {
        order: 10,
        id: DEVICE_SETTING_ID_MOBILE_VOICE_COMMANDS,
        type: settingTypes.RADIO,
      },
      {
        order: 11,
        id: DEVICE_SETTING_ID_OVER_THE_AIR_SUBSCRIPTION,
        type: settingTypes.RADIO,
      },
      {
        order: 12,
        id: DEVICE_SETTING_ID_RANGE,
        type: settingTypes.DROPDOWN_W_ICONS,
      },
      {
        order: 13,
        id: DEVICE_SETTING_ID_STREAMING_AUDIO,
        type: settingTypes.RADIO,
      },
      {
        order: 14,
        id: DEVICE_SETTING_ID_CLEAR_TRUSTED_DEVICE_LIST,
        type: settingTypes.RADIO,
      },
      {
        order: 15,
        id: DEVICE_SETTING_ID_SECURE_BLUETOOTH,
        type: settingTypes.RADIO,
      },
      //      {
      //        order: 16,
      //        id: '0x070A',
      //        type: settingTypes.RADIO,
      //      },
      //      {
      //        order: 17,
      //        id: '0x070B',
      //        type: settingTypes.RADIO,
      //      },
    ],
  },
  {
    order: 6,
    category: DEVICE_SETTINGS_CATEGORY_ADVANCED,
    settings: [
      {
        order: 2,
        id: DEVICE_SETTING_ID_ANTI_STARTLE,
        type: settingTypes.RADIO,
      },
      {
        order: 3,
        id: DEVICE_SETTING_ID_ANTI_STARTLE_2,
        type: settingTypes.DROPDOWN_W_ICONS,
      },
      {
        order: 4,
        id: DEVICE_SETTING_ID_NOISE_EXPOSURE,
        type: settingTypes.DROPDOWN_W_ICONS,
      },
      {
        order: 5,
        id: DEVICE_SETTING_ID_HOURS_ON_PHONE_PER_DAY,
        type: settingTypes.DROPDOWN_W_ICONS,
      },
      {
        order: 6,
        id: DEVICE_SETTING_ID_SELECT_HEADSET_TYPE,
        type: settingTypes.DROPDOWN_W_ICONS,
      },
    ],
  },
  {
    order: 7,
    category: DEVICE_SETTINGS_CATEGORY_ANC,
    settings: [
      {
        order: 1,
        id: DEVICE_SETTING_ID_ANC_MODE,
        type: settingTypes.DROPDOWN_W_ICONS,
      },
      {
        order: 2,
        id: DEVICE_SETTING_ID_TRANSPARENCY_MODE,
        type: settingTypes.DROPDOWN_W_ICONS,
      },
    ],
  },
  {
    order: 4,
    category: 'Apps',
    settings: [
      //      {
      //        order: 1,
      //        id: '0x0904', // DEVICE_SETTING_ID_TILE
      //        type: settingTypes.RADIO,
      //        appUrl: {
      //          ios_app: 'tileapp://',
      //          ios_store:
      //            'https://itunes.apple.com/us/app/tile-find-lost-keys-phone/id664939913?mt=8',
      //          android_app: 'https://tile.app.link/plantronics_activation',
      //          android_store: 'market://details?id=com.thetileapp.tile',
      //        },
      //    },
      //      {
      //        order: 2,
      //        id: '0x0905', // DEVICE_SETTING_ID_ALEXA
      //        type: settingTypes.RADIO,
      //        appUrl: {
      //          ios_app: 'alexa://?fragment=v2/accessory-settings/gateway?deviceid=',
      //          ios_store:
      //            'https://itunes.apple.com/us/app/amazon-alexa/id944011620?mt=8',
      //          android_app:
      //            'https://alexa.amazon.com/?fragment=v2/accessory-settings/gateway?deviceid=',
      //          android_store: 'market://details?id=com.amazon.dee.app',
      //      },
      //    },
      {
        order: 1,
        id: DEVICE_SETTING_ID_BISTO,
        type: settingTypes.RADIO,
      },
    ],
  },
  {
    order: 8,
    category: DEVICE_SETTINGS_CATEGORY_CUSTOM_BUTTON,
    settings: [
      {
        order: 1,
        id: SETTINGS.ROCKET_BUTTON,
        type: settingTypes.DROPDOWN_W_ICONS,
        // this is a way of the UI hiding options that hub-native may have available as options, but either don't yet work or will not be implemented
        // VPA and redial options will never be implemented @help https://jira.poly.com/browse/EN-203878?focusedCommentId=1259084&page=com.atlassian.jira.plugin.system.issuetabpanels%3Acomment-tabpanel#comment-1259084
        // lens is advanced functionality (requires an emit event from hub-native), may be implemented at some point:
        // @help https://jira.poly.com/browse/LENS-388?focusedCommentId=1231507&page=com.atlassian.jira.plugin.system.issuetabpanels%3Acomment-tabpanel#comment-1231507
        // videoMute will never be implemented @help https://jira.poly.com/browse/LENS-1552
        hiddenOptions: ['vpa', 'redial', 'lens', 'videoMute'],
      },
      {
        order: 2,
        id: DEVICE_SETTING_ID_ROCKET_BUTTON_BEHAVIOR,
        type: settingTypes.DROPDOWN_W_ICONS,
        //sortAlpha: true,
      },
    ],
  },
  {
    order: 8,
    category: DEVICE_SETTINGS_CATEGORY_CUSTOM_SWIPE,
    settings: [
      {
        order: 1,
        id: DEVICE_SETTING_ID_CUSTOM_SLIDER_IDLE,
        type: settingTypes.DROPDOWN_W_ICONS,
      },
      {
        order: 2,
        id: DEVICE_SETTING_ID_CUSTOM_SLIDER_CALL,
        type: settingTypes.DROPDOWN_W_ICONS,
      },
      {
        order: 3,
        id: DEVICE_SETTING_ID_CUSTOM_SLIDER_MEDIA,
        type: settingTypes.DROPDOWN_W_ICONS,
      },
    ],
  },
  {
    order: 9,
    category: DEVICE_SETTINGS_CATEGORY_RESET_DEVICE,
    settings: [
      {
        order: 1,
        id: DEVICE_SETTING_ID_RESTART_DEVICE,
        type: settingTypes.RESTART_DEVICE,
      },
      {
        order: 2,
        id: DEVICE_SETTING_ID_RESTORE_DEFAULTS,
        type: settingTypes.BUTTON,
      },
      {
        order: 3,
        id: DEVICE_SETTING_ID_CLEAR_TRUSTED_DEVICES,
        type: settingTypes.BUTTON,
      },
    ],
  },
  {
    order: 4,
    category: DEVICE_SETTINGS_CATEGORY_DIAGNOSTICS,
    settings: [
      {
        order: 1,
        id: SETTINGS.ON_SCREEN_DISPLAY,
        type: settingTypes.RADIO,
      },
    ],
  },
];
