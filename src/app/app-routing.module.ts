import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from "@ludo/helpers/auth.guard";
import { DefaultLayoutComponent } from './layouts/containers/default-layout/default-layout.component';
import { P404Component } from './pages/error/404.component';
import { P500Component } from './pages/error/500.component';
import { LogoutComponent } from './pages/logout/logout.component';


const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  // {
  //   path:'dashboard',
  //   loadChildren : () => import('@ludo/pages/dashboard/dashboard.module').then(m=>m.DashboardModule),
  //   canActivate : [AuthGuard]
  // },

  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'home',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: '',
        loadChildren: () => import('@ludo/pages/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path:'reset',
        loadChildren : () => import('@ludo/pages/reset/reset.module').then(m=>m.ResetModule)
      },
      {
        path:'room',
        loadChildren : () => import('@ludo/pages/roomcoins/roomcoins.module').then(m=>m.RoomcoinsModule)
      },
      {
        path:'analytics',
        loadChildren : () => import('@ludo/pages/analytics/analytics.module').then(m=>m.AnalyticsModule)
      },
      {
        path:'botanalytics',
        loadChildren : () => import('@ludo/pages/botanalytics/botanalytics.module').then(m=>m.BotanalyticsModule)
      },
      {
        path:'buy',
        loadChildren : () => import('@ludo/pages/buycoins/buycoins.module').then(m=>m.BuycoinsModule)
      },
      {
        path:'update',
        loadChildren : () => import('@ludo/pages/appupdate/appupdate.module').then(m=>m.AppupdateModule)
      },
      {
        path:'redeem',
        loadChildren : () => import('@ludo/pages/redeem/redeem.module').then(m=>m.RedeemModule)
      },
      {
        path:'refer',
        loadChildren : () => import('@ludo/pages/referred/referred.module').then(m=>m.ReferredModule)
      },
      {
        path:'logout',
        component: LogoutComponent,
      },
      {
        path: '**',
        component: P404Component
      },
    ],
    canActivate : [AuthGuard]
  },
  {
    path:'login',
    loadChildren : () => import('@ludo/pages/login/login.module').then(m=>m.LoginModule)
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[]
})
export class AppRoutingModule { }
