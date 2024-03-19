// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

export interface LensSettingUI {
  productImprovement: boolean;
  anonymousData: boolean;
  enableNotifications: boolean;
  wellness: boolean;
  deviceAlerts: boolean;
  deviceUnpaired: boolean;
  lowBattery: boolean;
  deviceCharging: boolean;
  updateAvailable: boolean;
  networkConnect: boolean;
  softwareUpdate: boolean;
  deviceDisconnected: boolean;
  muteAlert: boolean;
  backgroundNoiseDetected: boolean;
  deviceSoftwareUpdate: boolean;
  automaticUpdates: boolean;
  soundscapeEnabled: boolean;
  soundscapeSound: string;
  soundscapeVolume: number;
  hydrationEnabled: boolean;
  hydrationDays: string[];
  hydrationTimeFrom: string;
  hydrationTimeTo: string;
  hydrationTimeSpan: string;
  visionEnabled: boolean;
  visionDays: string[];
  visionTimeFrom: string;
  visionTimeTo: string;
  visionTimeSpan: string;
  startOnSystemStartup: boolean;
  startMinimized: boolean;
  eulaAccepted: boolean;
  language: string;
}

// TO DO: This interface is copied from Lens 1 and should be discussed for Lens 2
export interface LensSettingAccountMetadata {
  action: string;
  type: string;
  title: string;
  description: string;
}

// TO DO: This type is copied from Lens 1 and should be discussed for Lens 2
export type UserInvite = {
  id: string;
  email: string;
  created_at: Date;
  accepted_at?: Date;
  accepted_by_accessor_id?: string;
  tenant_id: string;
  role_name: string;
  invited_by_accessor_id: string;
  invited_by_email: string;
  tenant_name: string;
};
