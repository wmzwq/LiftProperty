import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ActionSheetController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { SettingPage } from '../setting/setting';
import { NativeService } from '../../providers/NativeService';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { GlobalData } from '../../providers/GlobalData';
import { Helper } from '../../providers/Helper';
import { FileService } from '../../providers/FileService';
import { MineService } from '../../providers/MineService';
import { HttpSerProvider } from '../../app/http-serve';
import { url } from "../../providers/Constants";
/**
 * Generated class for the UserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {
  public base64Image;
  loginMark: string;
  token: string;
  F_Account: any;
  F_RealName: any;
  F_Telephone: any;
  cellNumber: any;
  eleNumber: any;
  Maintenance: any;
  TeamGroup: any;
  appServer: string;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public helper: Helper,
    public nativeService: NativeService,
    public fileService: FileService,
    public mineService: MineService,
    private camera: Camera,
    public events: Events,
    private actionSheetCtrl: ActionSheetController,
    public globalData: GlobalData,
    private httpservice: HttpSerProvider, ) {
      this.loginMark=window.localStorage.getItem('loginMark');
      this.token=window.localStorage.getItem('token');
      this.appServer=url;
      this.userList();
      this.dt();
      this.xq();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserPage');
    
  }
  setup(){
    this.navCtrl.push(SettingPage)
  }
  userList(){
    var url=this.appServer+"/UserAppInfo/GetWyInfo";
    this.httpservice.post(url, JSON.stringify({
      "loginMark":this.loginMark,
        "token":this.token,
    })).then(res=>{
      console.log(res)
      this.F_Account=res.data.F_Account;
      this.F_RealName=res.data.F_RealName;
      this.F_Telephone=res.data.F_Telephone;
      this.Maintenance=res.data.Maintenance;
      this.TeamGroup=res.data.TeamGroup;
    })
  }
  xq(){
    var url=this.appServer+"/WyAppAll/equipment";
    this.httpservice.post(url, JSON.stringify({
      "loginMark":this.loginMark,
        "token":this.token,
       "data": "{'pagination':{rows:50,page: 1,sidx:'',sord:'ASC'},'queryJson':'{}'} "
    })).then(res=>{
      this.cellNumber=res.data.rows.length;
      console.log( res);
  });
  
}
dt(){
  var url=this.appServer+"/WyAppAll/elevatorInfo";
this.httpservice.post(url, JSON.stringify({
    "loginMark":this.loginMark,
      "token":this.token,
      "data": "{'pagination':{rows:50,page: 1,sidx:'',sord:'ASC'},'queryJson':\"{}\"} "
  })).then(res=>{
    this.eleNumber=res.data.records;
})
}
  doCamera(){
    if (!this.nativeService.isMobile()) {
      this.nativeService.alert('请在真机上调试');
      return;
    }
    const options: CameraOptions = {
      quality: 70,//图片质量
      destinationType: this.camera.DestinationType.DATA_URL,//返回base64地址
      encodingType: this.camera.EncodingType.JPEG,
     

      sourceType:this.camera.PictureSourceType.CAMERA,
      // mediaType: this.camera.MediaType.PICTURE,
      allowEdit:true,
      targetWidth:300,  /*宽度高度要设置*/
      targetHeight:300,
      saveToPhotoAlbum:true, 
    }

    this.camera.getPicture(options).then((imageData) => {
      this.base64Image = 'data:image/jpeg;base64,'+imageData; //拍照地址
      console.log(this.base64Image);
     }, (err) => {

     });
  }
}
