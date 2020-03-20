import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AbnormalListPage } from './abnormal-list';

@NgModule({
  declarations: [
    AbnormalListPage,
  ],
  imports: [
    IonicPageModule.forChild(AbnormalListPage),
  ],
})
export class AbnormalListPageModule {}
