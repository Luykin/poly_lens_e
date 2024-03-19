import { Component, OnInit, Input } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterOutlet,
} from '@angular/router';
import { filter, map, startWith, switchMap } from 'rxjs/operators';

import {
  routeAnimation,
  topNavAnimation,
} from '../../../shared/animations/router.animations';
import { UtilityService } from '../../services/utility/utility.service';
import { FEEDBACK_FORM_URL } from 'src/app/utilities/constants';

@Component({
  selector: 'app-layout',
  templateUrl: './app-layout.component.html',
  animations: [routeAnimation, topNavAnimation],
})
export class AppLayoutComponent implements OnInit {
  @Input('className') className = '';

  public background?: string;
  public deviceDetails?: boolean;
  public classes: string[] = [];

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter((event) => {
          return event instanceof NavigationEnd;
        }),
        startWith(this.activatedRoute),
        map(() => this.activatedRoute),
        map((route) => {
          this.classes = [];
          while (route.firstChild) {
            this.parseComponentName(route);
            route = route.firstChild;
          }

          this.parseComponentName(route);

          return route;
        }),
        filter((route) => route.outlet === 'primary'),
        switchMap((route) => route.data)
      )
      .subscribe((event) => {
        this.background = event?.background;
      });
  }

  /**
   * The css class is pulled from the route data object defined in
   * app-routing.module
   *
   * The classes "stack" for nested routes.
   * eg. "device-menu" and "device-info-and-logs" classes would
   * both be applied to the main-content container.
   */
  parseComponentName(route: ActivatedRoute): void {
    const cssClass = route.routeConfig?.data?.cssClass;
    if (cssClass) {
      this.classes.push(cssClass);
    }
  }

  prepareRouteAnimation(outlet: RouterOutlet) {
    return (
      outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation
    );
  }

  openFeedbackForm(): void {
    UtilityService.openExternalBrowser(FEEDBACK_FORM_URL);
  }
}
