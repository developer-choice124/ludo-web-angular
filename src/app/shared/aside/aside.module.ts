import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsideComponent } from './aside.component';
import { RouterModule } from "@angular/router";
import { MaterialModule } from '@ludo/material.module';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';

import {
  AppAsideModule,
} from '@coreui/angular';

@NgModule({
  declarations: [AsideComponent],
  imports: [
    MaterialModule,
    RouterModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    AppAsideModule,
    CommonModule
  ],
  exports: [
    AsideComponent
  ]
})
export class AsideModule { }
