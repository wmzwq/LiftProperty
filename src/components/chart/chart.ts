import { Component } from '@angular/core';
import * as echarts from 'echarts';
/**
 * Generated class for the ChartComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'chart',
  templateUrl: 'chart.html'
})
export class ChartComponent {

  text: string;
  chart: any;
  ec: any = echarts;
  constructor() {
    console.log('Hello ChartComponent Component');
    this.text = 'Hello World';
    this.clickChart1();
  }
  clickChart1(){
        
    this.chart = document.getElementById('chart');
    const chart1 = this.ec.init(this.chart);
    let current = 25;// 当前用量
    let all = 100;// 总量
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
                    { value: all - current, name: '任务总数', itemStyle: { color: '#3497FD' } },
                    { value: current, name: '逾期任务', itemStyle: { color: '#FF5858' } },
                    { value: all, name: '隐藏', itemStyle: { color: 'transparent' } }
                ]
            }
        ]
      
    }, true);
    this.chart.removeAttribute("_echarts_instance_");
  }

}
