// Copyright 2009, 2020, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DetailNavService } from 'src/app/core/services/detail-nav/detail-nav.service';
import { SUPPORT_EMAIL, contactSupportType } from 'src/app/utilities/constants';

@Component({
  selector: 'app-contact-support',
  templateUrl: './contact-support.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactSupportComponent implements OnInit {
  private _destroyRef = inject(DestroyRef);
  appId?: string;
  type: string = '';
  supportEmail = SUPPORT_EMAIL;

  constructor(
    private route: ActivatedRoute,
    private detailNavService: DetailNavService
  ) {}

  ngOnInit(): void {
    // Hide the detail nav
    this.detailNavService.setDetailNavOptions({
      showDeviceHeading: false,
    });

    this.route.parent?.paramMap
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((parameterMap: ParamMap) => {
        const parameterId = parameterMap.get('id')?.toString();
        this.type =
          parameterId === contactSupportType.APP
            ? contactSupportType.APP
            : contactSupportType.DEVICE;
      });
  }
}
