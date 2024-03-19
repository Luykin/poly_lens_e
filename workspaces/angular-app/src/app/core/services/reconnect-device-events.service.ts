import { Injectable, OnDestroy } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subject,
  Subscription,
  filter,
  map,
  race,
  timer,
} from 'rxjs';
import { DeviceUI } from 'src/app/core/models/ui/device-ui.model';
import { DeviceManagerService } from 'src/app/core/services/device-manager/device-manager.service';
import { MS_IN_SECOND } from 'src/app/utilities/constants';
import { LoggingService } from './logging/logging.service';

// Non-video devices do not manifest the same delays / unavailable after a reset
// so use drastically shorter times.
const RESET_WAIT_AFTER_RECONNECT_NON_VIDEO_MS = MS_IN_SECOND;
const RESET_RELEASE_NO_LATER_THAN_NON_VIDEO_MS = 3 * MS_IN_SECOND;

// Time to wait after the device reconnects before declaring "all clear"
// **IMPORTANT** this variable must be shorter than RESET_RELEASE_NO_LATER_THAN_MS
// const RESET_WAIT_AFTER_RECONNECT_VIDEO_MS = 15 * MS_IN_SECOND;

export type ReconnectDeviceStatus = 'Reconnecting' | 'ReconnectCompleted';

interface ReconnectDeviceEvent {
  // Status of device reconection.
  reconnectDeviceStatus: ReconnectDeviceStatus;
  // Device that is being reconnected
  device: DeviceUI;
}

/**
 * Object having a Device#deviceId as a key, which maps to device's last emited event for reconnecting status.
 */
type Events = {
  [deviceId: string]: ReconnectDeviceEvent;
};

// SERVICE

@Injectable({
  providedIn: 'root',
})
export class ReconnectDeviceEvents implements OnDestroy {
  private events = new BehaviorSubject<Events>({});
  private subscriptions = new Subscription();

  constructor(
    private deviceManager: DeviceManagerService,
    private loggingService: LoggingService
  ) {}

  /**
   * @param device Device that is being reconnected.
   */
  public reconnectStarted(device: DeviceUI) {
    // For vide devices use RESET_WAIT_AFTER_RECONNECT_VIDEO_MS
    const waitAfterReconnect = RESET_WAIT_AFTER_RECONNECT_NON_VIDEO_MS;
    // For video devices use RESET_RELEASE_NO_LATER_THAN_VIDEO_MS
    const releaseNoLaterThan = RESET_RELEASE_NO_LATER_THAN_NON_VIDEO_MS;

    this._fireEvent({ reconnectDeviceStatus: 'Reconnecting', device });

    if (releaseNoLaterThan <= waitAfterReconnect) {
      this.loggingService.log(
        'Code logic error, RESET_RELEASE_NO_LATER_THAN_MS must be longer than RESET_WAIT_AFTER_RECONNECT_MS'
      );
    }

    this.subscriptions.add(
      race(
        // Waiting for a device to be reconnected
        this._deviceReconnected(device.deviceId, waitAfterReconnect),
        // A decent time given to the reconnection process to complete before declaring it "completed"
        timer(releaseNoLaterThan)
      ).subscribe(() => {
        // Fire event that a reconnection process is completed
        this._fireEvent({
          reconnectDeviceStatus: 'ReconnectCompleted',
          device,
        });
        // Remove last emitted event for this device from the internal events store
        this._removeReconnectStatus(device);
      })
    );
  }

  /**
   * @returns Pipeline which delivers a reconnection status of a device
   */
  public getStatus(device: DeviceUI): Observable<ReconnectDeviceStatus> {
    return this.events.pipe(
      map((eventsSnapshot: Events) => {
        for (const deviceId in eventsSnapshot) {
          if (device.deviceId === deviceId) {
            return eventsSnapshot[deviceId].reconnectDeviceStatus;
          }
        }
        return 'ReconnectCompleted';
      }),
      filter((x) => !!x)
    );
  }

  /**
   * Removes a reconnection status information for a given device.
   */
  private _removeReconnectStatus(device: DeviceUI): void {
    const eventsSnapshot = this.events.getValue();
    delete eventsSnapshot[device.deviceId];
    this.events.next(eventsSnapshot);
  }

  /**
   * Fires a new reconnection status event.
   */
  private _fireEvent(event: ReconnectDeviceEvent): void {
    const eventsSnapshot = this.events.getValue();
    eventsSnapshot[event.device.deviceId] = event;
    this.events.next(eventsSnapshot);
  }

  /**
   * A sophisticated way to check that a device reconnects after a reset,
   * then wait a certain amount of time before giving the "all clear" (an
   * observable .complete() method).
   *
   * Sophisticated methods can fail under fringe cases, which is why a race
   * condition is raced against this to prevent too much time passing for the user.
   */
  private _deviceReconnected(
    deviceId: string,
    waitAfterReconnectMS: number
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Observable<any> {
    const deviceReconnected$ = new Subject();
    let deviceDisconnectedAtLeastOnce = false;

    this.subscriptions.add(
      this.deviceManager
        .getDeviceById(deviceId)
        .pipe(
          filter((device) => !!device)
          // then the following is likely
          // device isConnected = true (initial state), then false (resetting), then true (device is back)
        )
        .subscribe((device?: DeviceUI) => {
          // trap first false (resetting) case
          if (device && !device.attached) {
            deviceDisconnectedAtLeastOnce = true;
            return;
          }

          // return if device has not been disconnected yet
          if (!deviceDisconnectedAtLeastOnce) {
            return;
          }

          // at this point, device is now connected & available, wait an additional amount of time before resolving
          if (device?.attached) {
            setTimeout(() => {
              deviceReconnected$.next(false);
              deviceReconnected$.complete();
            }, waitAfterReconnectMS);
          }
        })
    );

    return deviceReconnected$;
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
