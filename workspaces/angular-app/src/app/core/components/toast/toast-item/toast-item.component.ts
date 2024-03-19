import { Component } from '@angular/core';
import {
  routeAnimation,
  topNavAnimation,
} from '../../../../shared/animations/router.animations';
import { Toast } from 'ngx-toastr';

@Component({
  selector: 'oz-toast-item',
  templateUrl: './toast-item.component.html',
  animations: [routeAnimation, topNavAnimation],
})
export class ToastItemComponent extends Toast {}
