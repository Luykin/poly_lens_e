// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

const API_VERSION = '1.0.0';

/**
 * Base class that represents communication message between Lens Desktop and Lens Control Service.
 * All real-life messages should be extended from this one.
 * See DeviceList message for example.
 */

export class LCSApiMessage {
  // Derived class name should be the same as the type of the LCS API message
  type = this.constructor.name;
  // LCS API Spec version
  apiVersion: string = API_VERSION;
  name?: string;

  constructor(name?: string) {
    this.name = name;
  }
}
