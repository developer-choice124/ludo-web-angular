import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuycoinslistComponent } from './buycoinslist/buycoinslist.component';
import { PostbuycoinsComponent } from './postbuycoins/postbuycoins.component';
import { SharedModule } from '@ludo/shared';
import { MaterialModule } from '@ludo/material.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'buy-coin-list', pathMatch: 'full' },
  {
    path: 'post-buy-coins',
    component: PostbuycoinsComponent,
    data: {
      title: 'Create Buy Coins'
    }
  },
  {
    path: 'buy-coin-list',
    component: BuycoinslistComponent,
    data: {
      title: 'Buy Coins List'
    }
  }
];



@NgModule({
  declarations: [BuycoinslistComponent, PostbuycoinsComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ]
})
export class BuycoinsModule { }
