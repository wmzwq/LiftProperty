import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { RundataPage } from '../rundata/rundata';
import { ParameterPage } from '../parameter/parameter';
import { MaintenancePage } from '../maintenance/maintenance';
import { HistoryFaultPage } from '../history-fault/history-fault';
import { MaintenanceHistoryPage } from '../maintenance-history/maintenance-history';
import { HttpSerProvider } from '../../app/http-serve';
import { EchartsPage } from '../echarts/echarts';
import { BaseUI } from '../../app/baseui';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { url } from "../../providers/Constants";

/**
 * Generated class for the SafetyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-safety',
  templateUrl: 'safety.html',
})
export class SafetyPage extends BaseUI{

  newLeave:any={};
  current:any ;
  max: number = 100;
  color: string = '#45ccce';
  background: string = '#eaeaea';
  gradient: boolean = true;
  radius: number = 125;
  ionicHistory: any;
  name: any;
  loginMark: string;
  token: string;
  month: string | number;
  now: string;
  sm: string;
  ecollection: any;
  Pname: void;
  Enumber: any;
  zburl: any;
  appServer: string;
 
 
  constructor(public navCtrl: NavController, public navParams: NavParams,private httpservice: HttpSerProvider,public toastCtrl:ToastController, public iab: InAppBrowser) {
    super();
    this.appServer=url;
    this.newLeave.sqsj=new Date(new Date().getTime()+8*60*60*1000).toISOString();//北京时间
   this.ecollection=this.navParams.data.ecollection;
    this.loginMark=window.localStorage.getItem('loginMark');
    this.token=window.localStorage.getItem('token');
    const formatDate = ( time: any ) => {
      // 格式化日期，获取今天的日期
      const Dates = new Date( time );
      const year: number = Dates.getFullYear();
     this.month = ( Dates.getMonth() + 1 ) < 10 ? '0' + ( Dates.getMonth() + 1 ) : ( Dates.getMonth() + 1 );
      const day: any = Dates.getDate() < 10 ? '0' + Dates.getDate() : Dates.getDate();
      return year + '-' + this.month + '-' + day;
      
    };
    this.now = formatDate( new Date().getTime() ); // 当前时间
   this. sm=formatDate( new Date().getTime() + ( 1000 * 3600 * 24 * (-30) ) )
   this.score();
   }
 
ionViewDidEnter(){
 
}
score(){
  var url=this.appServer+"/WyAppAll/eScore";
this.httpservice.post(url, JSON.stringify({
    "loginMark":this.loginMark,
      "token":this.token,
      "data": "{'pagination':{rows:50,page: 1,sidx:'',sord:'ASC'},'queryJson':\"{'Ecollection':'"+this.ecollection+"','StartTime':'"+this.sm+"','EndTime':'"+this.now+"'}\"} "
  })).then(res=>{
  this.Pname=res.data.rows.Pname;
  this.name=res.data.rows.Ename;
  this.current=res.data.rows.Score;
  console.log(res)

});
}
  getOverlayStyle() {
    let transform = 'translateY(-50%) ' + 'translateX(-50%)';
    return {
      'top': '50%',
      'bottom': 'auto',
      'left': '50%',
      'transform': transform,
      '-moz-transform': transform,
      '-webkit-transform': transform,
      'font-size': this.radius / 3.5 + 'px'
    };
  }
fault(){
  this.navCtrl.push(HistoryFaultPage,{
    ecollection:this.ecollection
  });
}
real(){
  var url = this.appServer+ "/CheckAndAcceptAPI/AcceptanceOfTheQueryElevatroInfo";
    this.httpservice.post(url, JSON.stringify({
      "data": "{ \"pagination\": { rows: 50, page: 1, sidx: '', sord: 'ASC' }, \"queryJson\": \"{'Ecollection':'" +  this.ecollection + "'}\" }"
    })).then(res => {
      try {
        this.Enumber = res.data.rows[0].Enumber
        var url = this.appServer+"/Monitor/WebVideo";
        this.httpservice.post(url, JSON.stringify({
          "data": "{'keyValue':'" + this.Enumber + "','Ecollection':'" +  this.ecollection + "'}"
        })).then(res => {
          try {
            console.log(res)
            this.zburl=res.data.url
            this.iab.create(this.zburl, '_system')
          } catch (e) {
            const toast = super.showToast(this.toastCtrl, "/Monitor/WebVideo接口异常:" + e);
          }
        });
      } catch (e) {
        const toast = super.showToast(this.toastCtrl, "/CheckAndAcceptAPI/AcceptanceOfTheQueryElevatroInfo接口异常:" + e);
      }
    });
}
run(){
  this.navCtrl.push(RundataPage);
}
parameter(){
  this.navCtrl.push(ParameterPage,{
    ecollection:this.ecollection
  });
}
change(){
  this.navCtrl.push(MaintenancePage);
}
hs(){
  this.navCtrl.push(EchartsPage,{
    ecollection:this.ecollection,
    Pname:this.Pname
  });
}
history(){
  this.navCtrl.push(MaintenanceHistoryPage);
}
}
