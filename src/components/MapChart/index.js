import React from 'react';
import $ from 'jquery';
import _ from 'lodash';
import '../../jquery';

import 'flot';
import {connect} from 'react-redux';

import {graphActions} from '../../actions/graphActions';

class MapChat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  colors = ['#69b2f8', '#d1e6fa', '#69b2f8'];
  months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  componentDidMount() {
    this.props.getOrders();
    const chartData = Object.keys(this.aggregateOrders).map((year, index) => {
      const yearData = this.aggregateOrders[year];
      const chartData = yearData.map((object, index) => [index, object.value]);
      return {
        data: chartData,
        color: this.colors[index],
        lines: {
          fill: true,
          lineWidth: 1.5,
        },
      };
    });
    const longest = Math.max(...chartData.map((data) => data.data.length));
    chartData.forEach((array) => {
      const data = array.data;
      for (let x = longest; x > 0; x--) {
        if (!data[x]) {
          console.log('empty');
          data[x] = [x, 0];
        }
      }
    });
    $.plot('#flotChart', chartData, {
      series: {
        stack: 0,
        shadowSize: 0,
        lines: {
          show: true,
          lineWidth: 0,
          fill: 1,
        },
      },
      grid: {
        borderWidth: 0,
        aboveData: true,
      },
      yaxis: {
        show: false,
        min: 0,
        max: 350,
      },
      xaxis: {
        show: true,
        ticks: [[0, ''], ...this.ticks],
        color: 'rgba(255,255,255,.2)',
      },
    });
  }

  get aggregateOrders() {
    const orders = this.props.orderCountData;
    const groupedOrders = _.groupBy(orders, (order) => {
      const date = new Date(order.date);
      return date.getFullYear();
    });
    return Object.keys(groupedOrders).reduce((acc, key) => {
      const year = groupedOrders[key];
      const months = year.sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });
      return {
        ...acc,
        [key]: months,
      };
    }, {});
  }

  get ticks() {
    const orders = this.props.orderCountData;
    const updatedData = orders.map((order) => {
      const date = new Date(order.date);
      const month = this.months[date.getMonth()];
      delete order.date;
      return {
        month,
        ...order,
      };
    });
    const groupedData = _.groupBy(updatedData, 'month');
    const ticks = this.months.map((key, index) => {
      const monthsOrders = groupedData[key];
      if (monthsOrders && monthsOrders.length){
        const previousMonths = this.months.slice(0, index);
        const previousTotal = previousMonths.reduce((acc, month) => {
          const thatMonth = groupedData[month];
          return thatMonth ? acc + thatMonth.length : 0;
        }, 0);
        return [monthsOrders.length + previousTotal, key];
      }
      return [0, 0]
    });
    return ticks;
  }

  render() {
    return (
      <div className="col-lg-8 col-xl-7 mg-t-10">
        <div className="card">
          <div className="card-header pd-y-20 d-md-flex align-items-center justify-content-between">
            <h6 className="mg-b-0">Net Sales</h6>
            <ul className="list-inline d-flex mg-t-20 mg-sm-t-10 mg-md-t-0 mg-b-0">
              <li className="list-inline-item d-flex align-items-center">
                <span className="d-block wd-10 ht-10 bg-df-1 rounded mg-r-5" />
                <span className="tx-sans tx-uppercase tx-10 tx-medium tx-color-03">Growth Actual</span>
              </li>
              <li className="list-inline-item d-flex align-items-center mg-l-5">
                <span className="d-block wd-10 ht-10 bg-df-2 rounded mg-r-5" />
                <span className="tx-sans tx-uppercase tx-10 tx-medium tx-color-03">Actual</span>
              </li>
              <li className="list-inline-item d-flex align-items-center mg-l-5">
                <span className="d-block wd-10 ht-10 bg-df-3 rounded mg-r-5" />
                <span className="tx-sans tx-uppercase tx-10 tx-medium tx-color-03">Plan</span>
              </li>
            </ul>
          </div>{/* card-header */}
          <div className="card-body pos-relative pd-0">
            <div className="pos-absolute t-20 l-20 wd-xl-100p z-index-10">

            </div>
            <div className="chart-one">
              <div id="flotChart" className="flot-chart" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    orderCountData: state.graphData.orderCountData,
  };
}

function matchDispatchToProps(dispatch) {
  return {
    getOrders() {
      dispatch(graphActions.queryOrdersCount());
    },
  };
}

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(MapChat);