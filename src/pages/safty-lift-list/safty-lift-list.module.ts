import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SaftyLiftListPage } from './safty-lift-list';

@NgModule({
  declarations: [
    SaftyLiftListPage,
  ],
  imports: [
    IonicPageModule.forChild(SaftyLiftListPage),
  ],
})
export class SaftyLiftListPageModule {}
