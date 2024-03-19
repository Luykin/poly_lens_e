// Copyright 2009, 2020, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

/* eslint-disable unicorn/consistent-function-scoping */
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  ViewContainerRef,
  computed,
  inject,
} from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { DetailNavService } from 'src/app/core/services/detail-nav/detail-nav.service';
import { DeviceManagerService } from 'src/app/core/services/device-manager/device-manager.service';
import { DeviceSettingsManagerService } from 'src/app/core/services/device-settings-manager/device-settings-manager.service';
import { DFUManagerService } from 'src/app/core/services/dfu-manager/dfu-manager.service';
import { DfuConfirmComponent } from 'src/app/shared/components/modals/dfu-confirm/dfu-confirm.component';
import { ModalService } from '../../core/services/modal.service';
import {
  DEVICE_SETTING_ID_FIRMWARE_VERSION,
  MODAL_ID_DFU_CONFIRM,
} from 'src/app/utilities/constants';
import { FileManagerService } from 'src/app/core/services/file-manager.service';
// import {
//   DFUError,
//   DFUUserAction,
//   GetCrashFilesRequest,
//   GetCrashFilesResponse,
// } from "@poly/hub-native";
// import { ActivatedRoute, ParamMap } from "@angular/router";
// import { BehaviorSubject, combineLatest, iif, of } from "rxjs";
// import { filter, pluck, switchMap } from "rxjs/operators";
// import * as remote from "@electron/remote";
// import { DfuModalService } from "../services/dfu-modal.service";
// import { TranslateService } from "@ngx-translate/core";
// import { SaveLogsData, SaveLogsService } from "../services/save-logs-service";
// import { DeviceUtils } from "../utilities/device.utilities";
// import { DEVICE_FEATURES, DEVICE_TYPE } from "../utilities/constants";
// import { DfuWarnings } from "../services/dfu-warnings.service";
// import { DfuNeedReconnectService } from "../services/dfu-need-reconnect.service";
// import { StateService } from "../services/state.service";
// import { Subscriptions } from "../utilities/subscriptions";
// import { TenantService } from "../services/tenant.service";
// import { Toast, Toasts } from "../shared/components/toast/toasts.service";
// import * as _ from "lodash";
// import { AdminConfig } from "../services/admin-config.service";

// const path = require("path");

// type DeviceButtonId = "headset" | "adapter";

// const CRASH_REPORTS_SUCCESS_TOAST: Toast = {
//   type: "status",
//   status: "success",
//   text: "NOTIFICATIONS.CRASH_REPORTS_SUCCESS",
// };

// const CRASH_REPORTS_FAILED_TOAST: Toast = {
//   type: "status",
//   status: "error",
//   text: "NOTIFICATIONS.CRASH_REPORTS_FAILED",
// };

