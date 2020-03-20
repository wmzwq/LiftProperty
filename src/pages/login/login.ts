import { Component } from '@angular/core';
import { ModalController, IonicPage, NavController, NavParams, Platform, ToastController } from 'ionic-angular';
import { TabsPage } from "../tabs/tabs";
import { HttpClient } from '@angular/common/http';
import { Http, Jsonp, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/Rx';
import { Storage } from '@ionic/storage';
import { Md5 } from 'ts-md5/dist/md5';
import { BackButtonServiceProvider } from '../../providers/back-button-service/back-button-service';
import { HttpSerProvider } from '../../app/http-serve';
import { HomePage } from '../home/home';
import { BaseUI } from '../../app/baseui';
import { url } from "../../providers/Constants";


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage extends BaseUI {

  private headers = new Headers({
    'Content-Type': 'application/json'
  });
  list: any[];
  iconStyle: object = {
    'color': '#488aff',
    'font-size': '1.4em'
  };
  public isShow: boolean = false;
  settings: any;
  public isRemember: boolean = false;
  expenses: any = [];
  username: string;
  password: string;
  login: Array<any> = [];
  spinner1: boolean = true;
  appServer: string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private https: HttpClient,
    private http: Http,
    private jsonp: Jsonp,
    public modalCtrl: ModalController,
    public storage: Storage,
    private backButtonService: BackButtonServiceProvider,
    private platform: Platform,
    private httpservice: HttpSerProvider,
    public toastCtrl: ToastController,
  ) {
    super();
    this.appServer = url;
    this.platform.ready().then(() => {
      this.backButtonService.registerBackButtonAction(null);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  ionViewDidEnter() {

  }
  logIn(username: HTMLInputElement, password: HTMLInputElement) {
    this.httpservice.get(this.appServer + '/login/checklogin?data={"username":"' + username.value + '","password":"' + Md5.hashStr(password.value).toString() + '"}', null).then(res => {
      if (res.code == 200) {
        window.localStorage.setItem('username', username.value);
        window.localStorage.setItem('password', password.value);
        window.localStorage.setItem('loginMark', res.data.loginMark);
        window.localStorage.setItem('token', res.data.token);
        const toast = super.showToast(this.toastCtrl, res.info);
        this.navCtrl.setRoot(TabsPage);
        console.log(res.data);
      } else {
        const toast = super.showToast(this.toastCtrl, res.info);
      }

    })
  }


}