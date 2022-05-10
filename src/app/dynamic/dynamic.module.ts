import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateBannerComponent } from './update-banner/update-banner.component';



@NgModule({
  declarations: [UpdateBannerComponent],
  imports: [
    CommonModule
  ],
  entryComponents:[UpdateBannerComponent]
})
export class DynamicModule { }
