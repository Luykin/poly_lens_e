# Introduction

In 2023, Lens Desktop version 2.0 was started as a rewrite of the Lens Desktop
user interface. At a high level, this was done because the paradigm shifted to using
Lens Control Service to encapsulate device interactions, business logic and most
cloud communications.

This document is a summary of what has changed from Lens Desktop 1.x to 2.x, what is
staying the same and anti-patterns to avoid.

## Services

V1 had a lot of services. Some are going away due to LCS. Documentation for each service is
(or should be) in the service code, but below is a tracker for migration notes to help steer
LD 1.x developers in the right direction - and keep LD 2.x aware of all the service
changes.

Actions labeled `LCS` indicates this functionality has or will be moved to LCS.

| Service Name                              | Action   | Migration Notes                                                                                                                                                                                                                                   |
| ----------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| device.messaging folder                   | LCS      | IoT messaging (e.g. Device Info State, Device Info Update) is the responsibility of LCS.                                                                                                                                                          |
| hub-native-service folder                 | LCS      | LCS will perform device communications.                                                                                                                                                                                                           |
| lens-control-service folder               | Rebuilt  | Moved to lcs-client-manager folder                                                                                                                                                                                                                |
| repository folder                         | TBD      |                                                                                                                                                                                                                                                   |
| accessor.service.ts                       | TBD      |                                                                                                                                                                                                                                                   |
| acoustic-events.service.ts                | TBD      |                                                                                                                                                                                                                                                   |
| admin-config.service.ts                   | Migrated | At this point, display link logic is planned to be in LCS.                                                                                                                                                                                        |
| auth.loginless.service.ts                 | TBD      |                                                                                                                                                                                                                                                   |
| auth.service.native.ts                    | TBD      |                                                                                                                                                                                                                                                   |
| auth.service.ts                           | TBD      |                                                                                                                                                                                                                                                   |
| badge-count.service.ts                    | TBD      |                                                                                                                                                                                                                                                   |
| bluetooth.service.ts                      | TBD      |                                                                                                                                                                                                                                                   |
| bricked-device.service.ts                 | TBD      |                                                                                                                                                                                                                                                   |
| c10-setting-mapping.service.ts            | TBD      |                                                                                                                                                                                                                                                   |
| call.events.service.ts                    | TBD      |                                                                                                                                                                                                                                                   |
| charging-notifications.service.ts         | TBD      |                                                                                                                                                                                                                                                   |
| config.service.ts                         | TBD      |                                                                                                                                                                                                                                                   |
| detail-nav.service.ts                     | TBD      |                                                                                                                                                                                                                                                   |
| device.event.service.ts                   | TBD      |                                                                                                                                                                                                                                                   |
| device-manager.service.ts                 | Rebuilt  |                                                                                                                                                                                                                                                   |
| device-manager-mock.service.ts            | TBD      |                                                                                                                                                                                                                                                   |
| device-notification.service.ts            | TBD      |                                                                                                                                                                                                                                                   |
| device-policy.service.ts                  | TBD      |                                                                                                                                                                                                                                                   |
| device-resource.service.ts                | TBD      |                                                                                                                                                                                                                                                   |
| dfu.service.ts                            | TBD      |                                                                                                                                                                                                                                                   |
| dfu-badge-counter.service.ts              | TBD      |                                                                                                                                                                                                                                                   |
| dfu-modal.service.ts                      | TBD      |                                                                                                                                                                                                                                                   |
| dfu-need-reconnect.service.ts             | TBD      |                                                                                                                                                                                                                                                   |
| dfu-notifications.service.ts              | TBD      |                                                                                                                                                                                                                                                   |
| dfu-warnings.service.ts                   | TBD      |                                                                                                                                                                                                                                                   |
| disconnected-notifications.service.ts     | TBD      |                                                                                                                                                                                                                                                   |
| eula.service.ts                           | TBD      |                                                                                                                                                                                                                                                   |
| favorites.service.ts                      | TBD      |                                                                                                                                                                                                                                                   |
| file-dialog.service.ts                    | TBD      |                                                                                                                                                                                                                                                   |
| file-download.service.ts                  | TBD      |                                                                                                                                                                                                                                                   |
| file-system.service.ts                    | TBD      |                                                                                                                                                                                                                                                   |
| iot.data.service.ts                       | TBD      |                                                                                                                                                                                                                                                   |
| iot.device.info.service.ts                | TBD      |                                                                                                                                                                                                                                                   |
| iot.service.ts                            | TBD      |                                                                                                                                                                                                                                                   |
| iot-dps-service.ts                        | TBD      |                                                                                                                                                                                                                                                   |
| ip-reporter.service.ts                    | TBD      |                                                                                                                                                                                                                                                   |
| ipc.service.ts                            | TBD      |                                                                                                                                                                                                                                                   |
| lens.desktop.capabilities.service.ts      | TBD      |                                                                                                                                                                                                                                                   |
| lens-app-in-call.service.ts               | TBD      |                                                                                                                                                                                                                                                   |
| lens-policy.service.ts                    | TBD      |                                                                                                                                                                                                                                                   |
| lens-settings.service.ts                  | TBD      |                                                                                                                                                                                                                                                   |
| loggedin-devices.service.ts               | TBD      |                                                                                                                                                                                                                                                   |
| logging.service.ts                        | TBD      |                                                                                                                                                                                                                                                   |
| low-battery-notifications.service.ts      | TBD      |                                                                                                                                                                                                                                                   |
| mute-notifications.service.ts             | TBD      |                                                                                                                                                                                                                                                   |
| mute-reminder-notifications.service.ts    | TBD      |                                                                                                                                                                                                                                                   |
| network-connectivity.service.ts           | TBD      |                                                                                                                                                                                                                                                   |
| network-speed-test.service.ts             | TBD      |                                                                                                                                                                                                                                                   |
| notifications.service.ts                  | TBD      |                                                                                                                                                                                                                                                   |
| os.service.ts                             | TBD      |                                                                                                                                                                                                                                                   |
| product.catalog.service.ts                | LCS      | LCS now handles simple product catalog data, @help https://hp-jira.external.hp.com/browse/LENS-18333.                                                                                                                                             |
| provisioning-devices-details.service.ts   | TBD      |                                                                                                                                                                                                                                                   |
| provisioning-server.service.ts            | TBD      |                                                                                                                                                                                                                                                   |
| qd-notifications.service.ts               | TBD      |                                                                                                                                                                                                                                                   |
| reconnect-device-events.service.ts        | TBD      |                                                                                                                                                                                                                                                   |
| remote.service.ts                         | Migrated | The only method from this has been migrated to UtilityService.                                                                                                                                                                                    |
| save-logs-service.ts                      | TBD      |                                                                                                                                                                                                                                                   |
| soundscape.service.ts                     | TBD      |                                                                                                                                                                                                                                                   |
| state.service.ts                          | Rebuilt  | See new state service for docs and new patterns.                                                                                                                                                                                                  |
| storage.service.ts                        | Rebuilt  | Changes to the state service `session` entity persists to local storage. Local storage is not used directly by app. <br/>Saving and rehydrating from a JSON file is likely unnecessary (1.x), so this is not implemented unless proven necessary. |
| sw-update-notifications.service.ts        | TBD      |                                                                                                                                                                                                                                                   |
| tenant.service.ts                         | TBD      |                                                                                                                                                                                                                                                   |
| tray.service.ts                           | TBD      |                                                                                                                                                                                                                                                   |
| user.service.ts                           | TBD      |                                                                                                                                                                                                                                                   |
| utility.service.ts                        | Migrated | Methods can be migrated as needed. getNativeVersion method removed.                                                                                                                                                                               |
| wifi.service.ts                           | TBD      |                                                                                                                                                                                                                                                   |
| windows-events.service.ts                 | TBD      |                                                                                                                                                                                                                                                   |
| zoo-entity-state-pusher.service.ts        | TBD      |                                                                                                                                                                                                                                                   |
| zoom-end-meeting-notifications.service.ts | TBD      |                                                                                                                                                                                                                                                   |

