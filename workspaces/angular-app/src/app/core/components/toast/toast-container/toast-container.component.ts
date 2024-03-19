import { Component, OnInit, ViewChild } from '@angular/core';
import {
  routeAnimation,
  topNavAnimation,
} from '../../../../shared/animations/router.animations';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'oz-toast-container',
  templateUrl: './toast-container.component.html',
  animations: [routeAnimation, topNavAnimation],
})
export class ToastContainerComponent implements OnInit {
  @ViewChild(ToastContainerDirective, { static: true })
  public toastContainer?: ToastContainerDirective;

  constructor(private toastrService: ToastrService) {}

  public ngOnInit(): void {
    this.toastrService.overlayContainer = this.toastContainer;
  }
}
