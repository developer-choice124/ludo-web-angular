import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";
import { RoomcoinslistComponent } from './roomcoinslist/roomcoinslist.component';
import { PostroomcoinsComponent } from './postroomcoins/postroomcoins.component';
import { MaterialModule } from '@ludo/material.module';

import { SharedModule } from "@ludo/shared";
const routes: Routes = [
  {path: '', redirectTo: 'room-coin-list', pathMatch: 'full'},
  {
    path: 'post-room-coins',
    component: PostroomcoinsComponent,
    data: {
      title: 'Create Room Coins'
    }
  },
  {
    path: 'room-coin-list' ,
    component: RoomcoinslistComponent,
    data: {
      title: 'Room Coins List'
    }
  }
];

@NgModule({
  declarations: [
    RoomcoinslistComponent,
    PostroomcoinsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ],
})
export class RoomcoinsModule { }
