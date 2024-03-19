// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

import { Component, OnInit, DestroyRef, inject } from '@angular/core';
import { ActivatedRoute, Data, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, mergeMap, pairwise, startWith } from 'rxjs/operators';
import { subRouteAnimation } from '../../animations/router.animations';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

interface IRouterChange {
  value: number;
  params: {
    offsetEnter: number;
    offsetLeave: number;
  };
}

@Component({
  selector: 'oz-animated-router-outlet',
  templateUrl: './animated-router-outlet.component.html',
  animations: [subRouteAnimation],
})
export class AnimatedRouterOutletComponent implements OnInit {
  destroyRef = inject(DestroyRef);

  private readonly navIndexKey: string = 'navIndex';
  private routeChange$ = new BehaviorSubject<number>(0);

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.handleRouterEvents();
  }

  handleRouterEvents(): void {
    this.router.events
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        filter((event) => event instanceof NavigationEnd),
        map(() => this.route),
        map((route: ActivatedRoute) => {
          while (route.firstChild) route = route.firstChild;
          return route;
        }),
        filter((route: ActivatedRoute) => route.outlet === 'primary'),
        mergeMap((route: ActivatedRoute) => route.data)
      )
      .subscribe((data: Data) => this.updateRoute(data));
  }

  updateRoute(data: Data): void {
    if (!(this.navIndexKey in data)) {
      return;
    }

    this.routeChange$.next(data.navIndex);
  }

  get routeTrigger$(): Observable<IRouterChange> {
    return this.routeChange$.pipe(
      startWith(0),
      pairwise(),
      map(([previous, current]) => {
        return {
          value: current,
          params: {
            offsetEnter: previous > current ? -100 : 100,
            offsetLeave: previous > current ? 100 : -100,
          },
        };
      })
    );
  }
}
