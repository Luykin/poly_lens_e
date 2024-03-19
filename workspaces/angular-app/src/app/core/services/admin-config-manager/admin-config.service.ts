import { Injectable } from '@angular/core';
import fs from 'node:fs';
import { LoggingService } from '../logging/logging.service';

/**
 * AdminConfig is a service responsible for retrieval of administrative configuration.
 *
 * Administrative configuration is a set of optional read only configuration options
 * to be managed by administrators on target deployments.
 */
@Injectable({
  providedIn: 'root',
})
export class AdminConfig {
  mode: 'cloud' | 'network' = 'cloud';
  dfuPath: string | undefined = undefined;
  eulaAccept: boolean = true;
  dfuRemindHours = 8;
  launchAtStartup: boolean | undefined = undefined;
  launchMinimized: boolean | undefined = undefined;

  constructor(private logger: LoggingService) {}

  // Show device settings in "cloud" mode always and in "network" mode only if admin
  // deploys a configuration file with this option turned on
  get deviceSettingsEnabled(): boolean {
    return (
      this.mode === 'cloud' ||
      (this.mode === 'network' && this._deviceSettingsEnabled)
    );
  }

  // Actual value of the configuration for showing device settings in the "network" mode
  _deviceSettingsEnabled = false;

  async load() {
    const adminConfigPath = await window.api.pathJoin(
      await window.api.getPath('appData'),
      'oz-client',
      'admin-config.json'
    );

    if (fs.existsSync(adminConfigPath)) {
      try {
        const config = JSON.parse(fs.readFileSync(adminConfigPath).toString());
        this.mode = config?.mode ?? 'cloud';
        this.dfuPath = config?.dfuPath ?? undefined;
        this.eulaAccept = (config?.['Accept EULA'] ?? 'No') === 'No';
        this.dfuRemindHours = config.dfuRemindHours ?? 8;
        this._deviceSettingsEnabled = config.deviceSettingsEnabled ?? false;
        this.launchAtStartup = config?.launchAtStartup ?? undefined;
        this.launchMinimized = config?.launchMinimized ?? undefined;
      } catch (error) {
        this.logger.error(
          `Could not parse data retrieved from "admin-config.json" file. Error:`,
          { error: error }
        );
      }
    }
  }
}
