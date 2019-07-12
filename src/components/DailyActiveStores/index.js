import React from 'react'
import {connect} from 'react-redux'
import {graphActions} from '../../actions/graphActions'


import _ from 'lodash'
import * as moment from 'moment';
import $ from "jquery";

class DailyActiveStores extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dateFilter: 'today',
      text: 'than yesterday',
      totalOrders: 0,
      percentGrowth: 0,

    }

    this.onDatefilter = this.onDatefilter.bind(this);
  }

  componentDidMount() {
    this.props.onGetGraphData();
    let thirtyDaysOrders = this.thisData(30, this.props.dailyActiveStores);
    this.onDatefilter('today');
    setTimeout(()=>{
      let data = [];
      _.each(thirtyDaysOrders, (m, index)=> {
        return data.push([index, m.value])
      });
      $.plot('#flotChart22', [{
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
    this.setState({
      dateFilter: day
    });

    if (day === 'today') {
      let grossSales = this.props.dailyActiveStores;
      let todaysGrossSales = _.filter(grossSales, function (m) {
        let date = moment(m.date).format('MMMM DD, YYYY');
        let today = moment(new Date()).format('MMMM DD, YYYY');
        return date === today
      });
      let totalGrossSalesT = _.reduce(todaysGrossSales, function (a, b) {return Number(a) + Number(b.value)},0);

      let yesterday = moment().subtract(1, 'days').format('MMMM DD, YYYY');
      let yesterdaysGrossSales = _.filter(grossSales, function (m) {
        let date = moment(m.date).format('MMMM DD, YYYY');
        let yesterdayDate = moment(yesterday).format('MMMM DD, YYYY');
        return yesterdayDate === date
      });
      let totalGrossSalesY = _.reduce(yesterdaysGrossSales, function (a, b) {return Number(a) + Number(b.value)},0);
      let percentGrowth = (totalGrossSalesT - totalGrossSalesY) / 100;
      setTimeout(() => {
        this.setState({
          text: 'than yesterday',
          totalOrders: totalGrossSalesT,
          percentGrowth: percentGrowth
        });
      }, 1200);

    }

    else if (day === 'yesterday') {
      let today = new Date();
      let yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      let grossSales = this.props.dailyActiveStores;
      let yesterdaysGrossSales = _.filter(grossSales, function (m) {
        let date = moment(m.date).format('MMMM DD, YYYY');
        let yesterdayDate = moment(yesterday).format('MMMM DD, YYYY');
        return yesterdayDate === date
      });
      let totalgrossSalesYesterday = _.reduce(yesterdaysGrossSales, function (a, b) {
        return Number(a + b.value)
      },0);

      let todaysGrossSales = _.filter(grossSales, function (m) {
        let todaysDate = moment(m.date).format('MMMM DD, YYYY');
        let today = moment(new Date()).format('MMMM DD, YYYY');
        return todaysDate === today
      });
      let totalgrossSalesToday = _.reduce(todaysGrossSales, function (a, b) {return Number(a + b.value)},0);
      let percentGrowth = (totalgrossSalesYesterday - totalgrossSalesToday) / 100;
      setTimeout(() => {
        this.setState({
          text: 'than today',
          totalOrders: totalgrossSalesYesterday,
          percentGrowth:percentGrowth
        });
      }, 1200);
    }

    else if (day === 'this week') {
      let grossSales = this.props.dailyActiveStores;
      let thisWeekGrossSales = this.thisData(7, grossSales);
      let totalGrossSalesThisweek = _.reduce(thisWeekGrossSales, function (a, b) {return Number(a) + Number(b.value)},0);
      /*LAST WEEK */
      let lastWeekOrders = this.lastData(7, grossSales);
      let totalGrossSalesLastweek = _.reduce(lastWeekOrders, function (a, b) {return Number(a) + Number(b.value)},0);
      let percentGrowth = (totalGrossSalesThisweek - totalGrossSalesLastweek) / 100;
      setTimeout(() => {
        this.setState({
          text: 'than last week',
          totalOrders: totalGrossSalesThisweek,
          percentGrowth: percentGrowth,
        });
      }, 1200);
    }

    else if (day === 'last week') {
      let grossSales = this.props.dailyActiveStores;
      let lastWeekGrossSales = this.lastData(7, grossSales);
      let totalGrossSalesLastweek = _.reduce(lastWeekGrossSales, function (a, b) {return Number(a) + Number(b.value)},0);
      //This week
      let thisWeekGrossSales = this.thisData(7, grossSales);
      let totalGrossSalesThisweek = _.reduce(thisWeekGrossSales, function (a, b) {return Number(a) + Number(b.value)},0);
      let percentGrowth = (totalGrossSalesLastweek - totalGrossSalesThisweek) / 100;
      this.setState({
        text: 'than this week',
        totalOrders: totalGrossSalesLastweek,
        percentGrowth: percentGrowth
      });
    }

    else if (day === 'this month') {
      let grossSales = this.props.dailyActiveStores;
      let thisMonthGrossSales = this.thisMonth(grossSales);
      let totalGrossSalesThisMonth = _.reduce(thisMonthGrossSales, function (a, b) {return Number(a) + Number(b.value)},0);

      let lastMonthGrossSales  = _.filter(grossSales, function (m) {
        let dates = Number(moment(m.date).format('M'));
        let lastMonth = Number(moment().subtract(1, 'month').format("M"));
        return dates === lastMonth
      });

      let totalGrossSalesLastMonth = _.reduce(lastMonthGrossSales, function (a, b) {return Number(a) + Number(b.value)},0);
      let percentGrowth = (totalGrossSalesThisMonth - totalGrossSalesLastMonth) / 100;

      this.setState({
        text: 'than last month',
        totalOrders: totalGrossSalesThisMonth,
        percentGrowth: percentGrowth
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

  thisData = (day, orders) => {
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

  lastData = (day, orders) => {
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

          <h6 className="tx-uppercase tx-11 tx-spacing-1 tx-color-02 tx-semibold mg-b-8">Daily Active Stores
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
            <h4 className="tx-normal tx-rubik mg-b-0 mg-r-5 lh-1">{this.state.totalOrders}</h4>
            <br/>
            <br/>
            <p className="tx-11 tx-color-03 mg-b-0">
              <span className={`tx-medium ${this.iconClass()}`}> {this.formatTotal(this.state.percentGrowth)}%<i className={`icon ${this.icon()}`}/> </span>
              <br/>
              {this.state.text}
            </p>

          </div>
          <div className="chart-three">
            <div id="flotChart22" className="flot-chart ht-30" style={{padding: '0px', position: 'relative'}}>
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
    auth: state.auth,
    dailyActiveStores: state.graphData.dailyActiveStores,
  }
}

function matchDispatchToProps(dispatch) {
  return {
    onGetGraphData() {
      dispatch(graphActions.queryDailyActiveStores())
    }

  }
}


export default connect(mapStateToProps, matchDispatchToProps)(DailyActiveStores);