import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResetComponent } from './reset.component';

import { SharedModule } from "@ludo/shared";
import { RouterModule } from '@angular/router';

import { MaterialModule } from '@ludo/material.module';

@NgModule({
  declarations: [ResetComponent],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    RouterModule.forChild([
      {path:'', component: ResetComponent,
      data: {
        title: 'Reset Password'
      }}
    ])
  ]
})
export class ResetModule { }
