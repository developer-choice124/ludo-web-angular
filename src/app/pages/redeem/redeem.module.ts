import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RedeemComponent, RedeemOverviewDialog } from './redeem.component';
import { SharedModule } from '@ludo/shared';
import { MaterialModule } from '@ludo/material.module';
import { Routes, RouterModule } from "@angular/router";
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { NgxMatDrpModule } from 'ngx-mat-daterange-picker';
const routes: Routes = [
  {path:'', component: RedeemComponent,
  data: {
    title: 'Redeem List'
  }}
];
@NgModule({
  declarations: [
    RedeemComponent,
    RedeemOverviewDialog
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    NgxMatDrpModule,
    CommonModule,
    ChartsModule,
    BsDropdownModule,
    SharedModule,
    MaterialModule,
    ButtonsModule,
    RouterModule.forChild(routes)
  ],
  entryComponents:[
    RedeemComponent,
    RedeemOverviewDialog
  ],
})
export class RedeemModule { }
