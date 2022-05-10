import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";
import { SafePipe } from '@ludo/helpers/safeURL.helper';


import { DashboardComponent } from './dashboard.component';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { SharedModule } from '@ludo/shared';
import { MaterialModule } from '@ludo/material.module';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    data: {
      title: 'Dashboard'
    }
  }
];
@NgModule({
  declarations: [
    DashboardComponent,
    SafePipe,
  ],
  imports: [
    CommonModule,
    ChartsModule,
    BsDropdownModule,
    SharedModule,
    MaterialModule,
    ButtonsModule,
    RouterModule.forChild(routes)
  ],
  providers:[
  ]
})
export class DashboardModule { }
