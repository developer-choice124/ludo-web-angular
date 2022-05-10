import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateappupdateComponent } from './createappupdate/createappupdate.component';
import { AppupdatelistComponent } from './appupdatelist/appupdatelist.component';
import { SharedModule } from '@ludo/shared';
import { MaterialModule } from '@ludo/material.module';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: 'create-app-update', pathMatch: 'full' },
  {
    path: 'create-app-update',
    component: CreateappupdateComponent,
    data: {
      title: 'Create App Update'
    }
  },
  {
    path: 'app-update-list',
    component: AppupdatelistComponent,
    data: {
      title: 'App Update List'
    }
  }
];

@NgModule({
  declarations: [CreateappupdateComponent, AppupdatelistComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ]
})
export class AppupdateModule { }
