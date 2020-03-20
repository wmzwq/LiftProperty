import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderRefusePage } from './order-refuse';

@NgModule({
  declarations: [
    OrderRefusePage,
  ],
  imports: [
    IonicPageModule.forChild(OrderRefusePage),
  ],
})
export class OrderRefusePageModule {}
