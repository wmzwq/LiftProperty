import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LiftDetailsPage } from './lift-details';

@NgModule({
  declarations: [
    LiftDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(LiftDetailsPage),
  ],
})
export class LiftDetailsPageModule {}
