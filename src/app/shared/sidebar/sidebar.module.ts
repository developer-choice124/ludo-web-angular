import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@ludo/material.module';
import { SidebarComponent } from './sidebar.component';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { RouterModule } from '@angular/router';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};
import {
  AppSidebarModule,
} from '@coreui/angular';

@NgModule({
  declarations: [SidebarComponent],
  imports: [
    PerfectScrollbarModule,
    RouterModule,
    AppSidebarModule,
    MaterialModule,
    CommonModule
  ],
  exports:[
    SidebarComponent
  ]
})
export class SidebarModule { }
