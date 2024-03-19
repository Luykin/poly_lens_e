import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { FileManagerService } from 'src/app/core/services/file-manager.service';
import { LoggingService } from 'src/app/core/services/logging/logging.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';

interface PolySupport {
  tenantId: string;
  userId: string;
  appId: string;
  appVersion: string;
  lensVersion: string;
  lastConnected: string;
}

@Component({
  selector: 'oz-poly-support',
  templateUrl: './poly-support.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PolySupportComponent implements OnInit {
  polySupport: PolySupport = {
    tenantId: '',
    userId: '',
    appId: '',
    appVersion: '',
    lensVersion: '',
    lastConnected: '',
  };
  lensServiceVersionVisibility: boolean = false;

  constructor(
    private fileManagerService: FileManagerService,
    private loggingService: LoggingService
  ) {}

  public ngOnInit(): void {
    this.polySupport.appVersion = UtilityService.getBuild();
  }

  public openSupportPage(): void {
    UtilityService.openExternalBrowser(
      'https://support.hp.com/contact/product/poly-lens-desktop-and-web-app/2101801767/model/2101801770?source=polydropdown'
    );
  }

  public openCommunityPage(): void {
    UtilityService.openExternalBrowser('https://h30434.www3.hp.com/');
  }

  public openDocumentPage(): void {
    UtilityService.openExternalBrowser(
      'https://documents.polycom.com/bundle/poly-lens-da/page/getting-started.html'
    );
  }

  public downloadLogs(): void {
    this.fileManagerService
      .selectFileNameAndLocation({
        title: 'SUPPORT.SAVE_LOGS',
      })
      .pipe(first())
      .subscribe((result) => {
        if (!result.canceled) {
          this.loggingService.saveLogFile(result.filePath!);
        }
      });
  }
}
