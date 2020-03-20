import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { HttpSerProvider } from '../../app/http-serve';
import { BaseUI } from '../../components/baseui';
declare var AMapUI;
declare var BMap;
import { url } from "../../providers/Constants";
/**
 * Generated class for the ParameterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-parameter',
  templateUrl: 'parameter.html',
})
export class ParameterPage extends BaseUI {
  street:string = ''
  mapAddress:string = ''
  longitude //经度
  latitude  //维度
  ecollection: any;
  loginMark: string;
  token: string;
  eve: any;
  Efactory: any;
  Ename: any;
  ponit: any;
  map: any;
  Euser: any;
  F_EcollectionId: any;
  Echeckout: any;
  Eaddress: void;
  appServer: string;
  constructor(public navCtrl: NavController, public navParams: NavParams,  private zone:NgZone,private httpservice: HttpSerProvider, public toastCtrl: ToastController) {
    super();
    this.ecollection= this.navParams.data.ecollection;
    this.loginMark=window.localStorage.getItem('loginMark');
    this.token=window.localStorage.getItem('token');
    this.appServer=url;
    this.dt()
  }


  ionViewDidLoad(){

}
dt(){
  var _that=this;
  var url= this.appServer+"/WyAppAll/elevatorInfo";
this.httpservice.post(url, JSON.stringify({
    "loginMark":this.loginMark,
      "token":this.token,
      "data": "{'pagination':{rows:50,page: 1,sidx:'',sord:'ASC'},'queryJson':\"{'F_EcollectionId':'"+this.ecollection+"'}\"} "
  })).then(res=>{
    _that.eve=res.data.rows;
    this.Efactory=res.data.rows[0].Efactory
    this.Ename=res.data.rows[0].Ename
    this.ponit=res.data.rows[0].Emappoint
    this.Euser=res.data.rows[0].Euser
    this.F_EcollectionId=res.data.rows[0].F_EcollectionId
    this.Echeckout=res.data.rows[0].Echeckout
    this.Eaddress=res.data.rows[0].Eaddress
    console.log( _that.eve);
    console.log(  this.Efactory);
    this.getMap(this.ponit)
});
}
getMap(ponit){
 // 百度地图API功能
 this.map = new BMap.Map("allmap1");    // 创建Map实例 

     var mapPoint =ponit;

 if (mapPoint == null) //判断是否有定位
 {
  this.map.centerAndZoom("温州", 13);      // 初始化地图,用城市名设置地图中心点
  const toast = super.showToast(this.toastCtrl, "该地址无定位信息");
  
 }
 else {
     var point = new BMap.Point(mapPoint.split(',')[0], mapPoint.split(',')[1]);
     this.map.centerAndZoom(point, 18);
     var myIcon = new BMap.Icon("assets/imgs/gps_map.png", new BMap.Size(48, 96));
     var marker = new BMap.Marker(point, { icon: myIcon });  // 创建标注
     this.map.addOverlay(marker);               // 将标注添加到地图中
     marker.setAnimation(4); //跳动的动画
 }

}
ZoomIn_2(){
  this.map.zoomIn();
}
ZoomOut_2(){
  this.map.zoomOut();
}
}
