import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'oz-app-contact-support',
  templateUrl: './app-contact-support.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppContactSupportComponent {
  @Input({ required: true }) type!: string;
  tenantId?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  profile?: any;
  lensServiceVersionVisibility: boolean = false;
  lensServiceVersion?: string;
  appVersion?: string;

  downloadLogs(): void {
    // TODO: Implement
  }
}
