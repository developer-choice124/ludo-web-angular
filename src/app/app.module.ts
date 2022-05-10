import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '@ludo/shared';
import { CoreModule } from "@ludo/core";
import { DefaultLayoutComponent } from './layouts/containers/default-layout/default-layout.component';
import { P404Component } from './pages/error/404.component';
import { P500Component } from './pages/error/500.component';


import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import {
  AppBreadcrumbModule,
} from '@coreui/angular';

const APP_CONTAINERS = [
  DefaultLayoutComponent
];


// Import 3rd party components
import { LogoutComponent } from './pages/logout/logout.component';

@NgModule({
  declarations: [
    AppComponent,
    LogoutComponent,
    ...APP_CONTAINERS,
    P404Component,
    P500Component,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    AppBreadcrumbModule.forRoot(),
    PerfectScrollbarModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
