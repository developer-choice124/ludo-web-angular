import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';


import {
  AppFooterModule,
} from '@coreui/angular';

@NgModule({
  declarations: [FooterComponent],
  imports: [
    AppFooterModule,
    CommonModule
  ],
  exports:[
    FooterComponent,
  ]
})
export class FooterModule { }
