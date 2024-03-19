import { Softphone } from '../ui/softphone-ui.model';

export interface LensSettingsState {
  softphone?: SoftphoneState;
}

interface SoftphoneState {
  softphonesList?: Softphone[];
}
