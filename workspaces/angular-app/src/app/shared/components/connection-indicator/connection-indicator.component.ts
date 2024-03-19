import { Component, Input } from '@angular/core';

@Component({
  selector: 'oz-connection-indicator',
  templateUrl: './connection-indicator.component.html',
})
export class ConnectionIndicatorComponent {
  @Input({ required: true }) connected!: boolean;
  @Input({ required: true }) supported!: boolean;

  constructor() {}
}
