export interface Softphone {
  /**
   * Softphone id.
   */
  id: string;
  /**
   * Softphone display name.
   */
  displayName: string;
  /**
   * If true, Poly Lens can attach to this softphone.
   */
  enabled: boolean;
  /**
   * If true, Poly Lens is attached to this softphone.
   */
  connected?: boolean;
  /**
   * If true, this softphone can be a target softphone, e.g. for making outgoing calls from a headset.
   */
  canBeTarget?: boolean;
}
