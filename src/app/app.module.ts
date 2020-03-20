import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';

import { IonicStorageModule } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { HttpModule, JsonpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { QRScanner } from '@ionic-native/qr-scanner';

import { Camera } from "@ionic-native/camera";
import { File } from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';
import { ImagePicker } from "@ionic-native/image-picker";
import { Base64 } from '@ionic-native/base64';

import { LocalNotifications } from '@ionic-native/local-notifications';
import { Vibration } from '@ionic-native/vibration';

import { SignaturePadModule } from 'angular2-signaturepad';// 签名插件

import { Geolocation } from '@ionic-native/geolocation';
import { HttpSerProvider } from './http-serve';
import { BackButtonServiceProvider } from '../providers/back-button-service/back-button-service';
import { BackgroundMode } from '@ionic-native/background-mode';
import { AppMinimize } from '@ionic-native/app-minimize';
import { Network } from '@ionic-native/network';
import { AppVersion } from '@ionic-native/app-version';
import { Toast } from '@ionic-native/toast';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { CallNumber } from '@ionic-native/call-number';
import { Diagnostic } from '@ionic-native/diagnostic';
import { CodePush } from '@ionic-native/code-push';
import { SocialSharing } from '@ionic-native/social-sharing';
import { CityProvider } from '../providers/city/city';
import { Logger } from '../providers/Logger';
import { NativeService } from '../providers/NativeService';
import { Media } from '@ionic-native/media';
import { SettingDataProvider } from '../providers/setting-data/setting-data';
import { SQLite } from '@ionic-native/sqlite';
import { SqliteProvider } from '../providers/sqlite/sqlite';
import { DtlistPage } from '../pages/dtlist/dtlist';
import { AbnormalPage } from '../pages/abnormal/abnormal';
import { RealtimePage } from '../pages/realtime/realtime';
import { RundataPage } from '../pages/rundata/rundata';
import { ParameterPage } from '../pages/parameter/parameter'
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { SafetyPage } from '../pages/safety/safety';
import { TabsPage } from '../pages/tabs/tabs';
import { MaintenancePage } from '../pages/maintenance/maintenance';
import { UserPage } from '../pages/user/user';
import { CalendarModule } from 'ionic3-calendar';
import { RepairPage } from '../pages/repair/repair';
import { SaftyLiftListPage } from '../pages/safty-lift-list/safty-lift-list';
import { RankListPage } from '../pages/rank-list/rank-list';
import { MaintainDetailsPage } from '../pages/maintain-details/maintain-details';
import { LiftDetailsPage } from '../pages/lift-details/lift-details';
import { AbnormalListPage } from '../pages/abnormal-list/abnormal-list';
import { AbnormalDetailsPage } from '../pages/abnormal-details/abnormal-details';
import { ComponentsModule } from '../components/components.module';
import { RepairHistoryPage } from '../pages/repair-history/repair-history';
import { OrderDetailsPage } from '../pages/order-details/order-details';
import { OrderRefusePage } from '../pages/order-refuse/order-refuse';
import { ReportPage } from '../pages/report/report';
import { MessagePage } from '../pages/message/message';
import { SettingPage } from '../pages/setting/setting';
import { ElevatorListPage } from '../pages/elevator-list/elevator-list';
import { HistoryFaultPage } from '../pages/history-fault/history-fault';
import { MaintenanceHistoryPage } from '../pages/maintenance-history/maintenance-history';
import { GlobalData } from '../providers/GlobalData';
import { Utils } from '../providers/Utils';
import { HttpService } from '../providers/HttpService';
import { FileService } from '../providers/FileService';
import { Helper } from '../providers/Helper';
import { MineService } from '../providers/MineService';
import { EchartsPage } from '../pages/echarts/echarts';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    HomePage,
    TabsPage,
    LoginPage,
    SafetyPage,
    DtlistPage,
    AbnormalPage,
    RealtimePage,
    RundataPage,
    ParameterPage,
    MaintenancePage,
    UserPage,
    RepairPage,
    SaftyLiftListPage,
    RankListPage,
    MaintainDetailsPage,
    LiftDetailsPage,
    AbnormalListPage,
    AbnormalDetailsPage,
    RepairHistoryPage,
    OrderDetailsPage,
    OrderRefusePage,
    ReportPage,
    MessagePage,
    SettingPage,
    ElevatorListPage,
    HistoryFaultPage,
    MaintenanceHistoryPage,
    EchartsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    JsonpModule,
    HttpClientModule,
    SignaturePadModule,
    CalendarModule,
    RoundProgressModule,
    ComponentsModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp, {
      iconMode: 'ios',
      mode:'ios',
      tabsHideOnSubPages: 'true', //隐藏全部子页面 tabs
      backButtonText: '' /*配置返回按钮*/,
      animated: 'true',
      pageTransition: 'ios-transition',
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    HomePage,
    TabsPage,
    LoginPage,
    SafetyPage,
    DtlistPage,
    AbnormalPage,
    RealtimePage,
    RundataPage,
    ParameterPage,
    MaintenancePage,
    UserPage,
    RepairPage,
    SaftyLiftListPage,
    RankListPage,
    MaintainDetailsPage,
    LiftDetailsPage,
    AbnormalListPage,
    AbnormalDetailsPage,
    RepairHistoryPage,
    OrderDetailsPage,
    OrderRefusePage,
    ReportPage,
    MessagePage,
    SettingPage,
    ElevatorListPage,
    HistoryFaultPage,
    MaintenanceHistoryPage,
    EchartsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    QRScanner,
    Camera,
    File,
    FileTransfer,
    ImagePicker,
    Base64,
    Geolocation,
    LocalNotifications,
    Vibration,
    BackgroundMode,
    AppMinimize,
    Network,
    AppVersion,
    Toast,
    InAppBrowser,
    CallNumber,
    Diagnostic,
    CodePush,
    SocialSharing,
    Media,
    SQLite,
    GlobalData,
    Utils,
    HttpService,
    FileService,
    Helper,
    MineService,

    { provide: ErrorHandler, useClass: IonicErrorHandler },
    HttpSerProvider,
    BackButtonServiceProvider,
    CityProvider,
    Logger,
    NativeService,
    SettingDataProvider,
    SqliteProvider,
  ]
})
export class AppModule { }
