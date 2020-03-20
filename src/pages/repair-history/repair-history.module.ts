import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RepairHistoryPage } from './repair-history';

@NgModule({
  declarations: [
    RepairHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(RepairHistoryPage),
  ],
})
export class RepairHistoryPageModule {}
