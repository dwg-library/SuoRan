
import ReactEcharts from 'echarts-for-react';
import styles from './charts.css';
import React,{ Component } from 'react';
import {Card,Button} from 'antd'

export default class Bar extends Component{
  state={
    sales:[30, 40, 10, 35, 50, 40],
    store:[20, 26, 12, 35, 60, 20]
  }
  update=()=>{
    this.setState(state=>({
      sales:state.sales.map(sale=>sale+1),
      store:state.store.reduce((pre,store)=>{
        pre.push(store-1)
        return pre
      },[])
    }))
  }

  option=(sales,store)=>{
      return{
        title: {
          text: '数据统计'
      },
      tooltip: {},
      legend: {
          data:['数量','访问']
      },
      xAxis: {
          data: ["用户","商品","反馈","地址","订单","记录"]
      },
      yAxis: {},
      series: [{
          name: '数量',
          type: 'bar',
          data: sales
      },{
        name: '访问',
        type: 'bar',
        data: store
    }]
      }
  }

  bar=()=>{
    return{
      backgroundColor: '#2c343c',
    title: {
        text: '数据分析',
        left: 'center',
        top: 20,
        textStyle: {
            color: '#ccc'
        }
    },

    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },

    visualMap: {
        show: false,
        min: 80,
        max: 600,
        inRange: {
            colorLightness: [0, 1]
        }
    },
    series : [
        {
            name:'访问来源',
            type:'pie',
            radius : '55%',
            center: ['50%', '50%'],
            data:[
                {value:335, name:'直接访问'},
                {value:310, name:'邮件营销'},
                {value:274, name:'联盟广告'},
                {value:235, name:'视频广告'},
                {value:400, name:'搜索引擎'}
            ].sort(function (a, b) { return a.value - b.value; }),
            roseType: 'radius',
            label: {
                normal: {
                    textStyle: {
                        color: 'rgba(255, 255, 255, 0.3)'
                    }
                }
            },
            labelLine: {
                normal: {
                    lineStyle: {
                        color: 'rgba(255, 255, 255, 0.3)'
                    },
                    smooth: 0.2,
                    length: 10,
                    length2: 20
                }
            },
            itemStyle: {
                normal: {
                    color: '#c23531',
                    shadowBlur: 200,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            },

            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function (idx) {
                return Math.random() * 200;
            }
        }
    ]
    }
  }
  line=()=>{
    return{
      title: {
        text: '每天统计'
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['周一','周二','周三','周四','周五','周六','周日']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name:'邮件营销',
            type:'line',
            stack: '总量',
            data:[120, 132, 101, 134, 90, 230, 210]
        },
        {
            name:'联盟广告',
            type:'line',
            stack: '总量',
            data:[220, 182, 191, 234, 290, 330, 310]
        },
        {
            name:'视频广告',
            type:'line',
            stack: '总量',
            data:[150, 232, 201, 154, 190, 330, 410]
        },
        {
            name:'直接访问',
            type:'line',
            stack: '总量',
            data:[320, 332, 301, 334, 390, 330, 320]
        },
        {
            name:'搜索引擎',
            type:'line',
            stack: '总量',
            data:[820, 932, 901, 934, 1290, 1330, 1320]
        }
    ]
    }
  }

  render(){
    const {sales,store}=this.state
    return (
    <div>
      <Card>
        <Button type="primary" onClick={this.update}>更新 </Button>
      </Card>
      <Card>
      <ReactEcharts option={this.option(sales,store)} style={{ height: '400px', width: '900px' }} />
      </Card>
      <Card>
      <ReactEcharts option={this.bar()} style={{ height: '300px', width: '900px' }} />
      </Card>
      <Card>
      <ReactEcharts option={this.line()} style={{ height: '400px', width: '900px' }} />
      </Card>

    </div>
  );
  }
} 



// 1. 高阶函数
//   1）是一类特别的函数，接受的参数是函数类型，返回值是函数
//   2）常见的高阶函数
//   a.定时器：setTimeout()/setInterval()
//   b.Promise:Promise(()=>{})then(value=>{},reason=>{})
//   c.数组遍历相关的方法：forEach()/filter()/map()/find()/findIndex()
//   d.函数对象的bind()
//   e.Form.create()/getFieldDecorator()()
//   3)高阶函数更加动态，更加具有扩展性
// 2.高阶组件
// 1)本质就是一个函数
// 2)接受一个组件(被包装组件)，返回一个新的组件(包装组件)，包装组件回想被包装组件传入特定属性
// 3)作用：扩展组件的功能
// 4)高阶组件也是高阶函数：接受一个组件函数，返回是一个新的组件函数



