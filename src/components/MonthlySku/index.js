import React from 'react'
import {connect} from 'react-redux'
import {graphActions} from '../../actions/graphActions'
import $ from 'jquery'


import 'flot'
import _ from 'lodash'
import * as moment from 'moment';

class MonthlySku extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      df3: [],
      dateFilter: 'today',
      text: 'than yesterday',
      totalOrders: 0,
      percentGrowth: 0,
    }

    this.onDatefilter = this.onDatefilter.bind(this);
  }

  componentDidMount() {
    this.props.onGetGraphData();
    let thirtyDaysOrders = this.thisData(30, this.props.monthlySku)
    this.onDatefilter('today');

    setTimeout(()=>{
      let data = [];
      _.each(thirtyDaysOrders, (m, index)=> {
        return data.push([index, m.skus])
      });

      $.plot('#flotChart5', [{
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
          max: 60
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
      let skus = this.props.monthlySku;
      let todaysSku = _.filter(skus, function (m) {
        let date = moment(m.date).format('MMMM DD, YYYY');
        let today = moment(new Date()).format('MMMM DD, YYYY');
        return date === today
      });
      let totalSkusT = _.reduce(todaysSku, function (a, b) {return Number(a) + Number(b.skus)},0);

      let yesterday = moment().subtract(1, 'days').format('MMMM DD, YYYY');
      let yesterdaysSkus = _.filter(skus, function (m) {
        let date = moment(m.date).format('MMMM DD, YYYY');
        let yesterdayDate = moment(yesterday).format('MMMM DD, YYYY');
        return yesterdayDate === date
      });
      let totalSkusY = _.reduce(yesterdaysSkus, function (a, b) {return Number(a) + Number(b.skus)},0);
      let percentGrowth = (totalSkusT - totalSkusY) / 100;
      setTimeout(() => {
        this.setState({
          text: 'than yesterday',
          totalOrders: this.formatTotal(totalSkusT),
          percentGrowth: percentGrowth
        });
      }, 1200);

    }

    else if (day === 'yesterday') {
      let skus = this.props.monthlySku;
      let today = new Date();
      let yesterday = moment().subtract(1, 'days').format('MMMM DD, YYYY');
      let yesterdaysSkus = _.filter(skus, function (m) {
        let date = moment(m.date).format('MMMM DD, YYYY');
        let yesterdayDate = moment(yesterday).format('MMMM DD, YYYY');
        return yesterdayDate === date
      });
      let totalSkusY = _.reduce(yesterdaysSkus, function (a, b) {return Number(a) + Number(b.skus)},0);

      let todaysSkus = _.filter(skus, function (m) {
        let todaysDate = moment(m.date).format('MMMM DD, YYYY');
        let today = moment(new Date()).format('MMMM DD, YYYY');
        return todaysDate === today
      });
      let totalSkusT = _.reduce(todaysSkus, function (a, b) {return Number(a + b.skus)},0);
      let percentGrowth = (totalSkusY - totalSkusT) / 100;
      setTimeout(() => {
        this.setState({
          text: 'than today',
          totalOrders: this.formatTotal(totalSkusY),
          percentGrowth:percentGrowth
        });
      }, 1200);
    }

    else if (day === 'this week') {

      let skus = this.props.monthlySku;
      let thisWeekSkus = this.thisData(7, skus);
      let totalSkusThisweek = _.reduce(thisWeekSkus, function (a, b) {return Number(a) + Number(b.skus)},0);

      /*LAST WEEK */
      let lastWeekSkus= this.lastData(7, skus);
      let totalSkusLastweek = _.reduce(lastWeekSkus, function (a, b) {return Number(a) + Number(b.skus)},0);
      let percentGrowth = (totalSkusThisweek - totalSkusLastweek) / 100;

      setTimeout(() => {
        this.setState({
          text: 'than last week',
          totalOrders: this.formatTotal(totalSkusThisweek),
          percentGrowth: percentGrowth,

        });
      }, 1200);
    }

    else if (day === 'last week') {
      let skus = this.props.monthlySku;
      let lastWeekSkus = this.lastData(7, skus);
      let totalSkusLastweek = _.reduce(lastWeekSkus, function (a, b) {return Number(a) + Number(b.skus)},0);

      //This week
      let thisWeeSkus = this.thisData(7, skus);
      let totalSkusThisweek = _.reduce(thisWeeSkus, function (a, b) {return Number(a) + Number(b.skus)},0);

      let percentGrowth = (totalSkusLastweek - totalSkusThisweek) / 100;
      this.setState({
        text: 'than this week',
        totalOrders: this.formatTotal(totalSkusLastweek),
        percentGrowth: percentGrowth
      });
    }

    else if (day === 'this month') {
      let skus = this.props.monthlySku;
      let thisMonthSkus = this.thisMonth(skus);
      let totalSkusThisMonth = _.reduce(thisMonthSkus, function (a, b) {return Number(a) + Number(b.skus)},0);

      let lastMonthSkus  = _.filter(skus, function (m) {
        let dates = Number(moment(m.date).format('M'));
        let lastMonth = Number(moment().subtract(1, 'month').format("M"));
        return dates === lastMonth
      });
      
      let totalSkusLastMonth = _.reduce(lastMonthSkus, function (a, b) {return Number(a) + Number(b.skus)},0);
      let percentGrowth = (totalSkusThisMonth - totalSkusLastMonth) / 100;

      this.setState({
        text: 'than last month',
        totalOrders: this.formatTotal(totalSkusThisMonth),
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
    return val.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
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

  render() {
    return (
      <div className="col-sm-6 col-lg-3">
        <div className="card card-body">

          <h6 className="tx-uppercase tx-11 tx-spacing-1 tx-color-02 tx-semibold mg-b-8">Sku's
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
            <p className="tx-11 tx-color-03 mg-b-0"><span className={`tx-medium ${this.iconClass()}`}> {this.formatTotal(this.state.percentGrowth)}%
                  <i className={`icon ${this.icon()}`}/> </span> {this.state.text}
            </p>

          </div>
          <div className="chart-three">
            <div id="flotChart5" className="flot-chart ht-30" style={{padding: '0px', position: 'relative'}}>
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
    monthlySku: state.graphData.skuData,
  }
}

function matchDispatchToProps(dispatch) {
  return {
    onGetGraphData() {
      dispatch(graphActions.querySku())
    }

  }
}


export default connect(mapStateToProps, matchDispatchToProps)(MonthlySku);