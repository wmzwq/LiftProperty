import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import * as echarts from 'echarts';
import { HttpSerProvider } from '../../app/http-serve';
import { url } from "../../providers/Constants";
/**
 * Generated class for the EchartsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-echarts',
  templateUrl: 'echarts.html',
})
export class EchartsPage {
  ec: any = echarts;
  chartContainer: any;
  @ViewChild('chart') chart: ElementRef;
  ecollection: any;
  loginMark: string;
  token: string;
  Ename: any;
  Eaddress: any;
  Pname: any;
  appServer: string;
  constructor(public navCtrl: NavController, public navParams: NavParams,private httpservice: HttpSerProvider, public toastCtrl: ToastController) {
    this.ecollection= this.navParams.data.ecollection;
    this.Pname= this.navParams.data.Pname;
    this.loginMark=window.localStorage.getItem('loginMark');
    this.token=window.localStorage.getItem('token');
    this.appServer=url
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EchartsPage');
  }
  ionViewDidEnter() {
   
    this.initChart();
    this.dt();
    
  }
  dt(){
    var url=this.appServer+"/WyAppAll/elevatorInfo";
  this.httpservice.post(url, JSON.stringify({
      "loginMark":this.loginMark,
        "token":this.token,
        "data": "{'pagination':{rows:50,page: 1,sidx:'',sord:'ASC'},'queryJson':\"{'F_EcollectionId':'"+this.ecollection+"'}\"} "
    })).then(res=>{
      console.log(res)
      this.Ename=res.data.rows[0].Ename;
      this.Eaddress=res.data.rows[0].Eaddress;
  });
  }
  initChart() {
    let element = this.chart.nativeElement;
 
    let myChart = echarts.init(element);
    myChart.setOption({
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
          smooth: true,
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
         
      itemStyle : { 
         normal : { 
         color:'#0066FF', //改变折线点的颜色
         lineStyle:{ 
         color:'#99CCFF' //改变折线颜色
         } 
         }
        }
      }]
    });
  }
    
}
