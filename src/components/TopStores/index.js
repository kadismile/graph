import React from 'react'
import {connect} from 'react-redux'
import {graphActions} from '../../actions/graphActions'
import _ from 'lodash'
import * as moment from 'moment';
import {daysAgo} from '../../helpers/daysAgo'
class TopStores extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      monthFilter: 'This Month',
      data: [],
    }
  }

  componentDidMount() {
    this.props.onGetGraphData();
    this.onMonthFilter('This Month');
  }

  formatTotal = (val)=> {
    return '₦' + val.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  };

  onMonthFilter = (month) => {
    let topStores = this.props.topStores;
    this.setState({
      monthFilter: month
    });


    if(month === 'This Month') {
      let startDate = moment(new Date()).format('MMMM DD, YYYY');
      let data = daysAgo(startDate, 30 ,topStores).slice(0,6);
        this.setState({
          data: data
        });
    }

    else if (month === 'Previous Month') {
      let startDate = moment(new Date()).subtract(30, 'days').format('MMMM DD, YYYY');
      let data = daysAgo(startDate, 30 ,topStores).slice(0,6);
        this.setState({
          data: data
        });
    }

  };

  icon = (percentageValue)=> {
    if (percentageValue > 0) {
      return 'ion-md-arrow-up'
    }else{
      return 'ion-md-arrow-down'
    }
  };

  iconClass = (percentageValue)=> {
    if (percentageValue > 0) {
      return 'tx-success'
    }else{
      return 'tx-danger'
    }
  };

  getPercentage = (name, date) => {
    let topStores = this.props.topStores;

    let thisMonth = moment(new Date()).subtract(30, 'days').format('MMMM DD, YYYY');
    let previousMonth = moment(new Date()).format('MMMM DD, YYYY');

    let previousMonthData = daysAgo(thisMonth, 30 ,topStores);
    let thisMonthData = daysAgo(previousMonth, 30 ,topStores);

    let x = previousMonthData.find((m)=>{return m.dimension === name});
    let y = thisMonthData.find((m)=>{return m.dimension === name});
    if(x !== undefined && y !== undefined){
      return (((y.value - x.value) / 1000) / 100).toFixed(2);
    }else{
      return 0
    }
  };

  // getPercentageNew = (startDay, days, name, date) => {
  //   let topStores = this.props.topStores;
  //
  //   // let endDate = moment(new Date()).subtract(days, 'days').format('MMMM DD, YYYY');
  //   // let startDate = moment(new Date()).format('MMMM DD, YYYY');
  //
  //   let thisMonthData = daysAgo(startDay, days ,topStores);
  //   let lastMonthData = daysAgo(thisMonthData, 30 ,topStores);
  //
  //   let x = lastMonthData.find((m)=>{return m.dimension === name});
  //   let y = thisMonthData.find((m)=>{return m.dimension === name});
  //   if(x !== undefined && y !== undefined){
  //     return (((y.value - x.value) / (y.value + x.value)) * 100);
  //   }else{
  //     return 0
  //   }
  // };

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
      <>
        <div className="col-md-6 col-xl-4 mg-t-10">
          <div className="card ht-100p">
            <div className="card-header d-flex align-items-center justify-content-between">
              <h6 className="mg-b-0">Top Stores </h6>
              <div className="d-flex tx-18">
                <a href="#" className="d-flex align-items-center link-03 lh-0 fa-pull-right" id="dropdownMenuButton"
                   data-toggle="dropdown" aria-haspopup="true"
                   aria-expanded="false" style={{float: 'right', textTransform: 'capitalize', fontSize: '12px'}}>{this.state.monthFilter}
                  <i className="icon ion-ios-arrow-down mg-l-5"/>
                </a>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a className="dropdown-item" href="#1" onClick={() => this.onMonthFilter('This Month')}>This Month</a>
                  <a className="dropdown-item" href="#2" onClick={() => this.onMonthFilter('Previous Month')}>Previous Month</a>
                </div>
              </div>
            </div>
            <ul className="list-group list-group-flush tx-13">
              {
                this.state.data.map((data, index) => {
                  return (
                    <li className="list-group-item d-flex pd-sm-x-20" key={index}>
                      <div className="pd-sm-l-10">
                        <p className="tx-medium mg-b-0" style={{fontWeight: 'bolder'}}>{data.dimension}</p>
                        <small className="tx-12 tx-color-03 mg-b-0">{moment(data.date).format('MMMM, YYYY')}</small>
                      </div>
                      <div className="mg-l-auto text-right">
                        <p className="tx-medium mg-b-0">{this.formatTotal(data.value)}</p>
                        <span className={`mg-l-5 tx-10 tx-normal ${this.iconClass(this.getPercentage(data.dimension, data.date))} `}>
                          <i className={`icon ${this.icon(this.getPercentage(data.dimension))}`}>
                          </i> {this.getPercentage(data.dimension)} %
                        </span>
                      </div>
                    </li>
                  )
                })
              }
            </ul>
            <div className="card-footer text-center tx-13">
              <a href="#" className="link-03">View More<i className="icon ion-md-arrow-down mg-l-5" /></a>
            </div>{/* card-footer */}
          </div>{/* card */}
        </div>

      </>


    )
  }
}


function mapStateToProps(state) {
  return {
    auth: state.auth,
    topStores: state.graphData.topStores,
  }
}

function matchDispatchToProps(dispatch) {
  return {
    onGetGraphData() {
      dispatch(graphActions.queryTopStores())
    }

  }
}


export default connect(mapStateToProps, matchDispatchToProps)(TopStores);