## Utils

These Utils (short for utilities) are in the LD 1.x utils folder. LD 2.x places these in the "utilities" folder.

| Util Name                  | Action             | Migration Notes                                                                                                   |
| -------------------------- | ------------------ | ----------------------------------------------------------------------------------------------------------------- |
| apollo-mock.utils.ts       | TBD                | Waiting to see if necessary. Some GraphQL queries like topicIndicators will be retrieved directly from the cloud. |
| constants.ts               | Migrated           |                                                                                                                   |
| countries.ts               | TBD                |                                                                                                                   |
| device.utils.ts            | TBD                |                                                                                                                   |
| element.spec-helper.ts     | TBD                |                                                                                                                   |
| hydrationAndVisionUtils.ts | TBD                |                                                                                                                   |
| registry.utils.ts          | Migrated           | Helpful for Windows registry interaction. Moved to registry.service.ts                                            |
| restoreDefaultsUtils.ts    | TBD                |                                                                                                                   |
| rxjs.utils.ts              | TBD                |                                                                                                                   |
| subscriptions.ts           | TBD                |                                                                                                                   |
| test.utils.ts              | Partially Migrated | Some functions moved to mock-providers.ts, others will move if needed.                                            |
| user.data.ts               | TBD                |                                                                                                                   |
| utils.ts                   | Migrated           | Necessary functions should migrate to UtilityService.                                                             |
| wifiUtils.ts               | TBD                |                                                                                                                   |

