import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@ludo/material.module';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import {
  AppHeaderModule,
} from '@coreui/angular';
@NgModule({
  declarations: [HeaderComponent],
  imports: [
    AppHeaderModule,
    BsDropdownModule,
    RouterModule,
    MaterialModule,
    CommonModule
  ],
  exports:[
    HeaderComponent
  ]
})
export class HeaderModule {}