@Component({
  templateUrl: './device-info-and-logs.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeviceInfoAndLogsComponent implements OnInit {
  private _destroyRef = inject(DestroyRef);
  // public device: OzDevice;
  // public deviceButtonId: DeviceButtonId;
  // public headsetPid: number;
  // public imageTags: { COLOR?: string; FORM_FACTOR?: string };
  // // DFU warnings
  // public dfuWarnings: (DFUError | DFUUserAction)[] = [];
  // public downloading = false;
  // public downloadingCrashFiles = false;
  // public parentDevice: OzDevice;
  // public selectedDevice: OzDevice;
  // public showDfuConfirmModal = false;

  // private tenantId: string;
  // private tenantName: string;

  // private filepath: string;
  // private labels = {
  //   SAVE_LOGS: "",
  //   SAVE_CRASH_REPORTS: "",
  //   SELECT_SOFTWARE_UPDATE: "",
  // };
  // private selectedDevice$ = new BehaviorSubject<OzDevice>(null);
  // private subscriptions = new Subscriptions();

  // public showHardwareRevision = false;
  // public showAdditionalHardwareRevision = false;

  public selectedDevice = toSignal(
    this.deviceManagerService.selectedDeviceRaw$
  );
  public selectedDeviceSettingsSignal = toSignal(
    this.deviceSettingsManagerService.settingsForSelectedDevice$
  );
  /* eslint-disable unicorn/consistent-function-scoping */
  public deviceSoftwareVersionSignal = computed(() => {
    const deviceSettings = this.selectedDeviceSettingsSignal();
    return deviceSettings?.[DEVICE_SETTING_ID_FIRMWARE_VERSION] || undefined;
  });
  public dfuStatusSignal = toSignal(
    this.dfuManagerService.dfuExecutionStatusForSelectedDevice$
  );

  get isCustomDFUEnabled(): boolean {
    return (
      !this.selectedDevice()?.device?.attached ||
      this.selectedDevice()?.device.state?.toLowerCase() === 'dfumode'
    );
  }

  constructor(
    private fileManagerService: FileManagerService,
    private modalService: ModalService,
    private viewContainerReference: ViewContainerRef,
    private deviceManagerService: DeviceManagerService,
    private deviceSettingsManagerService: DeviceSettingsManagerService,
    private detailNavService: DetailNavService,
    private dfuManagerService: DFUManagerService
  ) {}

  selectDFUFile(): void {
    this.fileManagerService
      .selectFile({
        title: 'DEVICE_INFO_LOGS.SELECT_SOFTWARE_UPDATE',
        filters: [
          { name: 'ZIP Files', extensions: ['zip'] },
          { name: 'All Files', extensions: ['*'] },
        ],
      })
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((result) => {
        if (!result.canceled) {
          this._openDFUConfirmModal(result.filePaths[0]);
        }
      });
  }

  private _openDFUConfirmModal(path: string): void {
    this.modalService.create(
      MODAL_ID_DFU_CONFIRM,
      DfuConfirmComponent,
      this.viewContainerReference,
      undefined,
      { device: this.selectedDevice()?.device, path }
    );
  }

  // private getTenant(): void {
  //   this.subscriptions.add(
  //     this.tenantService.tenantId$
  //       .pipe(
  //         switchMap((tenantId) =>
  //           iif(() => !!tenantId, this.tenantService.getTenantInfo(tenantId))
  //         ),
  //         pluck("data", "tenant")
  //       )
  //       .subscribe((tenant) => {
  //         this.tenantId = tenant.id;
  //         this.tenantName = tenant.name;
  //       })
  //   );
  // }

  ngOnInit() {
    this.detailNavService.setDetailNavOptions({
      showDeviceHeading: false,
      showNav: false,
    });

    // // TODO: UI: This is a quick fix: avoid tenant info for "network" deployment.
    // if (this.adminConfig.mode === "cloud") {
    //   this.getTenant();
    // }
    // this.subscriptions.add(
    //   this.route.parent.paramMap
    //     .pipe(
    //       switchMap(
    //         (paramMap: ParamMap) =>
    //           this.deviceManager.getDevice(paramMap.get("id")) // "id" is Device#uniqueId
    //       ),
    //       filter((device) => !!device),
    //       // Map a device into the list of DFU warnings and download logs progress state
    //       // or do nothing if the device is disconnected
    //       switchMap((device: OzDevice) => {
    //         this.device = this.resolveDevice(device); // if a parent device exist, then this would be a child device
    //         if (this.selectedDevice === undefined) {
    //           this.selectedDevice = this.device;
    //         }
    //         this.selectedDevice$.next(this.selectedDevice);
    //         this.headsetPid = this.selectedDevice?.additionalHeadsetInfo?.headsetPID;
    //         this.showHardwareRevision = this.showHwRevision();
    //         this.showAdditionalHardwareRevision = this.showAdditionalHwRevision();
    //         if (!this.selectedDevice.isConnected) {
    //           return of([]);
    //         } else {
    //           return combineLatest([
    //             // [dfuWarnings]
    //             // Listen for the reconnect status of the selected device
    //             this.dfuNeedReconnectService
    //               .getNeedReconnect(this.selectedDevice)
    //               .pipe(
    //                 switchMap((needReconnect: boolean) => {
    //                   return needReconnect
    //                     ? of(["ReplugDevice"])
    //                     : // If device does not need to be reconnected, check for the list of DFU warnings
    //                       this.selectedDevice$.pipe(
    //                         switchMap((device: OzDevice) =>
    //                           this.warnings.poll(device)
    //                         )
    //                       );
    //                 })
    //               ),
    //             // [progress] Save Logs Data
    //             this.saveLogsService.progress(this.selectedDevice?.id),
    //           ]);
    //         }
    //       })
    //     )
    //     .subscribe(([dfuWarnings, progress]: [DFUError[], SaveLogsData]) => {
    //       this.dfuWarnings = dfuWarnings;
    //       this.downloading = progress?.state === "Progress";
    //     })
    // );
    // this.subscriptions.add(
    //   this.selectedDevice$.subscribe((device: OzDevice) => {
    //     if (device.deviceType === DEVICE_TYPE.EARBUDS) {
    //       this.imageTags = { COLOR: "carbon", FORM_FACTOR: "pair" };
    //     } else if (device.deviceType === DEVICE_TYPE.CHARGING_CASE) {
    //       this.imageTags = { COLOR: "carbon" };
    //     } else {
    //       this.imageTags = null;
    //     }
    //   })
    // );
  }

  // getSerialNumber() {
  //   return this.deviceUtils.getSerial(this.selectedDevice);
  // }

  // getCountry() {
  //   return _.get(this.selectedDevice, "videoDeviceStatus.countryRegion", null);
  // }

  // getLensAccount() {
  //   return this.tenantName;
  // }

  // getTenantId() {
  //   return this.tenantId;
  // }

  // getHardwareVersion() {
  //   return _.get(this.selectedDevice, "videoDeviceStatus.versionHW", null);
  // }

  // getMacAddress() {
  //   return _.get(this.selectedDevice, "videoDeviceStatus.mainMacAddress", null);
  // }

  // getIPAddress() {
  //   return _.get(this.selectedDevice, "videoDeviceStatus.mainIpAddress", null);
  // }

  // getDeviceDiagnosticCode() {
  //   return _.get(this.selectedDevice, "videoDeviceStatus.diagnosticCode", null);
  // }

  // onUpload() {
  //   this.stateService.setState("TitleBar", { disabled: true });
  //   remote.dialog
  //     .showOpenDialog(remote.getCurrentWindow(), {
  //       title: this.labels.SELECT_SOFTWARE_UPDATE,
  //       properties: ["openFile"],
  //     })
  //     .then(({ canceled, filePaths }) => {
  //       this.stateService.setState("TitleBar", { disabled: false });
  //       if (!canceled) {
  //         this.filepath = filePaths[0];
  //         this.showDfuConfirmModal = true;
  //       }
  //     });
  // }

  // onDownloadLogs() {
  //   // NOTE: Intentionally skipped these strings for translation for consistency
  //   // So that when a support tech asks for logs, the names are consistent
  //   const defaultPath = path.join(
  //     remote.app.getPath("documents"),
  //     this.selectedDevice
  //       ? `${this.selectedDevice.name} 0x${this.selectedDevice.pid.toString(
  //           16
  //         )} Logs`
  //       : "Poly Device Logs"
  //   );

  //   remote.dialog
  //     .showSaveDialog(remote.getCurrentWindow(), {
  //       title: this.labels.SAVE_LOGS,
  //       defaultPath,
  //       filters: [
  //         { name: "GZ Archive File", extensions: ["gz"] },
  //         { name: "TGZ Archive File", extensions: ["tgz"] },
  //       ],
  //       properties: ["createDirectory"], // [macOS] Allow creating new directories from dialog.
  //     })
  //     .then(({ canceled, filePath }) => {
  //       // If user made selection
  //       if (!canceled && filePath) {
  //         // Start logs downloading
  //         this.saveLogsService.start(this.selectedDevice.id, filePath);
  //       }
  //     });
  // }

  // onDownloadCrashFiles() {
  //   const defaultPath = path.join(
  //     remote.app.getPath("documents"),
  //     this.selectedDevice
  //       ? `${this.selectedDevice.name} Crash Files`
  //       : "Crash Files"
  //   );
  //   remote.dialog
  //     .showSaveDialog(remote.getCurrentWindow(), {
  //       title: this.labels.SAVE_CRASH_REPORTS,
  //       defaultPath,
  //       filters: [{ name: "ZIP File", extensions: ["zip"] }],
  //       properties: ["createDirectory"], // [macOS] Allow creating new directories from dialog.
  //     })
  //     .then(({ canceled, filePath }) => {
  //       // If user made selection
  //       if (!canceled && filePath) {
  //         this.downloadingCrashFiles = true;
  //         const request: GetCrashFilesRequest = {
  //           deviceId: this.device?.id,
  //           fileName: filePath,
  //         };
  //         this.deviceManager
  //           .getCrashFiles(request)
  //           .then((response: GetCrashFilesResponse) => {
  //             if (response.status === "OK" && !!response.path) {
  //               this.toasts.push(CRASH_REPORTS_SUCCESS_TOAST);
  //             } else {
  //               this.toasts.push(CRASH_REPORTS_FAILED_TOAST);
  //             }
  //             this.downloadingCrashFiles = false;
  //           });
  //       }
  //     });
  // }

  // supportDownloadLogs() {
  //   return this.selectedDevice?.featureList.includes(
  //     DEVICE_FEATURES.DEVICE_LOG
  //   );
  // }

  // supportCrashReports() {
  //   return this.selectedDevice?.featureList.includes(
  //     DEVICE_FEATURES.CRASH_REPORTS
  //   );
  // }

  // supportDFU() {
  //   return this.selectedDevice?.featureList.includes(DEVICE_FEATURES.DFU);
  // }

  // onDfuConfirm() {
  //   this.dfuModalService.open({
  //     device: this.selectedDevice,
  //     dfuType: "Local",
  //     archiveLocation: this.filepath,
  //   });
  // }

  // buttonClick(buttonId) {
  //   switch (buttonId) {
  //     case "headset":
  //       this.selectedDevice = this.device;
  //       break;
  //     case "adapter":
  //       this.selectedDevice = this.parentDevice;
  //       break;
  //   }

  //   this.selectedDevice$.next(this.selectedDevice);
  //   this.showHardwareRevision = this.showHwRevision();
  //   this.showAdditionalHardwareRevision = this.showAdditionalHwRevision();
  // }

  // showHwRevision() {
  //   const hwRevision = this.selectedDevice?.manufacturerInfo?.hardwareVersion;
  //   return !!hwRevision.length && !/^prod/i.test("" + hwRevision);
  // }

  // showAdditionalHwRevision() {
  //   const hwRevision = this.selectedDevice?.manufacturerInfo
  //     ?.additionalHardwareVersion;
  //   return !!hwRevision.length && !/^prod/i.test("" + hwRevision);
  // }

  // ngOnDestroy() {
  //   this.subscriptions.unsubscribe();
  // }

  // private resolveDevice(device: OzDevice): OzDevice {
  //   this.parentDevice = device.parent;
  //   return device;
  // }
}