## Deprecated Packages

- ngx-electron - now archived and read-only on GitHub and should not be used

## Anti-patterns

### Using @electron/remote in renderer

In LD 1.x, the `@electron/remote` package was used to access various node functions from the renderer,
such as `remote.app.getAppPath()`. However, [there are problems](https://github.com/electron/remote?tab=readme-ov-file)
with this approach. [This article](https://nornagon.medium.com/electrons-remote-module-considered-harmful-70d69500f31)
explains more why this is an anti-pattern and companies like Slack, a leader in Electron at scale, have abandoned this.

Instead of:
`import * as remote from '@electron/remote';`

Use a pattern like this:

```TypeScript
// window.ts method such as _handleCommon
ipcMain.handle('read-file', async (event, path) => {
  if (!pathIsOK(path)) {
    throw new Error('forbidden');
  }

  return await fs.promises.readFile(path)
})
// Renderer
const data = await ipcRenderer.invoke('read-file', '/path/to/file')
// ... do something with data ...
```

### The implements pattern

In LD 1.x, there is a pattern of creating a service that implements an interface or uses
a class, e.g. "ILoggingService". Good reasons for doing this are that there are multiple
implementations of the interface.

However, if there is only one implementation of the interface, this is unnecessary and leads
to an unnecessary layer of misdirection in the IDE. In LD 2.x, type in the service directly
if there is only one implementation.

Old:

```typescript
export interface INewService {
  start(path: string): void;
  stop(path: string): void;
}

export class NewService implements INewService {
  start(path: string) {
    // ...
  }

  stop(path: string) {
    // ...
  }
}
```

New:

```typescript
export class NewService {
  start(path: string): void {
    // ...
  }

  stop(path: string): void {
    // ...
  }
}
```

## New modals approach

In LD 1.x, the modals were created with a simple `oz-modal` and then we passed there our content e.g. `oz-dfu-confirm`. By changing the `show` property, we showed or hid a specific modal.

In LD 2.x we changed the approach for modals and we are creating them on a specific action e.g. when
user click a button. The new modal kept old functionality and animations. We also can reuse the previous templates for modals from LD 1.x.

Old:

```pug
oz-modal([show]="showDfuConfirmModal")
  oz-dfu-confirm([device]="device", (confirm)="showDfuConfirmModal=false; onDfuConfirm()", (cancel)="showDfuConfirmModal=false")
```

New:

A simple example how to open modal from the component by e.g. button click

```ts
this.modalService.create(
  `uniqueModalId`,
  MyComponent,
  this.viewContainerReference,
  { customClass: 'wide' },
  { name: 'test' }
);
```

As you can see we are passing few properties.

- `id` - unique modal id
- `content` - a component which we want to show
- `viewContainerReference` - place where modal should be created (in body)
- `options` - modal options, in the example we pass a `wide` class which changing our modal size
- `data` - information that we want to pass for current modal

The modal body which we want to inject into `ngx-smart-modal`.

```html
<div class="mb-25">
  <h1>{{ 'DFU.SOFTWARE_UPDATE' | translate }}</h1>
  <p class="text-left mb-1">{{ 'DFU.UPDATE_WARNING_1' | translate }}</p>
  <p
    class="text-left"
    [innerHTML]="'DFU.UPDATE_WARNING_2' | translate : { open_tag: '<b>', close_tag: '</b>'}"
  ></p>
</div>

<div class="text-right">
  <button class="btn mr-1" (click)="close()">
    {{ 'GENERAL.CANCEL' | translate }}
  </button>
  <button class="btn btn-primary" (click)="confirm()">
    {{ 'GENERAL.OK' | translate }}
  </button>
</div>
```

A simple example how to close or get data for current modal

```ts
@Component({
  templateUrl: './dfu-confirm.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DfuConfirmComponent {
  private readonly _modalId = 'dfuConfirm';

  constructor(private ngxSmartModalService: NgxSmartModalService) {}

  public close(): void {
    this.ngxSmartModalService.close(this._modalId);
  }

  public confirm(): void {
    const data = this.ngxSmartModalService.getModalData(this._modalId);

    this.close();

    // Send an update to LCS
    // ...
  }
}
```

## New accordion approach

In LD 1.x, the accordion was created as a one big chunk of code with all possible categories inside of him and they were shown on a specific view (device settings/app settings).

In LD 2.x we changed the approach for accordion and we are creating it with any components (items) you would like to display on the specific page.

Old:

```pug
.accordion(*ngFor="let category of categories; index as i")
  .grid.accordion-title((click)="toggleAccordion(i)", [id]='category.title + "_container"', [class.has-badge]="!!badgeCounts[category.title]", [class.disabled]="category.disabled")
    .col-8(*ngIf="!isDeviceSettings", [id]='category.title + "_label"') {{ "SETTINGS." + category.title + ".TITLE" | translate }}
    .col-8(*ngIf="isDeviceSettings") {{"DeviceSettingsCategories." + category.title | translate}}
    .col-4.text-right
      img.text-right.va-middle(*ngIf="!category.open", src="./assets/icons/down_arrow.svg", width="16px", height="16px", [id]='category.title + "_down_arrow"')
      img.text-right.va-middle(*ngIf="category.open", src="./assets/icons/up_arrow.svg", width="16px", height="16px", [id]='category.title + "_up_arrow"')
    oz-badge(className="accordion", [count]="badgeCounts[category.title]")
  .accordion-group(
    *ngIf="category.open && (isDeviceSettings ? settingsWithoutAudio.length : category.items.length)",
    @accordionCategoryAnimationOpen,
    [@accordionCategoryAnimationClose]="animateCloseCategory ? 'closed' : 'open'")
    .accordion-item(*ngFor="let item of (isDeviceSettings ? settingsWithoutAudio : category.items)")
      oz-lens-settings-account(*ngIf="accordionType.account === item.type", [accordionData]="item")
      oz-lens-settings-softphone(*ngIf="accordionType.softphone === item.type", [accordionData]="item")
      oz-lens-settings-notifications(*ngIf="accordionType.notifications === item.type", [accordionData]="item")
      oz-lens-settings-software-update(*ngIf="accordionType.softwareUpdate === item.type", [accordionData]="item")
      oz-lens-settings-language(*ngIf="accordionType.language === item.type")
      oz-lens-settings-about(*ngIf="accordionType.about === item.type")
      oz-device-setting(*ngIf="accordionType.deviceSetting === item.type", [accordionData]="item")
      oz-device-language(*ngIf="accordionType.deviceLanguage === item.type", [accordionData]="item")
      oz-device-admin-settings(*ngIf="accordionType.deviceAdmin === item.type", [accordionData]="item")
      oz-lens-app-settings(*ngIf="accordionType.appSettings === item.type", [accordionData]="item")
      oz-audio-test(*ngIf="accordionType.audioTest === item.type")
      oz-device-disconnect(*ngIf="accordionType.deviceQuickDisconnect === item.type")
      oz-device-keeplinkup(*ngIf="accordionType.keepLinkUp === item.type")
      oz-software-settings(*ngIf="accordionType.softwareSettings === item.type")
```

New:

```html
<oz-accordion>
  <oz-accordion-item title="Title one">
    <ng-template ozAccordionContent>
      <div class="accordion-item">
        <p>Accordion item 1</p>
      </div>
    </ng-template>
  </oz-accordion-item>
  <oz-accordion-item title="Title two">
    <ng-template ozAccordionContent>
      <div class="accordion-item">
        <p>Accordion item 2</p>
      </div>
    </ng-template>
  </oz-accordion-item>
</oz-accordion>
```

For more details go to [readme](workspaces\angular-app\src\app\shared\components\accordion\readme.md) file inside accordion folder.
