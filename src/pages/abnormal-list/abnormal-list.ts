import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AbnormalDetailsPage } from '../abnormal-details/abnormal-details';
import { LiftDetailsPage } from '../lift-details/lift-details';

@IonicPage()
@Component({
  selector: 'page-abnormal-list',
  templateUrl: 'abnormal-list.html',
})
export class AbnormalListPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AbnormalListPage');
  }
  gotoAbDetailsPage() {
    this.navCtrl.push(AbnormalDetailsPage);
  }

  gotoLiftDetailsPage() {
    this.navCtrl.push(LiftDetailsPage);
  }
}
