import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AbnormalDetailsPage } from '../abnormal-details/abnormal-details';
import { HttpSerProvider } from '../../app/http-serve';
import { url } from "../../providers/Constants";
@IonicPage()
@Component({
  selector: 'page-safty-lift-list',
  templateUrl: 'safty-lift-list.html',
})
export class SaftyLiftListPage {
  mainPage: string = "off-line";
  loginMark: string;
  token: string;
  offlineList: any;
  faultList: any;
  off: any[];
  fau: any[];
  appServer: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private httpservice: HttpSerProvider, private loadingCtrl: LoadingController, ) {
    this.loginMark = window.localStorage.getItem('loginMark');
    this.token = window.localStorage.getItem('token');
    this.appServer=url;
    this.offlineState();

  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad SaftyLiftListPage');
  }
  segmentChanged(e) {
    if (e.value == "off-line") {
      this.offlineState();
    } else if (e.value == "abnormal") {
      this.faultState();

    }

  }
  offlineState() {
    var loader = this.loadingCtrl.create({
      content: "数据通讯中，请稍候！",
      duration: 10000,

    });
    loader.present();
    var _that = this;
    var url =this.appServer+ "/WyAppAll/eStatusStatistics";

    this.httpservice.post(url, JSON.stringify({
      "loginMark": this.loginMark,
      "token": this.token,
      "data": "{'pagination':{rows:50,page: 1,sidx:'',sord:'ASC'},'queryJson':\"{'type':'2'}\"} "
    })).then(res => {
      _that.offlineList = res.data.offline;
      if (_that.offlineList.length == 0) {
        const mychar4 = document.getElementById('delay');
        mychar4.style.display = "block";
        
      }
      else {
        this.offline();
      }
    });
    loader.dismiss()
  }

  offline() {
    var newObj = [];
    var url = this.appServer+"/WyAppAll/eStatusStatistics";
    for (var i = 0; i < this.offlineList.length; i++) {
      this.httpservice.post(url, JSON.stringify({
        "loginMark": this.loginMark,
        "token": this.token,
        "data": "{'pagination':{rows:50,page: 1,sidx:'',sord:'ASC'},'queryJson':\"{'type':'" + this.offlineList[i]["prejectId"] + "'}\"} "
      })).then(res => {

        newObj = newObj.concat(res.data.offline); //合并成一个数组
        var temp = {}; //用于id判断重复
        var result = [] //最后的新数组
        //遍历c数组，将每个item.id在temp中是否存在值做判断， 
        newObj.map((item, index) => {
          if (!temp[item.Ecollection]) {
            result.push(item);
            temp[item.Ecollection] = true
          }
        })


        console.log(result)
        var des = [];
        for (var i = 0; i < result.length; i++) {
          var m = {
            "F_ProjectName": result[i]["F_ProjectName"],
            "Ename": result[i]["Ename"]
          };
          des.push(m);
        }
        console.log(des)

        var map = {};
        this.off = [];
        for (var j = 0; j < result.length; j++) {
          var ai = result[j];
          if (!map[ai.F_ProjectName]) { //id 依赖字段 可自行更改
            this.off.push({
              F_ProjectName: ai.F_ProjectName, //id  依赖字段 可自行更改

              data: [ai.Ename]
            });
            map[ai.F_ProjectName] = ai;
          } else {
            for (var h = 0; h < this.off.length; h++) {
              var dj = this.off[h];
              if (dj.F_ProjectName == ai.F_ProjectName) { //id 依赖字段 可自行更改
                dj.data.push(ai.Ename);
                break;
              }
            }
          }
        }

        console.log(this.off);

      });
    }
  }
  faultState() {
    var loader = this.loadingCtrl.create({
      content: "数据通讯中，请稍候！",
      duration: 10000,

    });
    loader.present();
    var _that = this;
    var url = this.appServer+"/WyAppAll/eStatusStatistics";

    this.httpservice.post(url, JSON.stringify({
      "loginMark": this.loginMark,
      "token": this.token,
      "data": "{'pagination':{rows:50,page: 1,sidx:'',sord:'ASC'},'queryJson':\"{'type':'2'}\"} "
    })).then(res => {
      _that.faultList = res.data.fault;
      if (_that.faultList.length == 0) {

        const mychar4 = document.getElementById('delay');

        mychar4.style.display = "block";

      }
      else {
        this.fault();
      }
      loader.dismiss()
    });

  }

  fault() {
    var newObj = [];

    var _that = this;
    var url =this.appServer+ "/WyAppAll/eStatusStatistics";
    for (var i = 0; i < this.faultList.length; i++) {
      this.httpservice.post(url, JSON.stringify({
        "loginMark": this.loginMark,
        "token": this.token,
        "data": "{'pagination':{rows:50,page: 1,sidx:'',sord:'ASC'},'queryJson':\"{'type':'" + this.faultList[i]["prejectId"] + "'}\"} "
      })).then(res => {

        newObj = newObj.concat(res.data.fault); //合并成一个数组
        var temp = {}; //用于id判断重复
        var result = [] //最后的新数组
        //遍历c数组，将每个item.id在temp中是否存在值做判断， 
        newObj.map((item, index) => {
          if (!temp[item.Ecollection]) {
            result.push(item);
            temp[item.Ecollection] = true
          }
        })


        console.log(result)

        var des = [];
        for (var i = 0; i < result.length; i++) {
          var m = {
            "F_ProjectName": result[i]["F_ProjectName"],
            "Ename": result[i]["Ename"]
          };
          des.push(m);
        }
        console.log(des)

        var map = {};
        this.fau = [];
        for (var j = 0; j < result.length; j++) {
          var ai = result[j];
          if (!map[ai.F_ProjectName]) { //id 依赖字段 可自行更改
            this.fau.push({
              F_ProjectName: ai.F_ProjectName, //id  依赖字段 可自行更改

              data: [ai.Ename]
            });
            map[ai.F_ProjectName] = ai;
          } else {
            for (var h = 0; h < this.fau.length; h++) {
              var dj = this.fau[h];
              if (dj.F_ProjectName == ai.F_ProjectName) { //id 依赖字段 可自行更改
                dj.data.push(ai.Ename);
                break;
              }
            }
          }
        }
        console.log(this.fau);

      });
    }

  }
  gotoAbDetailsPage() {
    this.navCtrl.push(AbnormalDetailsPage);
  }
}