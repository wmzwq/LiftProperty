import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OrderRefusePage } from '../order-refuse/order-refuse';
import { OrderDetailsPage } from '../order-details/order-details';

@IonicPage()
@Component({
  selector: 'page-repair-history',
  templateUrl: 'repair-history.html',
})
export class RepairHistoryPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RepairHistoryPage');
  }

  gotoRefusePage() {
    this.navCtrl.push(OrderRefusePage);
  }

  gotoDetailsPage() {
    this.navCtrl.push(OrderDetailsPage);
  }
}
