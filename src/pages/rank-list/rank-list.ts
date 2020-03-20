import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpSerProvider } from '../../app/http-serve';
import { url } from "../../providers/Constants";
@IonicPage()
@Component({
  selector: 'page-rank-list',
  templateUrl: 'rank-list.html',
})
export class RankListPage {
  mainPage: string = "malfunction";
  loginMark: string;
  token: string; 
  month;
  now;
  sm;
  firstName;
  secondName;
  thirdName;
  firstFault;
  secondFault;
  thirdFault;
  firstMName: any;
  firstMaintenance: any;
  secondMName: any;
  secondMaintenance: any;
  thirdMName: any;
  thirdMaintenance: any;
  firstSName: any;
  secondSName: any;
  thirdSName: any;
  firstScore: any;
  secondScore: any;
  thirdScore: any;
  data2: any;
  data1: any;
  data3: any;
  appServer: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,private httpservice: HttpSerProvider) {
    this.loginMark=window.localStorage.getItem('loginMark');
    this.token=window.localStorage.getItem('token');
    this.appServer=url;
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
   this.faultRank();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RankListPage');
  }
  segmentChanged(e) {
    if (e.value == "malfunction") {
      this.faultRank();
    } else if (e.value == "repair") {
      this.maintenanceRank();
    } else if (e.value == "safety-index") {
       this.scoreRank()
      }
    
  } 
  faultRank(){
    var url=this.appServer+"/WyAppAll/eFaultRank";
  this.httpservice.post(url, JSON.stringify({
      "loginMark":this.loginMark,
        "token":this.token,
        "data": "{'pagination':{rows:50,page: 1,sidx:'',sord:'ASC'},'queryJson':\"{'StartTime':'"+this.sm+"','EndTime':'"+this.now+"'}\"} "
    })).then(res=>{
      console.log(res)
      if(res.data.length==0){
        var mychar4=document.getElementById('isfault');
        mychar4.style.display="block";
      }
     else{
      this.data1=res.data.fault
     }
  });
  }
  scoreRank(){
    var url=this.appServer+"/WyAppAll/eFaultRank";
    this.httpservice.post(url, JSON.stringify({
        "loginMark":this.loginMark,
          "token":this.token,
          "data": "{'pagination':{rows:50,page: 1,sidx:'',sord:'ASC'},'queryJson':\"{'StartTime':'"+this.sm+"','EndTime':'"+this.now+"'}\"} "
      })).then(res=>{
        console.log(res)
        if(res.data.length==0){
          var mychar4=document.getElementById('isfault');
          mychar4.style.display="block";
        }
       else{
        this.data3=res.data.Score;
       }
   
  });
  }
  maintenanceRank(){
    var url=this.appServer+"/WyAppAll/eFaultRank";
  this.httpservice.post(url, JSON.stringify({
      "loginMark":this.loginMark,
        "token":this.token,
        "data": "{'pagination':{rows:50,page: 1,sidx:'',sord:'ASC'},'queryJson':\"{'StartTime':'"+this.sm+"','EndTime':'"+this.now+"'}\"} "
    })).then(res=>{
      if(res.data.length==0){
        var mychar4=document.getElementById('isfault');
        mychar4.style.display="block";
      }
     else{
      this.data2=res.data.JX
     }
  });
  }
}
