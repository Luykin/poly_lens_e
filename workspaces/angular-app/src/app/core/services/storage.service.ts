import { Injectable } from '@angular/core';
import { isEqual as _isEqual } from 'lodash';
import { distinctUntilChanged } from 'rxjs';
import {
  defaultSessionState,
  SessionState,
  SessionStateValues,
} from '../models/state/app-settings.model';
import { AppStateType } from '../models/state/app-state.model';
import { StateService } from '../state-management/state.service';
import { LoggingService } from './logging/logging.service';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(
    private state: StateService<AppStateType>,
    private logger: LoggingService
  ) {
    // simple method to watch for session changes
    // note this does NOT remove entries from localStorage; storage key cleanup is not currently in scope or yet needed
    this.state
      .getEntity$('session')
      .pipe(
        // using lodash isEqual to deeply compare what will become highly complex, nested objects
        distinctUntilChanged((previous, current) => _isEqual(previous, current))
      )
      .subscribe((session) => {
        if (!session || Object.keys(session).length === 0) {
          this.logger.error(
            'Session state is empty.  This is likely a bug.  Refusing to save.'
          );
        }
        StorageService.saveSessionState(session);
      });
  }

  /**
   * Return an object of all items in local storage that are also set in defaultSessionState.
   * This is useful for hydration of session data on app start.
   */
  static getAllItems(): Partial<SessionState> {
    // array reduce is not allowed by lint, using for instead
    const items: Partial<SessionState> = {};
    for (const key in localStorage) {
      // only add key if it exists in defaultSessionState
      if (Object.keys(defaultSessionState).includes(key)) {
        // @ts-expect-error Unable to simply type `items[key]` properly
        items[key] = StorageService.getItem(key);
      }
    }

    return items;
  }

  /**
   * Ensure session state is initialized.  If it's not, initialize with defaultSessionState.
   * Also runs ensureSessionStateHasAllFields, in case an expected key was deleted from local storage.
   * Return getAllItems.
   */
  static ensureSessionStateInitialized(): SessionState {
    const isInitialized = Object.keys(this.getAllItems()).length > 0;
    if (!isInitialized) {
      StorageService.saveSessionState(defaultSessionState);
    }

    StorageService.ensureSessionStateHasAllFields();

    return <SessionState>this.getAllItems();
  }

  static ensureSessionStateHasAllFields() {
    for (const key of Object.keys(defaultSessionState)) {
      // if key is not set in local storage, set it to default value
      if (null === localStorage.getItem(key)) {
        StorageService.setItem(
          key as keyof SessionState,
          defaultSessionState[key as keyof SessionState]
        );
      }
    }
  }

  static saveSessionState(sessionState: SessionState) {
    for (const key in sessionState) {
      StorageService.setItem(
        key as keyof SessionState,
        sessionState[key as keyof SessionState]
      );
    }
  }

  /**
   * Get an item, with optional defaultItem if no item is stored or undefined was stored.
   *
   * @param key
   * @param defaultItem - returned if stored value was undefined (which after JSON.stringify
   * is "undefined"), or is not set; if a falsy value is stored in setItem, it will come back falsy
   * because JSON.stringify is used when storing the value
   */
  static getItem(
    key: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    defaultItem: any = undefined
  ): SessionStateValues | undefined {
    try {
      const value = localStorage.getItem(key);

      // if getItem key does not exist, null is returned
      // localStorage.setItem(myKey, JSON.stringify(undefined)) saves the string "undefined";
      // thus check for that value here
      if (null === value || 'undefined' === value) {
        return defaultItem;
      }

      return JSON.parse(value);
    } catch (error) {
      console.error(error);

      return defaultItem;
    }
  }

  static setItem(key: keyof SessionState, value: SessionStateValues) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  }

  static clearItem(key: keyof SessionState) {
    localStorage.removeItem(key);
  }

  /**
   * Clear localStorage keys.
   */
  static clearAllItems() {
    window.localStorage.clear();
  }
}
