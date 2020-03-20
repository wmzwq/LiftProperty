import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RankListPage } from './rank-list';

@NgModule({
  declarations: [
    RankListPage,
  ],
  imports: [
    IonicPageModule.forChild(RankListPage),
  ],
})
export class RankListPageModule {}
