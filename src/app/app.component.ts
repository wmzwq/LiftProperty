import { Component, ViewChild} from '@angular/core';
import {Platform, Nav,ToastController} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {TabsPage} from '../pages/tabs/tabs';
import {LoginPage} from '../pages/login/login';
import {Storage} from '@ionic/storage';
import { NativeService} from '../providers/NativeService';
import {SettingDataProvider} from '../providers/setting-data/setting-data';
import {MaintainDetailsPage} from '../pages/maintain-details/maintain-details';
import { HttpSerProvider } from './http-serve';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  // rootPage: any = TabsPage;
  butPages;
   rootPage:any;
  pages;
  footerBtn;
  statusBar: any;
  splashScreen: any;
  platform: any;
  navCtrl: any;
  placeholder = 'assets/imgs/m.jpg';
  chosenPicture: any;
  theme: string;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public storage: Storage,
    private nativeService: NativeService,
    private toastCtrl: ToastController,
    settingDataProvider: SettingDataProvider,
    private httpservice: HttpSerProvider,
  ) {
    settingDataProvider.getActiveTheme().subscribe(theme => {
      if (theme) {
        this.theme = 'dark-theme';
      } else {
        this.theme = 'light-theme';
      }
    });
    this.storage.get('firstIn').then((result) => {

      // if (result) {
        if (window.localStorage.getItem('username')) {
           this.rootPage = TabsPage;
        } else {
          this.rootPage = LoginPage;
        }
      // } 

    });

    platform.ready().then(() => {
      this.assertNetwork(); // 检测网络
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

    });

    this.initfooter();



  }
  // 检测网络
  assertNetwork() {
    if (!this.nativeService.isConnecting()) {
      this.toastCtrl.create({
        message: '未检测到网络,请连接网络',
        showCloseButton: true,
        closeButtonText: '确定'
      }).present();
    }
  }

  initfooter() {
    this.footerBtn = [{
        title: '夜间',
        icon: 'ios-moon-outline'
      },
      {
        title: '设置',
        icon: 'ios-settings-outline'
      },
      {
        title: '退出',
        icon: 'ios-power-outline'
      },
    ]
  }


}