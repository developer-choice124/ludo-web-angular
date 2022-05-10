import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthService } from "@ludo/core/auth/auth.service";
import { LogService } from "@ludo/core/log/log.service";
import { CommonService } from "./common/common.service";

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers:[
    AuthService,
    LogService,
    CommonService
  ]
})
export class CoreModule { }
