import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RepairHistoryPage } from '../repair-history/repair-history';
import { ReportPage } from '../report/report';
import { MessagePage } from '../message/message';
import { UserPage } from '../user/user';
import { HttpSerProvider } from '../../app/http-serve';
import { url } from "../../providers/Constants";
@IonicPage()
@Component({
  selector: 'page-repair',
  templateUrl: 'repair.html',
})
export class RepairPage {
  loginMark: string;
  token: string;
  appServer: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private httpservice: HttpSerProvider) {
    this.loginMark=window.localStorage.getItem('loginMark');
    this.token=window.localStorage.getItem('token');
    this.appServer=url;
    this.repair()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RepairPage');
  }

  gotoHistoryPage() {
    this.navCtrl.push(RepairHistoryPage);
  }

  gotoReportPage() {
    this.navCtrl.push(ReportPage);
  }

  gotoMessagePage() {
    this.navCtrl.push(MessagePage);
  }
  gotoUserPage(){
    this.navCtrl.push(UserPage);
  }
  
  repair(){
    var url=this.appServer+"/WyAppAll/GetRepairExamine";
  this.httpservice.post(url, JSON.stringify({
      "loginMark":this.loginMark,
        "token":this.token,
        "data": "{'pagination':{rows:50,page: 1,sidx:'',sord:'ASC'},'queryJson':\"{}\"} "
    })).then(res=>{
      console.log(res);
  });
  }
}
