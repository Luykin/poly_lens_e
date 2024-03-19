export type ValueOf<T> = T[keyof T];

/**
 * This is session state that will be persisted to local storage.
 * This data is NOT saved to the browser's session storage, as that
 * is not persistent.
 *
 * Note all values saved to local storage are JSON stringified first, to provide
 * maximum compatibility with JavaScript data types.
 */
export interface SessionState {
  EULA_AGREED: boolean;
  LENS_MOBILE_TOAST_COUNTER: number;
  LENS_MOBILE_TOAST_DONT_SHOW_AGAIN: boolean;
}

// string needed for testing; can remove "| string" when any SessionState value is a string
export type SessionStateValues = ValueOf<SessionState> | string;

export const defaultSessionState: SessionState = {
  EULA_AGREED: false,
  LENS_MOBILE_TOAST_COUNTER: 0,
  LENS_MOBILE_TOAST_DONT_SHOW_AGAIN: false,
};
