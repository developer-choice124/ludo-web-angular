import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";

import { ToastrModule } from "ngx-toastr";

import { HeaderModule } from "@ludo/shared/header/header.module";
import { FooterModule } from "@ludo/shared/footer/footer.module";
import { SidebarModule } from "@ludo/shared/sidebar/sidebar.module";
import { AsideModule } from "@ludo/shared/aside/aside.module";
import { LoaderModule } from "@ludo/shared/loader/loader.module";
import { FlashModule } from "@ludo/shared/flash/flash.module";
import { BreadcrumbModule } from "@ludo/shared/breadcrumb/breadcrumb.module";
import { Toaster } from "@ludo/helpers/toast.helper";
import { CommonHelper } from "@ludo/helpers/common.helper";
import { MaterialModule } from '@ludo/material.module';
import { ConfirmDialogComponent } from '@ludo/core/dialog/confirm-dialog/confirm-dialog.component';


@NgModule({

  declarations:[ConfirmDialogComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    ToastrModule.forRoot()
  ],
  exports:[
    HeaderModule,
    FooterModule,
    SidebarModule,
    AsideModule,
    LoaderModule,
    FormsModule,
    FlashModule,
    ReactiveFormsModule,
    BreadcrumbModule,
    HttpClientModule
  ],
  providers:[Toaster, CommonHelper],
  entryComponents:[ConfirmDialogComponent]
})
export class SharedModule {}
