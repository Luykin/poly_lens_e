/* eslint-disable @typescript-eslint/no-explicit-any */
// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

import { Inject, Injectable, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { cloneDeep as _cloneDeep } from 'lodash';
import {
  BehaviorSubject,
  distinctUntilChanged,
  first,
  map,
  Observable,
  shareReplay,
} from 'rxjs';
import { APP_INIT_STATE_TOKEN } from '../../utilities/constants';
import { LoggingService } from '../services/logging/logging.service';
import { StateUI } from './state-ui-model';

type StateSelector<T> = (o: T) => any;

export enum Operator {
  REPLACE,
  PATCH, // patch a specific path with new data
  FUNCTION, // custom functionality to mutate state
  EMPTY_ENTITY,
}

@Injectable({
  providedIn: 'root',
})
export class StateService<T extends StateUI<string>> {
  private _store!: BehaviorSubject<T>;
  private _initialState!: T;

  constructor(
    // @help see app-state.model.ts
    @Inject(APP_INIT_STATE_TOKEN) appInitState: T,
    private logger: LoggingService
  ) {
    this._store = new BehaviorSubject(appInitState);
  }

  /**
   * Initialize the state store with initial values.
   * See initial data in app-state.model.ts.
   */
  initialize(initialState: T) {
    this._initialState = initialState;
    this._store = new BehaviorSubject(initialState);
  }

  /**
   * Update state using one of the Operator enum methods.
   *
   * @param entityType
   * @param options - see typing and state.service.spec.ts for option examples;
   * defaults to the Operator.REPLACE operator
   */
  public updateEntity$<U>(
    entityType: keyof T,
    options:
      | {
          // replace an entire entity with new data
          operator?: Operator.REPLACE;
          data: Partial<T[keyof T]>;
        }
      | {
          // patch a specific path with new data
          operator: Operator.PATCH;
          data: Partial<T[keyof T]>;
        }
      | {
          // set undefined a specific path
          operator: Operator.EMPTY_ENTITY;
        }
      | {
          // FUNCTION operators may be used for complex update scenarios, but is discouraged
          // if another operator can be used or created;  use _.cloneDeep to guard against JavaScript mutation
          // scenarios such as in state.service.spec.ts test 'should not allow object mutation'
          operator: Operator.FUNCTION;
          updateFunction: (context: U) => U;
        }
  ): Observable<U> {
    const currentStore = this._store.getValue();
    if (!options.operator) {
      options.operator = Operator.REPLACE;
    }

    let updatedStore, updatedEntity;
    switch (options.operator) {
      case Operator.REPLACE: {
        updatedStore = Object.assign({}, currentStore, {
          // Lodash cloneDeep used here because it is excellent at deep cloning, including handling of
          // circular references, Date objects and other edge cases.
          [entityType]: _cloneDeep(options.data),
        });
        this._store.next(updatedStore);
        break;
      }
      case Operator.FUNCTION: {
        updatedEntity = options.updateFunction(currentStore[entityType]);
        updatedStore = Object.assign({}, currentStore, {
          [entityType]: updatedEntity,
        });
        this._store.next(updatedStore);
        break;
      }
      case Operator.PATCH: {
        updatedStore = Object.assign({}, currentStore, {
          [entityType]: {
            ...currentStore[entityType],
            ..._cloneDeep(options.data),
          },
        });
        this._store.next(updatedStore);
        break;
      }
      case Operator.EMPTY_ENTITY: {
        updatedStore = Object.assign({}, currentStore, {
          [entityType]: undefined,
        });
        this._store.next(updatedStore);
        break;
      }
      default: {
        this.logger.error(
          `The entityUpdate operator ${options.operator} is not yet implemented given options:`,
          { options }
        );
      }
    }

    return this.getEntity$(entityType);
  }

  /**
   * Get an observable based on an entity.
   */
  public getEntity$(entityType: keyof T): Observable<any> {
    return this._selectableStore.pipe(map((store) => store[entityType]));
  }

  /**
   * Retrieve a one-time snapshot of an entity in the state store.
   */
  public getSnapshot<U>(entityType: keyof T): U {
    return this._store.getValue()[entityType];
  }

  /**
   * Retrieve a one-time snapshot of the entire state store. Used rarely.
   */
  public getStoreSnapshot() {
    return this._store.getValue();
  }

  /**
   * Get an observable based on a deep selection of data from the state store.
   * @param selector Function path to do a deep selection on data.
   * 			Examples:
   * s => state.app.ready
   */
  public select$(selector: StateSelector<T>): Observable<any> {
    return this._selectableStore.pipe(
      map((state) => this.getValueFromStore(state, selector)),
      distinctUntilChanged()
    );
  }

  /**
   * Emits current selection of deep data from the state store then completes.
   */
  public selectFirst$(selector: StateSelector<T>): Observable<any> {
    return this._selectableStore.pipe(
      map((state) => this.getValueFromStore(state, selector)),
      first()
    );
  }

  /**
   * Emits current selection of deep data as a signal from the state store.
   */
  public selectFirstSignal(selector: StateSelector<T>): Signal<any> {
    return toSignal(this.selectFirst$(selector));
  }

  /**
   * Reset the state store to the initial state. Use with caution.
   */
  public reset() {
    this._store.next(this._initialState);
  }

  private get _selectableStore() {
    return this._store.pipe(shareReplay({ bufferSize: 1, refCount: false }));
  }

  /**
   * Simple helper method to get data from the state store based on a selector.
   */
  private getValueFromStore(state: T, selector: StateSelector<T>) {
    return selector(state);
  }
}
