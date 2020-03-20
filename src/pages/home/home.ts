import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, Platform, IonicPage, LoadingController, App } from 'ionic-angular';
import * as echarts from 'echarts';
import { SaftyLiftListPage } from '../safty-lift-list/safty-lift-list';
import { RankListPage } from '../rank-list/rank-list';
import { MaintainDetailsPage } from '../maintain-details/maintain-details';
import { UserPage } from '../user/user';
import { MessagePage } from '../message/message';
import { HttpSerProvider } from '../../app/http-serve';
import { BaseUI } from '../../components/baseui';
import $ from 'jquery'
import { url } from "../../providers/Constants";
import { LoginPage } from '../login/login';
//  @IonicPage()
@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})

export class HomePage extends BaseUI {
    mainPage: string = "safetyAnaly";
    segmentsArray = ['safetyAnaly', 'maintenance', 'annualSurvey'];
    segmentModel: string = this.segmentsArray[0];
    ec: any = echarts;
    chart: any;
    loginMark: string;
    token: string;
    normal: any;
    fault: any;
    offline: any;
    eleNumber: any;
    tasksNumber: any;
    annualInspection: any;
    appServer: string;
    constructor(public navCtrl: NavController, public navParams: NavParams, platform: Platform, private httpservice: HttpSerProvider, public loadCtrl: LoadingController, public app: App) {
        super();
        this.loginMark = window.localStorage.getItem('loginMark');
        this.token = window.localStorage.getItem('token');
        this.appServer = url
    }

    swipeEvent(event) {
        //向左滑
        if (event.direction == 2) {
            if (this.segmentsArray.indexOf(this.segmentModel) < 2) {
                this.segmentModel = this.segmentsArray[this.segmentsArray.indexOf(this.segmentModel) + 1];
            }

        }
        //向右滑
        if (event.direction == 4) {
            if (this.segmentsArray.indexOf(this.segmentModel) > 0) {
                this.segmentModel = this.segmentsArray[this.segmentsArray.indexOf(this.segmentModel) - 1];
            }

        }
    }

    ionViewDidEnter() {
        this.chart = document.getElementById('chart');
        this.state();

    }

    segmentChanged(e) {
        if (e.value == "safetyAnaly") {
            this.state();
        } else if (e.value == "maintenance") {
            this.clickChart2();
        } else if (e.value == "annualSurvey") {
            this.clickChart3();
        }

    }
    ionViewWillLeave() {
        this.segmentModel = this.segmentsArray[0];

    }
    clickChart3() {
        var mychar4 = document.getElementById('m');
        mychar4.style.display = "none";
        var url = this.appServer + "/WyAppAll/GetYearTestList";
        this.httpservice.post(url, JSON.stringify({
            "loginMark": this.loginMark,
            "token": this.token,
            "data": "{'pagination':{rows:50,page: 1,sidx:'',sord:'ASC'},'queryJson':\"{'KeyValue':''}\"} "
        })).then(res => {
            console.log(res)
            if (res.data.records == 0) {
                var myChar = document.getElementById('delay');
                var myChar1 = document.getElementById('list-title');
                myChar.style.display = "block";
                myChar1.style.display = "none";
            }
            this.annualInspection = res.data.rows;
        })

    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad StatisticsPage');
    }

    clickChart2() {
        var mychar4 = document.getElementById('m');
        var mychar2 = document.getElementById('chart-hint');
        var mychar1 = document.getElementById('child2');
        var mychar5 = document.getElementById('child1');
        mychar4.style.display = "block";
        mychar1.style.display = "block";
        mychar5.style.display = "none";
        mychar2.style.display = "block";
        $('#chart-footer').hide();
        const ec = echarts as any;
        var myChart = ec.init(document.getElementById('chart'));
        let current = 25;// 当前用量
        let all = 100;// 总量
        var optionchart = {
            series: [
                {
                    name: '任务数量',
                    type: 'pie',
                    center: ['50%', '70%'],
                    radius: ['80%', '100%'],
                    startAngle: 180,
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '16',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: [
                        { value: all - current, name: '任务总数', itemStyle: { color: '#3497FD' } },
                        { value: current, name: '逾期任务', itemStyle: { color: '#FFA681' } },
                        { value: all, name: '隐藏', itemStyle: { color: 'transparent' } }
                    ]
                }
            ]
        }
        myChart.setOption(optionchart);


    }


    state() {
        var mychar4 = document.getElementById('m');
        var mychar2 = document.getElementById('chart-hint');
        var mychar1 = document.getElementById('child2');
        var mychar5 = document.getElementById('child1');
        mychar4.style.display = "block";
        mychar1.style.display = "none";
        mychar5.style.display = "block";
        mychar2.style.display = "none";
        $('#chart-footer').show();
        var loading = super.showLoading(this.loadCtrl, "加载中...");
        var url = this.appServer + "/WyAppAll/eStatusStatistics";
        this.httpservice.post(url, JSON.stringify({
            "loginMark": this.loginMark,
            "token": this.token,
            "data": "{'pagination':{rows:50,page: 1,sidx:'',sord:'ASC'},'queryJson':\"{'type':'1'}\"} "
        })).then(res => {
            //   _that.list=res.data.rows;
            //   this.cellNumber=res.data.records;
            if (res.info === "未找到登录信息") {
                this.app.getRootNav().setRoot(LoginPage);
            }
            else {
                this.chart = document.getElementById('chart');
                const chart1 = this.ec.init(this.chart);
                let normal = res.data.normal;//正常
                let fault = res.data.fault;//异常
                let offline = res.data.offline;//离线
                let all = normal + fault + offline;// 总数
                this.tasksNumber = all;
                chart1.setOption({
                    series: [
                        {
                            name: '任务数量',
                            type: 'pie',
                            center: ['50%', '70%'],
                            radius: ['80%', '100%'],
                            startAngle: 180,
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    show: false,
                                    position: 'center'
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '16',
                                        fontWeight: 'bold'
                                    }
                                }
                            },

                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data: [
                                { value: normal, name: '正常', itemStyle: { color: '#3ACCE1' } },
                                { value: fault, name: '异常', itemStyle: { color: '#FFA681' } },
                                { value: offline, name: '离线', itemStyle: { color: '#CFCFCF' } },
                                { value: all, name: '隐藏', itemStyle: { color: 'transparent' } }
                            ]
                        }
                    ]

                }, true);
                this.chart.removeAttribute("_echarts_instance_");
            }
            loading.dismiss();
            console.log(res.data)
        });
    }
    dt() {
        var url = this.appServer + "/WyAppAll/elevatorInfo";
        this.httpservice.post(url, JSON.stringify({
            "loginMark": this.loginMark,
            "token": this.token,
            "data": "{'pagination':{rows:50,page: 1,sidx:'',sord:'ASC'},'queryJson':\"{'projectId':''}\"} "
        })).then(res => {

            this.eleNumber = res.data.records;

        });
    }
    gotoLiftPage() {
        this.navCtrl.push(SaftyLiftListPage);
    }
    gotoRankPage() {
        this.navCtrl.push(RankListPage);
    }
    gotoMaintainPage() {
        this.navCtrl.push(MaintainDetailsPage);
    }

    gotoUserPage() {
        this.navCtrl.push(UserPage);
    }

    gotoMessagePage() {
        this.navCtrl.push(MessagePage);
    }
}

