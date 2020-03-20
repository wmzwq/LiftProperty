import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import $ from 'jquery';
import { HttpSerProvider } from '../../app/http-serve';
import { BaseUI } from '../../app/baseui';
/**
 * Generated class for the RealtimePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-realtime',
  templateUrl: 'realtime.html',
})
export class RealtimePage extends BaseUI{
 
    constructor(public navCtrl: NavController, public navParams: NavParams,public httpservice:HttpSerProvider, public toastCtrl: ToastController) {
      super();
      
      
  }

  ionViewDidEnter(){

}


}
