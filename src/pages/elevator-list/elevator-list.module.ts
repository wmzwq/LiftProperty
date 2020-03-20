import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ElevatorListPage } from './elevator-list';

@NgModule({
  declarations: [
    ElevatorListPage,
  ],
  imports: [
    IonicPageModule.forChild(ElevatorListPage),
  ],
})
export class ElevatorListPageModule {}
