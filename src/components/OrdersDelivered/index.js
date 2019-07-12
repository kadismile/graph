import React from 'react';
import _ from 'lodash';
import Chart from 'chart.js';
import {connect} from 'react-redux';
import {graphActions} from "../../actions/graphActions";
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import {daysAgo} from '../../helpers/daysAgo'
const moment = extendMoment(Moment);



class DeliveredAmounts extends React.Component{

  state = {
    ctxLabel: ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th'],
    ctxData1: [20, 60, 50, 45, 50, 60, 70, 40, 45, 35, 25, 30],
    ctxData2: [10, 40, 30, 40, 60, 55, 45, 35, 30, 20, 15, 20],
    ctxColor1: '#001737',
    ctxColor2: '#1ce1ac',
    thisMonthData: [],
    lastMonthData: [],
  };

  async componentDidMount() {
    this.props.onGetGraphData();
    let dailyShippingStatus = this.props.dailyDelivery;
    let startDate1 = moment(new Date()).format('MMMM DD, YYYY');
    let startDate2 = moment(new Date()).subtract(30, 'days').format('MMMM DD, YYYY');
    let data1 = daysAgo(startDate1, 30 ,dailyShippingStatus);
    let data2 = daysAgo(startDate2, 30 ,dailyShippingStatus);


    let scale = 5;
    await this.setState({
      thisMonthData: data1,
      lastMonthData: data2
    });
    let thisMonth, lastMonth;
    if(this.state.thisMonthData.length >= 30 ){

      console.log("Month Data ", this.state.thisMonthData)

      let thisMonthvalue = _.map(this.state.thisMonthData, "dimension").splice(0,12);
      thisMonth = thisMonthvalue.map((val)=> {return val  } );
      let lastMonthvalue = _.map(this.state.lastMonthData, "dimension").splice(0,12);
      lastMonth = lastMonthvalue.map((val)=> {return val } )
    }



    var ctx4 = document.getElementById('chartLine1');
    new Chart(ctx4, {
      type: 'line',
      data: {
        labels: this.state.ctxLabel,
        datasets: [{
          data: thisMonth,
          borderColor: this.state.ctxColor1,
          borderWidth: 1,
          fill: false
        },{
          data: lastMonth,
          borderColor: this.state.ctxColor2,
          borderWidth: 1,
          fill: false
        }]
      },
      options: {
        maintainAspectRatio: false,
        legend: {
          display: false,
          labels: {
            display: false
          }
        },
        scales: {
          yAxes: [{
            gridLines: {
              color: '#e5e9f2'
            },
            ticks: {
              beginAtZero:true,
              fontSize: 10,
              max: Math.max(...thisMonth)
            }
          }],
          xAxes: [{
            gridLines: {
              display: false
            },
            ticks: {
              beginAtZero:true,
              fontSize: 11
            }
          }]
        }
      }
    });


  }

  thisMonth = (day, orders) => {
    let fromDate = moment().subtract(day, 'days').format('MMMM DD, YYYY');
    let toDate = moment(fromDate).subtract(day, 'days').format('MMMM DD, YYYY');
    let range = moment().range(toDate, fromDate);
    let array = Array.from(range.by("days"));
    let thisWeekDays = [];
    array.map(m => {thisWeekDays.push(m.format('MMMM DD, YYYY'))});
    console.log("thisWeekDays ", thisWeekDays);
    let thisWeeOrders = [];
    for ( let counter=0; counter<=thisWeekDays.length; counter++){
      let filteredOrders = _.filter(orders, (order)=> {
        return moment(order.date).format('MMMM DD, YYYY')  === thisWeekDays[counter]
      });
      thisWeeOrders = [...thisWeeOrders, ...filteredOrders];
    }
    return thisWeeOrders
  };

  render(){
    return (

      <div className="col-lg-6 col-xl-6 mg-t-6">
        <div className="card">
          <div style={{padding: '20px'}}>
            <h6 className="mg-b-0">Daily Deliveries</h6>
          </div>

            <ul className="list-inline d-flex mg-t-20 mg-sm-t-10 mg-md-t-0 mg-b-0">
              <li className="list-inline-item d-flex align-items-center">
                <span className="d-block wd-10 ht-10 bg-df-1 rounded mg-r-5" />
                <span className="tx-sans tx-uppercase tx-10 tx-medium tx-color-03">This Month</span>
              </li>
              <li className="list-inline-item d-flex align-items-center mg-l-5">
                <span className="d-block wd-10 ht-10 bg-df-2 rounded mg-r-5" />
                <span className="tx-sans tx-uppercase tx-10 tx-medium tx-color-03">Las Month</span>
              </li>

            </ul>

          <div className="card-body pos-relative pd-0">
            <div className="pos-absolute t-20 l-20 wd-xl-100p z-index-10">

            </div>

            <div data-label="Example" className="df-example">
              <div className="ht-250 ht-lg-300">
                <canvas id="chartLine1"></canvas>
              </div>
          </div>



          </div>
        </div>
      </div>

    )
  }
}

function mapStateToProps(state) {
  return {
    dailyDelivery: state.graphData.dailyDelivery,
  }
}

function matchDispatchToProps(dispatch) {
  return {
    onGetGraphData() {
      dispatch(graphActions.queryDailyDelivery())
    }

  }
}

export default connect(mapStateToProps, matchDispatchToProps)(DeliveredAmounts);