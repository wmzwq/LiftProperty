import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { DtlistPage } from '../dtlist/dtlist';
import { Http, Jsonp, Headers } from '@angular/http';
import { HttpSerProvider } from '../../app/http-serve';
import { ElevatorListPage } from '../elevator-list/elevator-list';
import { BaseUI } from '../../components/baseui';
import { UserPage } from '../user/user';
import { MessagePage } from '../message/message';
import { url } from "../../providers/Constants";
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  list: any[];
  loginMark: string;
  token: string;
  eve: any[];
  cellNumber: any;
  eleNumber: any;
  params: { ProjectName: string };
  condition: any;
  appServer: string;
  constructor(public navCtrl: NavController, private http: Http, private jsonp: Jsonp, private httpservice: HttpSerProvider, public loadCtrl: LoadingController) {
    this.appServer = url
  }
  ionViewDidEnter() {
    this.loginMark = window.localStorage.getItem('loginMark');
    this.token = window.localStorage.getItem('token');
    this.xq();
    this.dt();
  }
  getData(ProjectName: HTMLInputElement) {
    this.navCtrl.push(DtlistPage,
      this.params = {
        ProjectName: ProjectName.value

      })
  }
  xq() {
    var _that = this;
    var url = this.appServer + "/WyAppAll/equipment";
    this.httpservice.post(url, JSON.stringify({
      "loginMark": this.loginMark,
      "token": this.token,
      "data": "{'pagination':{rows:50,page: 1,sidx:'',sord:'ASC'},'queryJson':'{}'} "
    })).then(res => {
      _that.list = res.data.rows;
      this.cellNumber = res.data.rows.length;
      console.log(res);
    });

  }
  dt() {
    var _that = this;
    var url = this.appServer + "/WyAppAll/elevatorInfo";
    this.httpservice.post(url, JSON.stringify({
      "loginMark": this.loginMark,
      "token": this.token,
      "data": "{'pagination':{rows:50,page: 1,sidx:'',sord:'ASC'},'queryJson':\"{}\"} "
    })).then(res => {
      _that.eve = res.data.rows;
      this.eleNumber = res.data.records;
      console.log(_that.eve);
    });
  }

  gotoLiftPage(item) {
    this.navCtrl.push(ElevatorListPage, {
      prejectId: item.prejectId
    });
  }
  gotoUserPage() {
    this.navCtrl.push(UserPage);
  }

  gotoMessagePage() {
    this.navCtrl.push(MessagePage);
  }
}
