import React from 'react'
//import Chart from 'chart.js';

import '../../jquery'
import Raphael from 'raphael';
import 'morris.js/morris.css';
import 'morris.js/morris.js';

import {connect} from 'react-redux';
import {graphActions} from "../../actions/graphActions";
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import {daysAgo} from '../../helpers/daysAgo'
import _ from "lodash";
const moment = extendMoment(Moment);

class CancelReason extends React.Component {

  constructor() {
    super();
    this.state = {
      datapie:{
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [{
          data: [20,20,30,5,25],
          backgroundColor: ['#560bd0', '#007bff','#00cccc','#cbe0e3','#74de00']
        }]
      },
      optionpie: {
        maintainAspectRatio: false,
        responsive: true,
        legend: {
          display: false,
        },
        animation: {
          animateScale: true,
          animateRotate: true
        }
      },
      dateFilter: 'Today',
      reasonFilter: [],
      data:[]
    };
    window.Raphael = Raphael;
  }


  componentDidMount() {
    this.props.onGetGraphData();
    this.onDatefilter('today');
    console.log("Reason ", this.state.reasonFilter[0]);
    this.onReasonFilter('Customer not available');
    window.Morris.Donut({
      element: 'morrisDonut',
      data: [
        { label: "Renuzi  Ventures", value: 2 },
        { label: "In-Store Sales", value: 30 },
        { label: "Mail-Order Sales", value: 20 },
        { label: "Jumia-Order Sales", value: 50 }
      ],
      /*data: this.state.data*/
    });

    console.log("DATA ",this.state.data)
  }


  onDatefilter = (day) =>{
    let cancelReasons = this.props.cancelReasons;
    this.setState({
      dateFilter: day
    });

    if (day === 'today') {
      let todaysCancelReasons = _.filter(cancelReasons, function (m) {
        let date = moment(m.date).format('MMMM DD, YYYY');
        let today = moment(new Date()).format('MMMM DD, YYYY');
        return date === today
      });
      let reasons = [];
      todaysCancelReasons.map((o)=> {
        reasons.push(o.reasons)
      });
      let unique = [...new Set(reasons)];
      setTimeout(()=>{
        this.setState({
          reasonFilter: unique,
          data: todaysCancelReasons
        });
      },1200);
      console.log("SWEET DATA ",todaysCancelReasons)
    }

    if (day === 'yesterday') {
      let yesterday = moment().subtract(1, 'days').format('MMMM DD, YYYY');
      let yesterdaysCancelReasons = _.filter(cancelReasons, function (m) {
        let date = moment(m.date).format('MMMM DD, YYYY');
        return yesterday === date
      });
      let reasons = [];
      yesterdaysCancelReasons.map((o)=> {
        reasons.push(o.reasons)
      });
      let unique = [...new Set(reasons)];
      this.setState({
        reasonFilter: unique,
        data: yesterdaysCancelReasons
      });
    }

    if(day === 'this week'){
      let thisWeekCancelReasons = this.thisWeekData(7, cancelReasons);
      let reasons = [];
      thisWeekCancelReasons.map((o)=> {
        reasons.push(o.reasons)
      });
      let unique = [...new Set(reasons)];
      this.setState({
        reasonFilter: unique
      });
    }

    if(day === 'last week'){
      let lastWeekCancelReasons = this.lastWeekData(7, cancelReasons);
      let reasons = [];
      lastWeekCancelReasons.map((o)=> {
        reasons.push(o.reasons)
      });
      let unique = [...new Set(reasons)];
      this.setState({
        reasonFilter: unique
      });
    }

    else if (day === 'this month') {
      let thisMonthCancelReasons = this.thisMonth(cancelReasons);
      console.log(thisMonthCancelReasons);
      let reasons = [];
      thisMonthCancelReasons.map((o)=> {
        reasons.push(o.reasons)
      });
      let unique = [...new Set(reasons)];
      this.setState({
        reasonFilter: unique
      });
    }
  };

  onReasonFilter =(reason) => {
    let data = this.state.data;
    let filterData = data.filter((o)=>{
      return o.reasons === reason
    });
    var result = filterData.map(o => ({ label: o.dmiension, value:o.value }));
    this.setState({
      data: result
    });
    console.log(filterData)
  };

  thisWeekData = (day, orders) => {
    let fromDate = moment().format('MMMM DD, YYYY');
    let toDate = moment().subtract(day, 'days').format('MMMM DD, YYYY');
    let range = moment().range(toDate, fromDate);
    let array = Array.from(range.by("days"));
    let thisWeekDays = [];
    array.map(m => {thisWeekDays.push(m.format('MMMM DD, YYYY'))});
    let thisWeeOrders = [];
    for ( let counter=0; counter<=thisWeekDays.length; counter++){
      let filteredOrders = _.filter(orders, (order)=> {
        return moment(order.date).format('MMMM DD, YYYY')  === thisWeekDays[counter]
      });
      thisWeeOrders = [...thisWeeOrders, ...filteredOrders];
    }
    return thisWeeOrders
  };

