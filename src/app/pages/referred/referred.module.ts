import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReferredComponent } from './referred.component';
import { MaterialModule } from '@ludo/material.module';
import { SharedModule } from '@ludo/shared';
import { Routes, RouterModule } from "@angular/router";
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { NgxMatDrpModule } from 'ngx-mat-daterange-picker';

const routes: Routes = [
  {path:'', component: ReferredComponent,
  data: {
    title: 'Referred List'
  }}
];

@NgModule({
  declarations: [ReferredComponent],
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
    RouterModule.forChild(routes),
  ]
})
export class ReferredModule { }
