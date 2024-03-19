import { Pipe, PipeTransform } from "@angular/core";

/**
 * Removes manufacturer name ("Plantronics", "Polycom", "Poly") if it appears as a prefix of a deivce name.
 */
export function removeManufacturerName(value?: string): string | undefined {
  const prefixMatch = value?.match(/^plantronics|polycom|poly/i);
  if (prefixMatch) {
    const valueWithoutPrefix = value?.slice(prefixMatch[0].length);
    return valueWithoutPrefix?.trim(); // Trim to remove leading space
  }
  // No match, return original string
  return value;
}

@Pipe({
  name: "deviceName",
})
export class DeviceNamePipe implements PipeTransform {
  transform(value?: string) {
    return removeManufacturerName(value);
  }
}
