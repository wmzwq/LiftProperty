import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RealtimePage } from './realtime';

@NgModule({
  declarations: [
    RealtimePage,
  ],
  imports: [
    IonicPageModule.forChild(RealtimePage),
  ],
})
export class RealtimePageModule {}
