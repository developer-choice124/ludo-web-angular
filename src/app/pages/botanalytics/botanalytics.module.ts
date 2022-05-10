import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BotanalyticsComponent, BotPlayersOverviewDialog } from './botanalytics.component';
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
    component: BotanalyticsComponent,
    data: {
      title: 'Botanalytics'
    }
  }
];
@NgModule({
  declarations: [
    BotanalyticsComponent,
    BotPlayersOverviewDialog,
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
    BotanalyticsComponent,
    BotPlayersOverviewDialog,
  ],
})
export class BotanalyticsModule { }
