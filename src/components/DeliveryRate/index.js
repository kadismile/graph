import React from 'react'
import {connect} from 'react-redux'
import {graphActions} from '../../actions/graphActions'


import _ from 'lodash'
import * as moment from 'moment';
import $ from "jquery";

class DeliveryRate extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dateFilter: 'today',
      text: 'than yesterday',
      totalOrders: 0,
      percentGrowth: 0,
      deliveryRate: 0
    };

    this.onDatefilter = this.onDatefilter.bind(this);
  }

  componentDidMount() {
    this.props.onGetGraphData();
    let thirtyDaysOrders = this.thisWeekData(30, this.props.deliveryRate);
    this.onDatefilter('today');
    setTimeout(()=>{
      let data = [];
      _.each(thirtyDaysOrders, (m, index)=> {
        return data.push([index, m.value])
      });
      $.plot('#flotChart50', [{
        data: data,
        color: '#9db2c6'
      }], {
        series: {
          shadowSize: 0,
          lines: {
            show: true,
            lineWidth: 2,
            fill: true,
            fillColor: { colors: [ { opacity: 0 }, { opacity: .5 } ] }
          }
        },
        grid: {
          borderWidth: 0,
          labelMargin: 0
        },
        yaxis: {
          show: false,
          min: 0,
          max: 10000000
        },
        xaxis: { show: false }
      });
    },1200);
  }

  onDatefilter = (day) => {
    let deliveryRate = this.props.deliveryRate;
    this.setState({
      dateFilter: day
    });

    if (day === 'today') {
      let todaysDeliveryRate = _.filter(deliveryRate, function (m) {
        let date = moment(m.date).format('MMMM DD, YYYY');
        let today = moment(new Date()).format('MMMM DD, YYYY');
        return date === today
      });
      let totaldeliveryRateToday = _.reduce(todaysDeliveryRate, function (a, b) {
        return (a + Number(b.value))
      },0);
      let deliveredT = _.find(todaysDeliveryRate, function(o) { return o.shippingstatus === 'delivered'; });
      let deliveredValueT = 0;
      if(deliveredT !== undefined){
        deliveredValueT = Number(deliveredT.value)
      }
      let percDeliveredT = ((deliveredValueT / totaldeliveryRateToday ) * 100);
      if(isNaN(percDeliveredT)){
        percDeliveredT = 0;
      }

      //Yesterday
      let yesterday = moment().subtract(1, 'days').format('MMMM DD, YYYY');
      let yesterdaysdeliveryRate = _.filter(deliveryRate, function (m) {
        let date = moment(m.date).format('MMMM DD, YYYY');
        return yesterday === date
      });
      let totaldeliveryRateYesterday = _.reduce(yesterdaysdeliveryRate, function (a, b) {
        return (a + Number(b.value))
      },0);
      let deliveredY = _.find(yesterdaysdeliveryRate, function(o) { return o.shippingstatus === 'delivered'; });
      let deliveredValueY = 0;
      if(deliveredY !== undefined){
        deliveredValueY = Number(deliveredY.value)
      }
      let percDeliveredY = ((deliveredValueY / totaldeliveryRateYesterday ) * 100);
      if(isNaN(percDeliveredY)){
        percDeliveredY = 0;
      }

      let percentGrowth = (percDeliveredT - percDeliveredY);
      setTimeout(() => {
        this.setState({
          text: 'than yesterday',
          percentGrowth:percentGrowth,
          deliveryRate: percDeliveredT.toFixed(2)
        });
      }, 1200);

    }

    else if (day === 'yesterday') {
      let yesterday = moment().subtract(1, 'days').format('MMMM DD, YYYY');
      let yesterdaysdeliveryRate = _.filter(deliveryRate, function (m) {
        let date = moment(m.date).format('MMMM DD, YYYY');
        return yesterday === date
      });
      let totaldeliveryRateYesterday = _.reduce(yesterdaysdeliveryRate, function (a, b) {
        return (a + Number(b.value))
      },0);
      let deliveredY = _.find(yesterdaysdeliveryRate, function(o) { return o.shippingstatus === 'delivered'; });
      let deliveredValueY = 0;
      if(deliveredY !== undefined){
        deliveredValueY = Number(deliveredY.value)
      }
      let percDeliveredY = ((deliveredValueY / totaldeliveryRateYesterday ) * 100);
      if(isNaN(percDeliveredY)){
        percDeliveredY = 0;
      }

      //TODAY//
      let todaysDeliveryRate = _.filter(deliveryRate, function (m) {
      let todaysDate = moment(m.date).format('MMMM DD, YYYY');
      let today = moment(new Date()).format('MMMM DD, YYYY');
      return todaysDate === today
      });
      let totalDeliveryRateToday = _.reduce(todaysDeliveryRate, function (a, b) {return a + Number(b.value)},0);
      let deliveredT = _.find(todaysDeliveryRate, function(o) { return o.shippingstatus === 'delivered'; });
      let deliveredValueT = 0;
      if(deliveredT !== undefined){
        deliveredValueT = Number(deliveredT.value)
      }
      let percDeliveredT = ((deliveredValueT / totalDeliveryRateToday ) * 100);
      if(isNaN(percDeliveredT)){
        percDeliveredT = 0;
      }

      let percentGrowth = (Number(percDeliveredY) - Number(percDeliveredT));
      setTimeout(() => {
        this.setState({
          text: 'than today',
          percentGrowth:percentGrowth,
          deliveryRate: percDeliveredY.toFixed(2)
        });
      }, 1200);
    }

    else if (day === 'this week') {

      let thisWeekDeliveryRate = this.thisWeekData(7, deliveryRate);
      let totalDeliveryRateThisweek = _.reduce(thisWeekDeliveryRate, function (a, b) {return a + Number(b.value)},0);
      let deliveredThisweek = _.find(thisWeekDeliveryRate, function(o) { return o.shippingstatus === 'delivered'; });
      let deliveredValueThisWeek = 0;
      if(deliveredThisweek !== undefined){
        deliveredValueThisWeek = Number(deliveredThisweek.value)
      }
      let percDeliveredThisWeek = ((deliveredValueThisWeek / totalDeliveryRateThisweek ) * 100);
      if(isNaN(percDeliveredThisWeek)){
        percDeliveredThisWeek = 0;
      }


      /*LAST WEEK */
      let lastWeekDeliveryRate = this.lastWeekData(7, deliveryRate);
      let totalDeliveryRateLastweek = _.reduce(lastWeekDeliveryRate, function (a, b) {return a + Number(b.value)},0);
      let deliveredLastweek = _.find(lastWeekDeliveryRate, function(o) { return o.shippingstatus === 'delivered'; });
      let deliveredValueLastWeek = 0;
      if(deliveredLastweek !== undefined){
        deliveredValueLastWeek = Number(deliveredLastweek.value)
      }
      let percDeliveredLastWeek = ((deliveredValueLastWeek / totalDeliveryRateLastweek ) * 100);
      if(isNaN(percDeliveredLastWeek)){
        percDeliveredLastWeek = 0;
      }

      let percentGrowth = (percDeliveredThisWeek - percDeliveredLastWeek) ;
      setTimeout(() => {
        this.setState({
          text: 'than last week',
          percentGrowth: percentGrowth,
          deliveryRate: percDeliveredThisWeek.toFixed(2)
        });
      }, 1200);
    }

    else if (day === 'last week') {
      /*LAST WEEK */
      let lastWeekDeliveryRate = this.lastWeekData(7, deliveryRate);
      let totalDeliveryRateLastweek = _.reduce(lastWeekDeliveryRate, function (a, b) {return a + Number(b.value)},0);
      let deliveredLastweek = _.find(lastWeekDeliveryRate, function(o) { return o.shippingstatus === 'delivered'; });
      let deliveredValueLastWeek = 0;
      if(deliveredLastweek !== undefined){
        deliveredValueLastWeek = Number(deliveredLastweek.value)
      }
      let percDeliveredLastWeek = ((deliveredValueLastWeek / totalDeliveryRateLastweek ) * 100);
      if(isNaN(percDeliveredLastWeek)){
        percDeliveredLastWeek = 0;
      }

      let thisWeekDeliveryRate = this.thisWeekData(7, deliveryRate);
      let totalDeliveryRateThisweek = _.reduce(thisWeekDeliveryRate, function (a, b) {return a + Number(b.value)},0);
      let deliveredThisweek = _.find(thisWeekDeliveryRate, function(o) { return o.shippingstatus === 'delivered'; });
      let deliveredValueThisWeek = 0;
      if(deliveredThisweek !== undefined){
        deliveredValueThisWeek = Number(deliveredThisweek.value)
      }
      let percDeliveredThisWeek = ((deliveredValueThisWeek / totalDeliveryRateThisweek ) * 100);
      if(isNaN(percDeliveredThisWeek)){
        percDeliveredThisWeek = 0;
      }

      let percentGrowth = (percDeliveredLastWeek - percDeliveredThisWeek ) ;
      setTimeout(() => {
        this.setState({
          text: 'than last week',
          percentGrowth: percentGrowth,
          deliveryRate: percDeliveredLastWeek.toFixed(2)
        });
      }, 1200);
    }

    else if (day === 'this month') {
      let thisMonthDeliveryRate = this.thisMonth(deliveryRate);
      let totalDeliveryRateThisMonth = _.reduce(thisMonthDeliveryRate, function (a, b) {return a + Number(b.value)},0);
      let deliveredThisMonth = _.find(thisMonthDeliveryRate, function(o) { return o.shippingstatus === 'delivered'; });
      let deliveredValueThisMonth = 0;
      if(deliveredThisMonth !== undefined){
        deliveredValueThisMonth = Number(deliveredThisMonth.value)
      }
      let percDeliveredThisMonth = ((deliveredValueThisMonth / totalDeliveryRateThisMonth ) * 100);
      if(isNaN(percDeliveredThisMonth)){
        percDeliveredThisMonth = 0;
      }


      let lastMonthDeliveryRate  = _.filter(deliveryRate, function (m) {
        let dates = Number(moment(m.date).format('M'));
        let lastMonth = Number(moment().subtract(1, 'month').format("M"));
        return dates === lastMonth
      });
      let totalDeliveryRateLastMonth = _.reduce(lastMonthDeliveryRate, function (a, b) {return a + Number(b.value)},0);
      let deliveredLastMonth = _.find(lastMonthDeliveryRate, function(o) { return o.shippingstatus === 'delivered'; });
      let deliveredValueLastMonth = 0;
      if(deliveredLastMonth !== undefined){
        deliveredValueLastMonth = Number(deliveredLastMonth.value)
      }
      let percDeliveredLastMonth = ((deliveredValueLastMonth / totalDeliveryRateLastMonth ) * 100);
      if(isNaN(percDeliveredLastMonth)){
        percDeliveredLastMonth = 0;
      }

      let percentGrowth = (percDeliveredThisMonth - percDeliveredLastMonth) ;

      this.setState({
        text: 'than last month',
        percentGrowth: percentGrowth,
        deliveryRate: percDeliveredThisMonth.toFixed(2)
      });
    }
  };


  icon = ()=> {
    if (Math.sign(this.state.percentGrowth) === 1) {
      return 'ion-md-arrow-up'
    }else{
      return 'ion-md-arrow-down'
    }
  };

  iconClass = ()=> {
    if (Math.sign(this.state.percentGrowth) === 1) {
      return 'tx-success'
    }else{
      return 'tx-danger'
    }
  };

  formatTotal = (val)=> {
    return val.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
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

  render() {
    return (
      <div className="col-sm-6 col-lg-3">
        <div className="card card-body">

          <h6 className="tx-uppercase tx-11 tx-spacing-1 tx-color-02 tx-semibold mg-b-8">Delivery Rate
            <a href="#" className="d-flex align-items-center link-03 lh-0" id="dropdownMenuButton"
               data-toggle="dropdown" aria-haspopup="true"
               aria-expanded="false" style={{float: 'right', textTransform: 'capitalize'}}>{this.state.dateFilter}
              <i className="icon ion-ios-arrow-down mg-l-5"/>
            </a>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a className="dropdown-item" href="#" onClick={() => this.onDatefilter('today')}>today</a>
              <a className="dropdown-item" href="#" onClick={() => this.onDatefilter('yesterday')}>yesterday</a>
              <a className="dropdown-item" href="#" onClick={() => this.onDatefilter('this week')}>this week</a>
              <a className="dropdown-item" href="#" onClick={() => this.onDatefilter('last week')}>last week</a>
              <a className="dropdown-item" href="#" onClick={() => this.onDatefilter('this month')}>this month</a>
            </div>

          </h6>
          <div className="d-flex d-lg-block d-xl-flex align-items-end">
            <h4 className="tx-normal tx-rubik mg-b-0 mg-r-5 lh-1">{this.state.deliveryRate}%</h4>
            <br/>
            <br/>
            <p className="tx-11 tx-color-03 mg-b-0">
              <span className={`tx-medium ${this.iconClass()}`}> {this.formatTotal(this.state.percentGrowth)}%<i className={`icon ${this.icon()}`}/> </span>
              <br/>
              {this.state.text}
            </p>

          </div>
          <div className="chart-three">
            <div id="flotChart50" className="flot-chart ht-30" style={{padding: '0px', position: 'relative'}}>
              <canvas className="flot-base" width="250" height="30"
                      style={{direction: 'ltr', position: 'absolute', left: '0px', top: '0px', width: '250.5px', height: '30px'}}></canvas>
              <canvas className="flot-overlay" width="250" height="30"
                      style={{direction: 'ltr', position: 'absolute', left: '0px', top: '0px', width: '250.5px', height: '30px'}}></canvas>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    deliveryRate: state.graphData.deliveryRate,
  }
}

function matchDispatchToProps(dispatch) {
  return {
    onGetGraphData() {
      dispatch(graphActions.queryDeliveryRate())
    }

  }
}


export default connect(mapStateToProps, matchDispatchToProps)(DeliveryRate);