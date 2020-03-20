import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as echarts from 'echarts';
import { url } from "../../providers/Constants";
/**
 * Generated class for the RundataPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rundata',
  templateUrl: 'rundata.html',
})
export class RundataPage {
  choice: string = "choice1";
  ec: any = echarts;
  chartContainer: any;
  list: any[];
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
  now;
  public time = '';
  public date = '';
  public week = '';
    appServer: string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
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
   this.now=now;
  }
  clickChart1() {
var dataAxis = [1,2,3,4,5,6,7,8,9,10];
var data = [50, 20, 90, 10, 30, 20, 40, 60, 70, 80];
var dataShadow = [];
    const chart1 = this.ec.init(this.chartContainer);
    chart1.setOption({
      title: {
       
      },
      tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
      xAxis: {
      
          data: dataAxis,
          max: 9,
          axisLabel: {
            interArrival:0,
            
        },
          axisTick: {
              show: false
          },
          axisLine: {
              show: false
          },
          z: 10
      },
      yAxis: {
          type: 'value',  
           axisLabel: {
                        show: true,  
                        interval: 'auto',  
                        formatter: '{value} %'  
                      },  
                         
          axisLine: {
              show: false
          },
          axisTick: {
              show: false
          },
         
      },
     
      series: [
          { // For shadow
              type: 'bar',
              itemStyle: {
                  normal: {color: 'rgba(0,0,0,0.05)'}
              },
              barGap:'-100%',
              barCategoryGap:'40%',
              data: dataShadow,
              animation: false
          },
          {
              type: 'bar',
              itemStyle: {
                  normal: {
                      color: new echarts.graphic.LinearGradient(
                          0, 0, 0, 1,
                          [
                              {offset: 0, color: '#83bff6'},
                              {offset: 0.5, color: '#188df0'},
                              {offset: 1, color: '#188df0'}
                          ]
                      )
                  },
                  emphasis: {
                      color: new echarts.graphic.LinearGradient(
                          0, 0, 0, 1,
                          [
                              {offset: 0, color: '#2378f7'},
                              {offset: 0.7, color: '#2378f7'},
                              {offset: 1, color: '#83bff6'}
                          ]
                      )
                  }
              },
              data: data,
              name :'楼层使用率',
          }
      ]
      
    }, true);
    this.chartContainer.removeAttribute("_echarts_instance_");
  }

  clickChart2() {
    
    var dataAxis = ["0:00", "1:00", "2:00", "3:00", "4:00","5:00", "6:00", "7:00", "8:00", "9:00","10:00", "11:00", "12:00", "13:00", "14:00","15:00", "16:00", "17:00", "18:00", "19:00","20:00", "21:00", "22:00", "23:00"];
    var data = [10, 20, 90, 10, 30, 20, 40, 60, 70, 80,10,20,30,40,50,60,70,52,95,25,15,32,22,22];
    var dataShadow = [];
        const chart3 = this.ec.init(this.chartContainer);
        chart3.setOption({
          title: {
           
          },
          tooltip : {
              trigger: 'axis',
              axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                  type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
              }
          },
          xAxis: {
              type : 'category',
              data: dataAxis,
              axisLabel: {
                interArrival:0,
                interval:2,
            },
          
              axisTick: {
                  show: false
              },
              axisLine: {
                  show: false
              },
              z: 10
          },
          yAxis: {
          
              type: 'value',  
               axisLabel: {  
                              show: true,  
                              interval: 'auto',  
                              formatter: '{value} %'  
                          },  
                             
              axisLine: {
                  show: false
              },
              axisTick: {
                  show: false
              },
             
          },
         
          series: [
              { // For shadow
                  type: 'bar',
                 
                  itemStyle: {
                      normal: {color: 'rgba(0,0,0,0.05)'}
                  },
                  barGap:'-100%',
                  barCategoryGap:'40%',
                  data: dataShadow,
                  animation: false
                
              },
              {
                  type: 'bar',
                  itemStyle: {
                      normal: {
                          color: new echarts.graphic.LinearGradient(
                              0, 0, 0, 1,
                              [
                                  {offset: 0, color: '#83bff6'},
                                  {offset: 0.5, color: '#188df0'},
                                  {offset: 1, color: '#188df0'}
                              ]
                          )
                      },
                      emphasis: {
                          color: new echarts.graphic.LinearGradient(
                              0, 0, 0, 1,
                              [
                                  {offset: 0, color: '#2378f7'},
                                  {offset: 0.7, color: '#2378f7'},
                                  {offset: 1, color: '#83bff6'}
                              ]
                          )
                      }
                  },
                  data: data,
                  name :'百分比',
              }
              
          ]
    
        }, true);
        this.chartContainer.removeAttribute("_echarts_instance_");
      }

  clickChart3() {
var dataAxis = ["0:00", "1:00", "2:00", "3:00", "4:00","5:00", "6:00", "7:00", "8:00", "9:00","10:00", "11:00", "12:00", "13:00", "14:00","15:00", "16:00", "17:00", "18:00", "19:00","20:00", "21:00", "22:00", "23:00"];
var data = [50, 20, 90, 10, 30, 20, 40, 60, 70, 80,10,20,30,40,50,60,70,52,95,25,15,32,22,22];
var dataShadow = [];
    const chart3 = this.ec.init(this.chartContainer);
    chart3.setOption({
      xAxis: {
        type: 'category',
        data: ['06:00', '12:00', '18:00','00:00',]
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: [120, 200, 150, 80,],
        type: 'bar'
    }]
      
    }, true);
    this.chartContainer.removeAttribute("_echarts_instance_");
  }

  clickChart4() {
    var dataAxis = [this.now, "2018-07-06", "2018-07-07", "2018-07-08", "2018-07-09","2018-07-10", "2018-07-11", "2018-07-12", "2018-07-13", "2018-07-14","2018-07-15", "2018-07-16", "2018-07-17", "2018-07-18", "2018-07-19"];
    var data = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100,10,20,30,40,50];
    var dataShadow = [];
    const chart4 = this.ec.init(this.chartContainer);
    chart4.setOption({
      title: {
           
      },
      tooltip : {
          trigger: 'axis',
          axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
      },
      xAxis: {
          type : 'category',
          data: dataAxis,
          axisLabel: {
            interArrival:0,
            interval:0,
             textStyle: {
            fontSize: 8
        }
        },
      
          axisTick: {
              show: false
          },
          axisLine: {
              show: false
          },
          z: 10
      },
      yAxis: {
      
          type: 'value',  
           axisLabel: {  
                          show: true,  
                          interval: 'auto',  
                          formatter: '{value} %'  
                      },  
                         
          axisLine: {
              show: false
          },
          axisTick: {
              show: false
          },
         
      },
     
      series: [
          { // For shadow
              type: 'bar',
             
              itemStyle: {
                  normal: {color: 'rgba(0,0,0,0.05)'}
              },
              barGap:'-100%',
              barCategoryGap:'40%',
              data: dataShadow,
              animation: false
            
          },
          {
              type: 'bar',
              itemStyle: {
                  normal: {
                      color: new echarts.graphic.LinearGradient(
                          0, 0, 0, 1,
                          [
                              {offset: 0, color: '#83bff6'},
                              {offset: 0.5, color: '#188df0'},
                              {offset: 1, color: '#188df0'}
                          ]
                      )
                  },
                  emphasis: {
                      color: new echarts.graphic.LinearGradient(
                          0, 0, 0, 1,
                          [
                              {offset: 0, color: '#2378f7'},
                              {offset: 0.7, color: '#2378f7'},
                              {offset: 1, color: '#83bff6'}
                          ]
                      )
                  }
              },
              data: data,
              name :'百分比',
          }
          
      ]
      
    }, true);
    this.chartContainer.removeAttribute("_echarts_instance_");
  }

  segmentChanged(e) {
    if (e.value == "choice1") {
      this.clickChart1();
    } else if (e.value == "choice2") {
      this.clickChart2();
    } else if (e.value == "choice3") {
      this.clickChart3();
    } else if (e.value == "choice4") {
      this.clickChart4();
    }
 
  }

  ionViewDidEnter() {
    this.chartContainer = document.getElementById('chartContainer');
    this.clickChart1();
  }

}
