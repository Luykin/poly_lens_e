import { DeviceNamePipe, removeManufacturerName } from "./device-name.pipe";
import { expect } from 'expect';

describe("DeviceNamePipe", () => {
  it("create an instance", () => {
    const pipe = new DeviceNamePipe();
    expect(pipe).toBeTruthy();
  });
});

describe("removeManufacturerName", () => {
  it("should remove 'plantronics' at the beginning of a device name", () => {
    expect(removeManufacturerName("Plantronics BT600")).toEqual("BT600");
  });
  it("should remove 'polycom' at the beginning of a device name", () => {
    expect(removeManufacturerName("Polycom Studio USB")).toEqual("Studio USB");
  });
  it("should remove 'poly' at the beginning of a device name", () => {
    expect(removeManufacturerName("Poly BT700")).toEqual("BT700");
  });
});
