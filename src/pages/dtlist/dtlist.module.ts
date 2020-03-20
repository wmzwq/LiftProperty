import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DtlistPage } from './dtlist';

@NgModule({
  declarations: [
    DtlistPage,
  ],
  imports: [
    IonicPageModule.forChild(DtlistPage),
  ],
})
export class DtlistPageModule {}
