// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'oz-badge',
  templateUrl: './badge.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BadgeComponent implements OnInit {
  @Input('count') count: number = 0;
  @Input('className') className?: string;

  constructor() {}

  ngOnInit(): void {}
}