  lastWeekData = (day, orders) => {
    let fromDate = moment().subtract(day, 'days').format('MMMM DD, YYYY');
    let toDate = moment(fromDate).subtract(day, 'days').format('MMMM DD, YYYY');
    let range = moment().range(toDate, fromDate);
    let array = Array.from(range.by("days"));
    let thisWeekDays = [];
    array.map(m => {thisWeekDays.push(m.format('MMMM DD, YYYY'))});
    let thisWeeOrders = [];
    for ( let counter=0; counter<=thisWeekDays.length; counter++){
      let filteredOrders = _.filter(orders, (order)=> {
        return moment(order.date).format('MMMM DD, YYYY')  === thisWeekDays[counter]
      });
      thisWeeOrders = [...thisWeeOrders, ...filteredOrders];
    }
    return thisWeeOrders
  };

  thisMonth = (orders) => {
    let fromDate = moment().startOf('month').format('MMMM DD, YYYY');
    let toDate = moment().endOf('month').format('MMMM DD, YYYY');
    let range = moment().range(fromDate, toDate);
    let array = Array.from(range.by("days"));
    let thisMonthDays = [];
    array.map(m => {thisMonthDays.push(m.format('MMMM DD, YYYY'))});
    let thisMonthOrders = [];
    for ( let counter=0; counter<=thisMonthDays.length; counter++){
      let filteredOrders = _.filter(orders, (order)=> {
        return moment(order.date).format('MMMM DD, YYYY')  === thisMonthDays[counter]
      });
      thisMonthOrders = [...thisMonthOrders, ...filteredOrders];
    }
    return thisMonthOrders
  };

  render (){
    return (
      <div className="col-lg-4 col-xl-4 mg-t-4">
        <div className="card">
          <div style={{padding: '20px'}}>
            <h6 className="tx-uppercase tx-11 tx-spacing-1 tx-color-02 tx-semibold mg-b-8">Cancel Reasons</h6>

              <div>
                <a href="#" className="d-flex align-items-center link-03 lh-0" id="dropdownMenuButton20"
                   data-toggle="dropdown" aria-haspopup="true"
                   aria-expanded="false" style={{float: 'right', textTransform: 'capitalize', fontSize: '12px'}}>{this.state.dateFilter}
                  <i className="icon ion-ios-arrow-down mg-l-5"/>
                </a>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton20">
                  <a className="dropdown-item" href="#" onClick={() => this.onDatefilter('today')}>today</a>
                  <a className="dropdown-item" href="#" onClick={() => this.onDatefilter('yesterday')}>yesterday</a>
                  <a className="dropdown-item" href="#" onClick={() => this.onDatefilter('this week')}>this week</a>
                  <a className="dropdown-item" href="#" onClick={() => this.onDatefilter('last week')}>last week</a>
                  <a className="dropdown-item" href="#" onClick={() => this.onDatefilter('this month')}>this month</a>
                </div>
              </div>
              <div>
                <a href="#" className="d-flex align-items-center link-03 lh-0" id="dropdownMenuButton2"
                   data-toggle="dropdown" aria-haspopup="true"
                   aria-expanded="false" style={{float: 'right', textTransform: 'capitalize', paddingRight: '26px', fontSize: '12px'}}>{this.state.reasonFilter[0]}
                  <i className="icon ion-ios-arrow-down mg-l-5"/>
                </a>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton2">
                  {
                    this.state.reasonFilter.map((reason, index) => {
                      return <a key={index} className="dropdown-item" href="#" onClick={() => this.onReasonFilter(reason)}>{reason}</a>
                    })
                  }

                </div>
              </div>


          </div>
          <div data-label="Example" className="df-example" style={{marginBottom: '25px', marginLeft: '-70px'}}>

            <div className="d-md-flex">
              <div id="morrisDonut" className="morris-donut-wrapper-demo"></div>

            </div>
          </div>
        </div>
      </div>
    )
  }

}
function mapStateToProps(state) {
  return {
    cancelReasons: state.graphData.cancelReasons,
  }
}

function matchDispatchToProps(dispatch) {
  return {
    onGetGraphData() {
      dispatch(graphActions.queryCancelReasons())
    }
  }
}

export default connect(mapStateToProps, matchDispatchToProps)(CancelReason);