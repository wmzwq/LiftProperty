import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpSerProvider } from '../../app/http-serve';
import { BaseUI } from '../../components/baseui';
import { url } from "../../providers/Constants";
/**
 * Generated class for the ReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-report',
  templateUrl: 'report.html',
})
export class ReportPage extends BaseUI{
  loginMark: string;
  token: string;
  ecl: string;
  eleList: any;
  phone: string;
  people: string;
  message: string;
  appServer: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private httpservice: HttpSerProvider) {
    super();
    this.loginMark=window.localStorage.getItem('loginMark');
    this.token=window.localStorage.getItem('token');
    this.ecl="choose";
    this.appServer=url;
    this.dt()
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportPage');
  }
  dt(){
    var url=this.appServer+"/WyAppAll/elevatorInfo";
  this.httpservice.post(url, JSON.stringify({
      "loginMark":this.loginMark,
        "token":this.token,
        "data": "{'pagination':{rows:50,page: 1,sidx:'',sord:'ASC'},'queryJson':\"{}\"} "
    })).then(res=>{
      this.eleList=res.data.rows;
      console.log(res);
  });
  }
  repair(){
    var url=this.appServer+"/WyAppAll/CreateWyAppRepair";
  this.httpservice.post(url, JSON.stringify({
      "loginMark":this.loginMark,
        "token":this.token,
        "data": "{'keyValue':'','strEntity':\"{'F_Saff':'"+this.people +"','F_SaffPhone':'"+this.phone +"','F_RepairContent':'"+this.message +"','F_Ecollection':'"+this.ecl +"'}\"} "
    })).then(res=>{
    console.log(res)
  
  });
  }
}
