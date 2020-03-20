import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MaintenanceHistoryPage } from './maintenance-history';

@NgModule({
  declarations: [
    MaintenanceHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(MaintenanceHistoryPage),
  ],
})
export class MaintenanceHistoryPageModule {}
