import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AbnormalDetailsPage } from './abnormal-details';

@NgModule({
  declarations: [
    AbnormalDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(AbnormalDetailsPage),
  ],
})
export class AbnormalDetailsPageModule {}
