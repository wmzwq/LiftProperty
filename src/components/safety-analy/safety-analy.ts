import { Component, ViewChild, ElementRef } from '@angular/core';
import { RankListPage } from '../../pages/rank-list/rank-list';
import { NavController, ToastController } from 'ionic-angular';
import { HttpSerProvider } from '../../app/http-serve';
import { LoginPage } from '../../pages/login/login';
import { BaseUI } from '../baseui';
import { url } from "../../providers/Constants";
/**
 * Generated class for the SafetyAnalyComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'safety-analy',
  templateUrl: 'safety-analy.html'
})
export class SafetyAnalyComponent extends BaseUI {

  main: string = "malfunction";
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
  appServer: string;
  constructor(public navCtrl: NavController, private httpservice: HttpSerProvider, public toastCtrl: ToastController) {
    super();
    this.appServer = url;
    this.loginMark = window.localStorage.getItem('loginMark');
    this.token = window.localStorage.getItem('token');
    const formatDate = (time: any) => {
      // 格式化日期，获取今天的日期
      const Dates = new Date(time);
      const year: number = Dates.getFullYear();
      this.month = (Dates.getMonth() + 1) < 10 ? '0' + (Dates.getMonth() + 1) : (Dates.getMonth() + 1);
      const day: any = Dates.getDate() < 10 ? '0' + Dates.getDate() : Dates.getDate();
      return year + '-' + this.month + '-' + day;

    };
    this.now = formatDate(new Date().getTime()); // 当前时间
    this.sm = formatDate(new Date().getTime() + (1000 * 3600 * 24 * (-30)))

    this.faultRank();

  }

  ionViewDidEnter() {

  }

  gotoRankPage() {
    this.navCtrl.push(RankListPage);
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
  faultRank() {
    var _that = this;
    var url = this.appServer + "/WyAppAll/eFaultRank";
    this.httpservice.post(url, JSON.stringify({
      "loginMark": this.loginMark,
      "token": this.token,
      "data": "{'pagination':{rows:50,page: 1,sidx:'',sord:'ASC'},'queryJson':\"{'StartTime':'" + this.sm + "','EndTime':'" + this.now + "'}\"} "
    })).then(res => {

      if (res.info == "未找到登录信息") {

        const toast = super.showToast(this.toastCtrl, '当前登录信息已失效，请重新登录');
        this.navCtrl.push(LoginPage)
      }
      else {
        var mychar1 = document.getElementById('first');
        var mychar2 = document.getElementById('second');
        var mychar3 = document.getElementById('third');
        var mychar4 = document.getElementById('default');
        if (res.data.fault.length == 0) {
          mychar1.style.display = "none";
          mychar2.style.display = "none";
          mychar3.style.display = "none";
          mychar4.style.display = "block";
        }
        if (res.data.fault.length == 1) {
          this.firstName = res.data.fault[0].name;
          this.firstFault = res.data.fault[0].number;
          mychar1.style.display = "block";
          mychar2.style.display = "none";
          mychar3.style.display = "none";
          mychar4.style.display = "none";
        }
        if (res.data.fault.length == 2) {
          this.firstName = res.data.fault[0].name;
          this.secondName = res.data.fault[1].name;
          this.firstFault = res.data.fault[0].number;
          this.secondFault = res.data.fault[1].number;
          mychar1.style.display = "block";
          mychar2.style.display = "block";
          mychar3.style.display = "none";
          mychar4.style.display = "none";
        }
        if (res.data.fault.length >= 3) {
          this.firstName = res.data.fault[0].name;
          this.secondName = res.data.fault[1].name;
          this.thirdName = res.data.fault[2].name
          this.firstFault = res.data.fault[0].number;
          this.secondFault = res.data.fault[1].number;
          this.thirdFault = res.data.fault[2].number
          mychar1.style.display = "block";
          mychar2.style.display = "block";
          mychar3.style.display = "block";
          mychar4.style.display = "none";
        }
      }

    });
  }
  scoreRank() {
    var _that = this;
    var url = this.appServer + "/WyAppAll/eFaultRank";
    this.httpservice.post(url, JSON.stringify({
      "loginMark": this.loginMark,
      "token": this.token,
      "data": "{'pagination':{rows:50,page: 1,sidx:'',sord:'ASC'},'queryJson':\"{'StartTime':'" + this.sm + "','EndTime':'" + this.now + "'}\"} "
    })).then(res => {
      var mychar1 = document.getElementById('first');
      var mychar2 = document.getElementById('second');
      var mychar3 = document.getElementById('third');
      var mychar4 = document.getElementById('default');
      if (res.data.Score.length == 0) {
        mychar1.style.display = "none";
        mychar2.style.display = "none";
        mychar3.style.display = "none";
        mychar4.style.display = "block";
      }
      if (res.data.Score.length == 1) {
        this.firstSName = res.data.Score[0].name;
        this.firstScore = res.data.Score[0].number;
        mychar1.style.display = "block";
        mychar2.style.display = "none";
        mychar3.style.display = "none";
        mychar4.style.display = "none";
      }
      if (res.data.Score.length == 2) {
        this.firstSName = res.data.Score[0].name;
        this.secondSName = res.data.Score[1].name;
        this.firstScore = res.data.Score[0].number;
        this.secondScore = res.data.Score[1].number;
        mychar1.style.display = "block";
        mychar2.style.display = "block";
        mychar3.style.display = "none";
        mychar4.style.display = "none";
      }
      if (res.data.Score.length >= 3) {
        this.firstSName = res.data.Score[0].name;
        this.secondSName = res.data.Score[1].name;
        this.thirdSName = res.data.Score[2].name
        this.firstScore = res.data.Score[0].number;
        this.secondScore = res.data.Score[1].number;
        this.thirdScore = res.data.Score[2].number
        mychar1.style.display = "block";
        mychar2.style.display = "block";
        mychar3.style.display = "block";
        mychar4.style.display = "none";
      }
    });
  }
  maintenanceRank() {
    var _that = this;
    var url = this.appServer + "/WyAppAll/eFaultRank";
    this.httpservice.post(url, JSON.stringify({
      "loginMark": this.loginMark,
      "token": this.token,
      "data": "{'pagination':{rows:50,page: 1,sidx:'',sord:'ASC'},'queryJson':\"{'StartTime':'" + this.sm + "','EndTime':'" + this.now + "'}\"} "
    })).then(res => {
      console.log(res)
      var mychar1 = document.getElementById('first');
      var mychar2 = document.getElementById('second');
      var mychar3 = document.getElementById('third');
      var mychar4 = document.getElementById('default');
      if (res.data.JX.length == 0) {
        mychar1.style.display = "none";
        mychar2.style.display = "none";
        mychar3.style.display = "none";
        mychar4.style.display = "block";
      }
      if (res.data.JX.length == 1) {
        this.firstMName = res.data.JX[0].name;
        this.firstMaintenance = res.data.JX[0].number;
        mychar1.style.display = "block";
        mychar2.style.display = "none";
        mychar3.style.display = "none";
        mychar4.style.display = "none";
      }
      if (res.data.JX.length == 2) {
        this.firstMName = res.data.JX[0].name;
        this.secondMName = res.data.JX[1].name;
        this.firstMaintenance = res.data.JX[0].number;
        this.secondMaintenance = res.data.JX[1].number;
        mychar1.style.display = "block";
        mychar2.style.display = "block";
        mychar3.style.display = "none";
        mychar4.style.display = "none";
      }
      if (res.data.JX.length >= 3) {
        this.firstMName = res.data.JX[0].name;
        this.secondMName = res.data.JX[1].name;
        this.thirdMName = res.data.JX[2].name
        this.firstMaintenance = res.data.JX[0].number;
        this.secondMaintenance = res.data.JX[1].number;
        this.thirdMaintenance = res.data.JX[2].number
        mychar1.style.display = "block";
        mychar2.style.display = "block";
        mychar3.style.display = "block";
        mychar4.style.display = "none";
      }
    });
  }
}
