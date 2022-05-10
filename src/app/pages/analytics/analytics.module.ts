import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsComponent, PlayersOverviewDialog } from './analytics.component';
import { Routes, RouterModule } from "@angular/router";

import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { SharedModule } from '@ludo/shared';
import { MaterialModule } from '@ludo/material.module';
import { NgxMatDrpModule } from 'ngx-mat-daterange-picker';

const routes: Routes = [
  {
    path: '',
    component: AnalyticsComponent,
    data: {
      title: 'Analytics'
    }
  }
];
@NgModule({
  declarations: [
    AnalyticsComponent,
    PlayersOverviewDialog,
  ],
  imports: [
    NgxMatDrpModule,
    CommonModule,
    ChartsModule,
    BsDropdownModule,
    SharedModule,
    MaterialModule,
    ButtonsModule,
    RouterModule.forChild(routes)
  ],
  providers:[
  ],
  entryComponents:[
    AnalyticsComponent,
    PlayersOverviewDialog,
  ],
})
export class AnalyticsModule { }
