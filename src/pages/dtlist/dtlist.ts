import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SafetyPage } from '../safety/safety';
import { HttpSerProvider } from '../../app/http-serve';
import { url } from "../../providers/Constants";
/**
 * Generated class for the DtlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dtlist',
  templateUrl: 'dtlist.html',
})
export class DtlistPage {
  newLeave:any={};
  current:number = 70;
  max: number = 100;
  color: string = '#45ccce';
  background: string = '#eaeaea';
  gradient: boolean = true;
  radius: number = 60;
  ProjectName: any;
  loginMark: string;
  token: string;
  list: any[];
  appServer: string;
 

  constructor(public navCtrl: NavController, public navParams: NavParams,private httpservice: HttpSerProvider) {
    this.loginMark=window.localStorage.getItem('loginMark');
    this.token=window.localStorage.getItem('token');
    this.appServer=url
    // this. ProjectName = this.navParams.data. ProjectName;
    this.dt();
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DtlistPage');
  }
  getData(item ){
    this.navCtrl.push(SafetyPage, {
      Ename: item.Ename
    });
  }
  // 
  dt(){
    var _that=this;
    var url=this.appServer+"/WyAppAll/elevatorInfo";
   this.httpservice.post(url, JSON.stringify({
      "loginMark":this.loginMark,
        "token":this.token,
        "data": "{'pagination':{rows:50,page: 1,sidx:'',sord:'ASC'},'queryJson':\"{'projectId':'f79d8f73-4b5c-4b3f-87dc-b557aa04bb97'}\"} "
    })).then(res=>{
      _that.list=res.data.rows;  
      
      console.log( _that.list);
  });
  }
 
}
