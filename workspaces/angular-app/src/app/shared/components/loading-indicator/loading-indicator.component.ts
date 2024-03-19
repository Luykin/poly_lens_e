import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'oz-loading-indicator',
  templateUrl: './loading-indicator.component.html',
})
export class LoadingIndicatorComponent implements OnInit {
  @Input() titleKey: string = '';
  @Input() color: string = 'black';

  constructor() {}

  ngOnInit(): void {}
}
