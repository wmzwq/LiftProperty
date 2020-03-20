import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SafetyPage } from '../safety/safety';
import { HttpSerProvider } from '../../app/http-serve';
import { url } from "../../providers/Constants";
@IonicPage()
@Component({
  selector: 'page-elevator-list',
  templateUrl: 'elevator-list.html',
})
export class ElevatorListPage {
  prejectId: any;
  loginMark: string;
  token: string;
  list: any;
  searchValue: any;
  appServer: string;
  constructor(public navCtrl: NavController, public navParams: NavParams,private httpservice: HttpSerProvider) {
    this.prejectId=this.navParams.data.prejectId;
    this.loginMark=window.localStorage.getItem('loginMark');
    this.token=window.localStorage.getItem('token');
    this.appServer=url
    this.state();
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ElevatorListPage');
  }
  state(){
    var url = this.appServer + "/WyAppAll/equipmentStatus";
    console.log(url)
    this.httpservice.post(url, JSON.stringify({
      "loginMark":this.loginMark,
        "token":this.token,
       "data": "{'queryJson':\"{'F_ProjectId':'"+this.prejectId+"','type':'3','name':''}\"} "
      
    })).then(res=>{
      this.list=res.data.rows
      console.log( res);
  });
  }
  search(){
    var url=this.appServer+"/WyAppAll/equipmentStatus";
    this.httpservice.post(url, JSON.stringify({
      "loginMark":this.loginMark,
        "token":this.token,
       "data": "{'queryJson':\"{'F_ProjectId':'"+this.prejectId+"','type':'3','address':'"+this.searchValue+"'}\"} "
      
    })).then(res=>{
      this.list=res.data.rows;
      console.log( res);
  });
  }
  gotoSafetyPage(item) {
    this.navCtrl.push(SafetyPage,{
      ecollection:item.ecollection,
      name:item.name
    });
  }
}
