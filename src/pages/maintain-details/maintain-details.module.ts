import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MaintainDetailsPage } from './maintain-details';

@NgModule({
  declarations: [
    MaintainDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(MaintainDetailsPage),
  ],
})
export class MaintainDetailsPageModule {}
