import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from "@ludo/shared";
import { LoginComponent } from './login.component';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {path:'', component: LoginComponent}
    ])
  ]
})
export class LoginModule { }
