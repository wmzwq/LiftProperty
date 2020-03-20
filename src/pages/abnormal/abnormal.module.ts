import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AbnormalPage } from './abnormal';

@NgModule({
  declarations: [
    AbnormalPage,
  ],
  imports: [
    IonicPageModule.forChild(AbnormalPage),
  ],
})
export class AbnormalPageModule {}
