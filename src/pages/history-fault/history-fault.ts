import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpSerProvider } from '../../app/http-serve';
import { AbnormalDetailsPage } from '../abnormal-details/abnormal-details';
import { url } from "../../providers/Constants";
@IonicPage()
@Component({
  selector: 'page-history-fault',
  templateUrl: 'history-fault.html',
})
export class HistoryFaultPage {
  [x: string]: any;
  mainPage: string = "safetyAnaly";
  list: any[];
  choice: string = "choice1";
  pages;
  sm;//月初
  em;//月末
  sn;//年初
  en;//年末
  sw;//周一
  ew;//周日
  month;
  a;
  b;
  c;
  d;
  public time = '';
  public date = '';
  public week = '';
  loginMark: string;
  token: string;
  ecollection: any;
  ekr: any;
  efkr: any;
  eall: any;
  efmqtt: any;
  appServer:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private httpservice: HttpSerProvider) {
    this.loginMark=window.localStorage.getItem('loginMark');
      this.token=window.localStorage.getItem('token');
      this.ecollection=this.navParams.data.ecollection;
      this.appServer=url;
      const formatDate = ( time: any ) => {
        // 格式化日期，获取今天的日期
        const Dates = new Date( time );
        const year: number = Dates.getFullYear();
       this.month = ( Dates.getMonth() + 1 ) < 10 ? '0' + ( Dates.getMonth() + 1 ) : ( Dates.getMonth() + 1 );
        const day: any = Dates.getDate() < 10 ? '0' + Dates.getDate() : Dates.getDate();
        return year + '-' + this.month + '-' + day;
        
      };
   const now = formatDate( new Date().getTime() ); // 当前时间
   let date = new Date();
   this.time = date.getHours() + ':' + date.getMinutes();
   let y=  date.getFullYear()
   let m= date.getUTCMonth()+1
   let d =  date.getDate();
   var h=d-1;
   this.sn=y+'-'+ "01" + '-' + "01";
   this.en=y+'-'+ "12" + '-' + "31";
   this.date = y+'-'+ m + '-' + d;
   this.sm=formatDate( new Date().getTime() + ( 1000 * 3600 * 24 * (-h) ) )
   this.week = this.transform(this.date);
   if(m==1||m==3||m==5||m==7||m==8||m==10||m==12){
     this.em=y+'-'+ this.month+ '-' + "31"
   }
   if(m==4||m==6||m==9||m==11){
     
    this.em=y+'-'+ this.month + '-' + "30"
   }
   if(m==2){
    this.em=y+'-'+ this.month+ '-' + "28"
   }
   if(this.week=="星期一"){
     this.sw=now;
     this.ew=formatDate( new Date().getTime() + ( 1000 * 3600 * 24 * 6 ) )
   console.log("周一：",this.sw)
   console.log("周日：",this.ew)
  }
  if(this.week=="星期二"){
    this.sw=formatDate( new Date().getTime() + ( 1000 * 3600 * 24 * (-1) ) )
    this.ew=formatDate( new Date().getTime() + ( 1000 * 3600 * 24 * 5 ) )
  console.log("周一：",this.sw)
  console.log("周日：",this.ew)
  }
  if(this.week=="星期三"){
    this.sw=formatDate( new Date().getTime() + ( 1000 * 3600 * 24 * (-2) ) )
    this.ew=formatDate( new Date().getTime() + ( 1000 * 3600 * 24 * 4 ) )
  console.log("周一：",this.sw)
  console.log("周日：",this.ew)
  }
  if(this.week=="星期四"){
    this.sw=formatDate( new Date().getTime() + ( 1000 * 3600 * 24 * (-3) ) )
    this.ew=formatDate( new Date().getTime() + ( 1000 * 3600 * 24 * 3 ) )
  console.log("周一：",this.sw)
  console.log("周日：",this.ew)
  }
  if(this.week=="星期五"){
    this.sw=formatDate( new Date().getTime() + ( 1000 * 3600 * 24 * (-4) ) )
    this.ew=formatDate( new Date().getTime() + ( 1000 * 3600 * 24 * 2 ) )
  console.log("周一：",this.sw)
  console.log("周日：",this.ew)
  }
  
  if(this.week=="星期六"){
    this.sw=formatDate( new Date().getTime() + ( 1000 * 3600 * 24 * (-5) ) )
    this.ew=formatDate( new Date().getTime() + ( 1000 * 3600 * 24 * 1 ) )
  console.log("周一：",this.sw)
  console.log("周日：",this.ew)
  }
  if(this.week=="星期天"){
    this.sw=formatDate( new Date().getTime() + ( 1000 * 3600 * 24 * (-6) ) )
    this.ew=now
  console.log("周一：",this.sw)
  console.log("周日：",this.ew)
  }
   console.log("今日日期：",now)
   console.log("今日星期：",this.week)
   console.log("本月月初：", this.sm);
   console.log("本月月末：",this.em);
   console.log("本年年初：", this.sn);
   console.log("本年年末：",this.en);
   this.startTime=this.sw,
   this.stopTime=this.ew,
   this.weekFault();
    }
    transform(value: any): any {
      if (value !== undefined) {
          let weekArray = new Array('星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六');
          let myDate = new Date(value);
          let week = weekArray[myDate.getDay()];
          return week;
      }
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryFaultPage');
  }
  segmentChanged(e) {
    if (e.value == "safetyAnaly") {
      this.startTime=this.sw,
      this.stopTime=this.ew,
      this.weekFault()
    } else if (e.value == "maintenance") {
      this.startTime=this.sm,
   this.stopTime=this.em,
   this.weekFault();
    } else if (e.value == "annualSurvey") {
      this.startTime=this.sn,
      this.stopTime=this.en,
      this.weekFault();
    } 
  }
  weekFault(){
    var url=this.appServer+"/WyAppAll/eFaultNumber";
  this.httpservice.post(url, JSON.stringify({
      "loginMark":this.loginMark,
        "token":this.token,
        "data": "{'Start':'"+this.startTime+"','Stop':'"+this.stopTime+"','F_CollectionId':'"+this.ecollection+"'}"
    })).then(res=>{
     if(res.data.length==0) {
      this.efkr=0;
      this.eall=0;
      this.efmqtt=0;
      this.ecd=0;
      this.edd=0;
      this.ecs=0;
      this.eyxkm=0;
      this.etd=0;
      this.ejl=0;
      this.ekmgz=0;
      this.ejxywyd=0;
      this.ekr=0;
     }
     else{
      this.efkr=res.data[0].efkr;
      this.eall=res.data[0].eall;
      this.efmqtt=res.data[0].efmqtt;
      this.ecd=res.data[0].ecd;
      this.edd=res.data[0].edd;
      this.ecs=res.data[0].ecs;
      this.eyxkm=res.data[0].eyxkm;
      this.etd=res.data[0].etd;
      this.ejl=res.data[0].ejl;
      this.ekmgz=res.data[0].ekmgz;
      this.ejxywyd=res.data[0].ejxywyd;
      this.ekr=res.data[0].ekr;
     }
    
    console.log(res)
   
  });
  }
  gotoAbDetailsPage(){
    this.navCtrl.push(AbnormalDetailsPage)
  }
}
