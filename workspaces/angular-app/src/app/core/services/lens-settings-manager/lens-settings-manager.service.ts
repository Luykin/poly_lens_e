import { Injectable } from '@angular/core';
import { LensSettingUI } from '../../models/ui/lens-settings-ui.model';
import { UtilityService } from '../utility/utility.service';
import { LCSCommunicatorService } from '../lcs-communicator/lcs-communicator.service';
import { LCSSoftphoneListResponse } from '../../models/lcs-responses/softphone-list';
import { LCSGetSoftphoneListRequest } from '../../models/lcs-requests/get-softphone-list';
import { Operator, StateService } from '../../state-management/state.service';
import { AppStateType } from '../../models/state/app-state.model';
import { Softphone } from '../../models/ui/softphone-ui.model';
import { LensSettingsState } from '../../models/state/lens-settings.model';
import { Observable } from 'rxjs';
import { LCSSoftphoneStatusResponse } from '../../models/lcs-responses/softphone-status';
import { LCSSoftphoneControlRequest } from '../../models/lcs-requests/set-softphone-control';

export const LENS_SETTINGS_KEY = 'LENS_SETTINGS';

@Injectable({
  providedIn: 'root',
})
export class LensSettingsManagerService {
  constructor(
    private utility: UtilityService,
    private lcsCommunicator: LCSCommunicatorService,
    private state: StateService<AppStateType>
  ) {
    this._prepareIpcListeners();
  }

  public defaultLensSettings: LensSettingUI = {
    productImprovement: false,
    anonymousData: false,
    enableNotifications: true,
    wellness: false,
    deviceAlerts: true,
    deviceUnpaired: false,
    lowBattery: true,
    deviceCharging: false,
    updateAvailable: true,
    networkConnect: false,
    softwareUpdate: true,
    deviceDisconnected: false,
    muteAlert: true,
    backgroundNoiseDetected: false,
    deviceSoftwareUpdate: true,
    automaticUpdates: false,
    soundscapeEnabled: false,
    soundscapeSound: 'soundscapes/mountain_ranch/mountain_ranch_1',
    soundscapeVolume: 1,
    hydrationEnabled: false,
    hydrationDays: ['1', '2', '3', '4', '5'],
    hydrationTimeFrom: '9',
    hydrationTimeTo: '17',
    hydrationTimeSpan: '30',
    visionEnabled: false,
    visionDays: ['1', '2', '3', '4', '5'],
    visionTimeFrom: '9',
    visionTimeTo: '17',
    visionTimeSpan: '30',
    startOnSystemStartup: true,
    startMinimized: true,
    eulaAccepted: false,
    language: '',
  };

  /**
   * Restores app to a default state.
   */
  async restoreDefault() {
    this.utility.identityStub('Restore default');
  }

  // Prepare LCS listeners
  private _prepareIpcListeners(): void {
    // Get Softphones listener
    this.lcsCommunicator.addListener(
      LCSSoftphoneListResponse.type,
      this._handleLCSReponseSoftphoneList.bind(this)
    );

    // Get softphone status listener
    this.lcsCommunicator.addListener(
      LCSSoftphoneStatusResponse.type,
      this._handleLCSResponseSoftphoneStatus.bind(this)
    );
  }

  /**
   * Request softphones from LCS
   */
  public loadSoftphones(): void {
    this.lcsCommunicator.sendToLCS(new LCSGetSoftphoneListRequest());
  }

  /**
   * Set softphone control
   * @param softphoneId
   * @param enabled
   */
  public setSoftphoneControl(softphoneId: string, enabled: boolean): void {
    const setSoftphoneEnabledRequest = new LCSSoftphoneControlRequest(
      softphoneId,
      enabled
    );
    this.lcsCommunicator.sendToLCS(setSoftphoneEnabledRequest);
  }

  /**
   * Handles LCS response for softphones
   * @param lcsResponse
   */
  private _handleLCSReponseSoftphoneList(
    lcsResponse: LCSSoftphoneListResponse
  ): void {
    const softphonesList = lcsResponse.softphones;
    this.state.updateEntity$<Softphone[]>('lensSettings', { data: {} });

    this.state.updateEntity$<LensSettingsState>('lensSettings', {
      operator: Operator.FUNCTION,
      updateFunction: (lensSettings) => {
        lensSettings = {
          ...lensSettings,
          softphone: {
            softphonesList: softphonesList,
          },
        };
        return lensSettings;
      },
    });
  }

  /**
   * Handles LCS response for softphone status
   * @param lcsResponse
   */
  private _handleLCSResponseSoftphoneStatus(
    lcsResponse: LCSSoftphoneStatusResponse
  ): void {
    this.state.updateEntity$<LensSettingsState>('lensSettings', {
      operator: Operator.FUNCTION,
      updateFunction: (lensSettings) => {
        lensSettings = {
          ...lensSettings,
          softphone: {
            ...lensSettings.softphone,
            softphonesList: lensSettings.softphone!.softphonesList!.map(
              (softphone) => {
                if (softphone.id === lcsResponse.id) {
                  return {
                    ...softphone,
                    connected: lcsResponse?.connected,
                    enabled: lcsResponse.enabled,
                  };
                }
                return softphone;
              }
            ),
          },
        };
        return lensSettings;
      },
    });
  }

  /**
   * Get lens settings from the state
   */
  public get lensSettings$(): Observable<Softphone[] | undefined> {
    return this.state.select$((s) => s.lensSettings);
  }

  /**
   * Get softphone from the state
   */
  public get softphone$(): Observable<Softphone[] | undefined> {
    return this.state.select$((s) => s.lensSettings.softphone);
  }

  /**
   * Get softphones list from the state
   */
  public get softphonesList$(): Observable<Softphone[] | undefined> {
    return this.state.select$((s) => s.lensSettings.softphone?.softphonesList);
  }
}
