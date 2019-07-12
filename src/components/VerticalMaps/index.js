import React from 'react'
import {connect} from 'react-redux'
import {graphActions} from '../../actions/graphActions'
import Chart from 'chart.js';

import _ from 'lodash'
import * as moment from 'moment';
import $ from "jquery";

class VerticalMap extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      ctxLabel: this.months,
      ctxData1: [],
      ctxColor1: '#69b2f8',
      ctxColor2: '#69b2f8',
      data: props.graphData.data,
      df4: [
        [0,0],
        [1,0],
        [2,0],
        [3,0],
        [4,0],
        [5,0],
        [6,0],
        [7,0],
        [8,0],
        [9,0],
        [10,0],
        [11,0],
        [12,0],
        [13,0],
        [14,0],
        [15,0],
        [16,0],
        [17,0],
        [18,0],
        [19,0],
        [20,0],
        [21,0],
        [22,0],
        [23,0],
        [24,0],
        [25,0],
        [26,0],
        [27,0],
        [28,0],
        [29,0],
        [30,0],
        [31,0],
        [32,0],
        [33,0],
        [34,0],
        [35,0],
        [36,0],
        [37,0],
        [38,0],
        [39,0],
        [40,10],
        [41,0],
        [42,0],
        [43,0],
        [44,45],
        [45,0],
        [46,0],
        [47,37],
        [48,0],
        [49,39],
        [50,0],
        [51,0],
        [52,0],
        [53,5],
        [54,0],
        [55,31],
        [56,0],
        [57,43],
        [58,0],
        [59,0],
        [60,30],
        [61,0],
        [62,0],
        [63,0],
        [64,0],
        [65,0],
        [66,0],
        [67,0],
        [68,0],
        [69,0]
      ]
    }
  }
  months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  componentDidMount(){
    const data = this.data;
    const max = Math.max(...data);
    console.log("Data ", data)

    var ctx2 = document.getElementById('chartBar21').getContext('2d');
    new Chart(ctx2, {
      type: 'horizontalBar',
      data: {
        labels: this.months,
        datasets: [{
          data,
          backgroundColor: this.state.ctxColor1
        }
        ]
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        legend: {
          display: false,
          labels: {
            display: false
          }
        },
        tooltips: {
          callbacks: {
            label: function(tooltipItem, data) {
              var value = data.datasets[0].data[tooltipItem.index];
              return  '₦' + value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
            }
          } // end callbacks:
        }, //end tooltips
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero:true,
              userCallback: function(value) {
                return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
              }
            }
          }],
          xAxes: [{
            gridLines: {
              color: '#e5e9f2'
            },
            barPercentage: 0.6,
            ticks: {
              beginAtZero:true,
              fontSize: 11,
              fontColor: '#182b49',
              max
            }
          }]
        }
      }
    });

  }

  get data(){
    const updatedData = this.props.monthlySku.map(newData => {
      const date = new Date(newData.date);
      const month = this.months[date.getMonth()];
      delete newData.date;
      return {
        month,
        ...newData
      }
    });
    const groupedData = _.groupBy(updatedData, 'month');
    let summation = Object.keys(groupedData).reduce((obj, month) => {
      const items = groupedData[month];
      const itemTotal = Math.ceil(items.reduce((total, item) => total + item.skus, 0));
      return {
        ...obj,
        [month]: itemTotal
      }
    }, {});
    return this.months.map(month => summation[month] ? summation[month] : 0);
  }



  render(){
    return (




    <div data-label="Example" className="df-example">
      <div className="ht-250 ht-lg-300">
        <div className="chartjs-size-monitor"
             style={{position: 'absolute', left: '0px', top: '0px', right: '0px', bottom: '0px', overflow: 'hidden', pointerEvents: 'none', visibility: 'hidden', zIndex: -1}}>
          <div className="chartjs-size-monitor-expand"
               style={{position: 'absolute', left:0, top:0,right:0,bottom:0, overflow:'hidden',pointerEvents:'none', visibility:'hidden', zIndex:-1}}>
            <div style={{position:'absolute', width: '1000000px', height:'1000000px' ,left:0, top:0}}></div>
          </div>
          <div className="chartjs-size-monitor-shrink"
               style={{position: 'absolute', left:0, top:0,right:0,bottom:0, overflow:'hidden',pointerEvents:'none', visibility:'hidden', zIndex:-1}}>>
            <div style={{position:'absolute',width:'200%',height:'200%', left:0, top:0}}></div>
          </div>
        </div>
        <canvas id="chartBar21" width="728" height="300" className="chartjs-render-monitor"
                style={{display: 'block', width: '728px', height: '300px'}}></canvas>
      </div>
    </div>





      /*<div>
        <hr className="mg-y-50 mg-b-40" />
        <h4 id="section2" className="mg-b-10">Horizontal Chart</h4>
        <p className="mg-b-30">Below is the horizontal bar chart example.</p>
        <div data-label="Example" className="df-example">
          <div className="ht-250 ht-lg-300"><canvas id="chartBar21" /></div>
        </div>{/!* df-example *!/}
      </div>*/

    )
  }
}


function mapStateToProps(state) {
  return {
    monthlySku: state.graphData.skuData,
    graphData: state.graphData,
  }
}

function matchDispatchToProps(dispatch) {
  return {
    onGetGraphData() {
      dispatch(graphActions.querySku())
    }

  }
}


export default connect(
  mapStateToProps,
  matchDispatchToProps)
(VerticalMap);