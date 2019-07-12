import React from 'react'
import {connect} from 'react-redux'
import {graphActions} from '../../actions/graphActions'
import $ from 'jquery'

import 'flot'
import _ from 'lodash'
import * as moment from 'moment';

class NumericalDistribution extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dateFilter: 'today',
      text: 'than yesterday',
      data: [],

    }

  }

  componentDidMount() {
    this.props.onGetGraphData();
    const data = (this.props.numericalDistribution).slice(0,20);
    setTimeout(() => {
      this.setState({
        data: data
      });
    }, 1300);
  }

  formatTotal = (val)=> {
    return val.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  };

  render() {
    return (
      <>
        <div className="col-md-6 col-xl-4 mg-t-10">
          <div className="card ht-100p">
            <div className="card-header d-flex align-items-center justify-content-between">
              <h6 className="mg-b-0">Numerical Distribution </h6>
             {/* <div className="d-flex tx-18">
                <a href="#" className="d-flex align-items-center link-03 lh-0 fa-pull-right" id="dropdownMenuButton"
                   data-toggle="dropdown" aria-haspopup="true"
                   aria-expanded="false" style={{float: 'right', textTransform: 'capitalize', fontSize: '12px'}}>{this.state.dateFilter}
                  <i className="icon ion-ios-arrow-down mg-l-5"/>
                </a>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a className="dropdown-item" href="#1" onClick={() => this.onDatefilter('today')}>today</a>
                  <a className="dropdown-item" href="#2" onClick={() => this.onDatefilter('yesterday')}>yesterday</a>
                  <a className="dropdown-item" href="#3" onClick={() => this.onDatefilter('this week')}>this week</a>
                  <a className="dropdown-item" href="#4" onClick={() => this.onDatefilter('last week')}>last week</a>
                  <a className="dropdown-item" href="#5" onClick={() => this.onDatefilter('this month')}>this month</a>
                </div>
              </div>*/}
            </div>
            <ul className="list-group list-group-flush tx-13">
              {
                this.state.data.map((data, index) => {
                  return (
                    <li className="list-group-item d-flex pd-sm-x-20" key={index}>
                      <div className="pd-sm-l-10">
                        <p className="tx-medium mg-b-0">{data.dimension}</p>
                        {/*<small className="tx-12 tx-color-03 mg-b-0">{moment(data.date).format('MMMM D, YYYY')}</small>*/}
                      </div>
                      <div className="mg-l-auto text-right">
                        <p className="tx-medium mg-b-0">{this.formatTotal(data.value)}</p>
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
    numericalDistribution: state.graphData.numericalDistribution,
  }
}

function matchDispatchToProps(dispatch) {
  return {
    onGetGraphData() {
      dispatch(graphActions.queryNumericalDistribution())
    }

  }
}


export default connect(mapStateToProps, matchDispatchToProps)(NumericalDistribution);