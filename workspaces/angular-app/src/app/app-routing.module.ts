import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AppLayoutComponent } from './core/components/app-layout/app-layout.component';
import { DeviceMenuComponent } from './core/components/device-menu/device-menu.component';
import { HomeComponent } from './core/components/home/home.component';
import { LensSettingsComponent } from './core/components/lens-settings/lens-settings.component';
import { DeviceOverviewComponent } from './features/device-overview/device-overview.component';
import { DeviceSettingsComponent } from './features/device-settings/device-settings.component';
import { DeviceSupportComponent } from './features/device-support/device-support.component';
import { DeviceInfoAndLogsComponent } from './features/device-info-and-logs/device-info-and-logs.component';
import { ContactSupportComponent } from './features/contact-support/contact-support.component';
import { ROUTE_HOME } from './utilities/constants';
import { PolySupportComponent } from './features/poly-support/poly-support.component';

interface OzRoute extends Route {
  data?: {
    animation?: 'OtherPage' | 'HomePage' | 'SubPage';
    background?: 'ocean';
    deviceDetails?: boolean;
    navIndex?: number;
    childAnimation?: 'SubPage' | 'OtherSubPage';
    titleBar?: 'TitleBarRouteData';
    children?: OzRoutes;
  };
}

type OzRoutes = Array<OzRoute>;

const routes: OzRoutes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: ROUTE_HOME,
        component: HomeComponent,
        data: {
          animation: 'HomePage',
          background: 'ocean',
        },
      },
      {
        path: 'detail/:id',
        component: DeviceMenuComponent,
        data: {
          animation: 'OtherPage',
          deviceDetails: true,
          cssClass: 'device-menu',
        },
        children: [
          {
            path: 'overview',
            component: DeviceOverviewComponent,
            data: {
              navIndex: 0,
            },
          },
          {
            path: 'settings',
            component: DeviceSettingsComponent,
            data: {
              navIndex: 1,
            },
          },
          {
            path: 'support',
            component: DeviceSupportComponent,
            data: {
              animation: 'SubPage',
              navIndex: 6,
            },
          },
          {
            path: 'device-info-and-logs',
            component: DeviceInfoAndLogsComponent,
            data: {
              navIndex: 7,
              titleBar: {
                back: { labelKey: 'DETAIL.SUPPORT', goBack: true },
              },
              cssClass: 'device-info-and-logs',
            },
          },
          {
            path: 'contact-support',
            component: ContactSupportComponent,
            data: {
              navIndex: 8,
              titleBar: {
                back: { labelKey: 'DETAIL.SUPPORT', goBack: true },
              },
              cssClass: 'contact-support',
            },
          },
        ],
      },
      {
        path: 'poly-support',
        component: PolySupportComponent,
        data: {
          animation: 'OtherPage',
        },
      },
      {
        path: 'settings',
        component: LensSettingsComponent,
        data: {
          animation: 'OtherPage',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
