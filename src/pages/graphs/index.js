import React from 'react'
import {connect} from 'react-redux'
import {graphActions} from '../../actions/graphActions'
import $ from 'jquery'
import Chart from 'chart.js';
import _ from 'lodash'
import graphData from "../../reducers/graphDataReducer";


class Graph extends React.Component{
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

    $.plot('#flotChart3', [{
      data: this.state.df4,
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





    //get data for the map
    this.props.onGetGraphData();

    const data = this.data;
    const max = Math.max(...data);
    var chat1 = document.getElementById('chartBar1').getContext('2d');
    new Chart(chat1, {
      type: 'bar',
      data: {
        labels: this.state.ctxLabel,
        datasets: [{
          data,
          backgroundColor: this.state.ctxColor1
        }]
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
        scales: {
          yAxes: [{
            gridLines: {
              color: '#e5e9f2'
            },
            ticks: {
              beginAtZero:true,
              fontSize: 10,
              fontColor: '#182b49',
              max
            }
          }],
          xAxes: [{
            gridLines: {
              display: false
            },
            barPercentage: 0.6,
            ticks: {
              beginAtZero:true,
              fontSize: 11,
              fontColor: '#182b49'
            }
          }]
        }
      }
    });

    var ctx2 = document.getElementById('chartBar2').getContext('2d');
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
        scales: {
          yAxes: [{
            gridLines: {
              display: false
            },
            ticks: {
              beginAtZero:true,
              fontSize: 10,
              fontColor: '#182b49'
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

    var ctx4 = document.getElementById('chartLine1');
    new Chart(ctx4, {
      type: 'line',
      data: {
        labels: this.state.ctxLabel,
        datasets: [{
          data,
          borderColor: this.state.ctxColor1,
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
              max: max
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

    var ctx5 = document.getElementById('chartArea1');
    new Chart(ctx5, {
      type: 'line',
      data: {
        labels:this.state.ctxLabel,
        datasets: [{
          data: data,
          borderColor: this.state.ctxColor1,
          borderWidth: 1,
          backgroundColor: 'rgba(0,23,55, .5)'
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
            stacked: true,
            gridLines: {
              color: '#e5e9f2'
            },
            ticks: {
              beginAtZero:true,
              fontSize: 10
            }
          }],
          xAxes: [{
            stacked: true,
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


    /** PIE CHART **/
    var datapie = {
      labels: this.months,
      datasets: [{
        data: data,
        backgroundColor: ['#560bd0', '#007bff','#00cccc','#cbe0e3','#74de00']
      }]
    };

    var optionpie = {
      maintainAspectRatio: false,
      responsive: true,
      legend: {
        display: false,
      },
      animation: {
        animateScale: true,
        animateRotate: true
      }
    };

    // For a doughnut chart
    var ctx8 = document.getElementById('chartPie');
    var myPieChart = new Chart(ctx8, {
      type: 'doughnut',
      data: datapie,
      options: optionpie
    });

    // For a pie chart
    var ctx9 = document.getElementById('chartDonut');
    var myDonutChart = new Chart(ctx9, {
      type: 'pie',
      data: datapie,
      options: optionpie
    });


  }

  get data(){
    const updatedData = this.state.data.map(newData => {
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
      const itemTotal = Math.ceil(items.reduce((total, item) => total + item.nmv, 0));
      return {
        ...obj,
        [month]: itemTotal
      }
    }, {});
    return this.months.map(month => summation[month] ? summation[month] : 0);
  }

  render(){
    return <div>
      <div id="sidebarMenu" className="sidebar sidebar-fixed sidebar-components">
        <div className="sidebar-header">
          <a href id="mainMenuOpen"><i data-feather="menu" /></a>
          <h5>Components</h5>
          <a href id="sidebarMenuClose"><i data-feather="x" /></a>
        </div>{/* sidebar-header */}
        <div className="sidebar-body">
          <ul className="sidebar-nav">
            <li className="nav-label mg-b-15">Browse Components</li>
            <li className="nav-item"><a href="index.html" className="nav-link"><i data-feather="layout" /> Introduction</a></li>
            <li className="nav-item"><a href="grid.html" className="nav-link"><i data-feather="grid" /> Grid System</a></li>
            <li className="nav-item">
              <a href className="nav-link with-sub"><i data-feather="layers" /> UI Elements</a>
              <nav className="nav">
                <a href="el-accordion.html">Accordion</a>
                <a href="el-alerts.html">Alerts</a>
                <a href="el-avatar.html">Avatar</a>
                <a href="el-badge.html">Badge</a>
                <a href="el-breadcrumbs.html">Breadcrumbs</a>
                <a href="el-buttons.html">Buttons</a>
                <a href="el-button-groups.html">Button Groups</a>
                <a href="el-cards.html">Cards</a>
                <a href="el-carousel.html">Carousel</a>
                <a href="el-collapse.html">Collapse</a>
                <a href="el-dropdown.html">Dropdown</a>
                <a href="el-icons.html">Icons</a>
                <a href="el-images.html">Images</a>
                <a href="el-list-group.html">List Group</a>
                <a href="el-marker.html">Marker</a>
                <a href="el-media-object.html">Media Object</a>
                <a href="el-modal.html">Modal</a>
                <a href="el-navs.html">Navs</a>
                <a href="el-navbar.html">Navbar</a>
                <a href="el-off-canvas.html">Off-Canvas</a>
                <a href="el-pagination.html">Pagination</a>
                <a href="el-placeholder.html">Placeholder</a>
                <a href="el-popovers.html">Popovers</a>
                <a href="el-progress.html">Progress</a>
                <a href="el-steps.html">Steps</a>
                <a href="el-scrollbar.html">Scrollbar</a>
                <a href="el-scrollspy.html">Scrollspy</a>
                <a href="el-spinners.html">Spinners</a>
                <a href="el-tab.html">Tab</a>
                <a href="el-toast.html">Toast </a>
                <a href="el-tooltips.html">Tooltips</a>
                <a href="el-table-basic.html">Table Basic</a>
                <a href="el-table-advanced.html">Table Advanced</a>
              </nav>
            </li>
            <li className="nav-item">
              <a href className="nav-link with-sub"><i data-feather="package" /> Utilities</a>
              <nav className="nav">
                <a href="util-animation.html">Animation</a>
                <a href="util-background.html">Background</a>
                <a href="util-border.html">Border</a>
                <a href="util-display.html">Display</a>
                <a href="util-divider.html">Divider</a>
                <a href="util-flex.html">Flex</a>
                <a href="util-height.html">Height</a>
                <a href="util-margin.html">Margin</a>
                <a href="util-padding.html">Padding</a>
                <a href="util-position.html">Position</a>
                <a href="util-typography.html">Typography</a>
                <a href="util-width.html">Width</a>
                <a href="util-extras.html">Extras</a>
              </nav>
            </li>
            <li className="nav-item">
              <a href className="nav-link with-sub"><i data-feather="inbox" /> Forms</a>
              <nav className="nav">
                <a href="form-elements.html">Form Elements</a>
                <a href="form-input-group.html">Input Group</a>
                <a href="form-input-tags.html">Input Tags</a>
                <a href="form-input-masks.html">Input Masks</a>
                <a href="form-layouts.html">Form Layouts</a>
                <a href="form-validation.html">Form Validation</a>
                <a href="form-wizard.html">Form Wizard</a>
                <a href="form-text-editor.html">Text Editor</a>
                <a href="form-rangeslider.html">Range Slider</a>
                <a href="form-datepicker.html">Date Pickers</a>
                <a href="form-select2.html">Select2</a>
                <a href="form-search.html">Search</a>
              </nav>
            </li>
            <li className="nav-item show">
              <a href className="nav-link with-sub active"><i data-feather="pie-chart" /> Charts</a>
              <nav className="nav">
                <a href="chart-flot.html">Flot</a>
                <a href="chart-chartjs.html" className="active">ChartJS</a>
                <a href="chart-peity.html">Peity</a>
                <a href="chart-sparkline.html">Sparkline</a>
                <a href="chart-morris.html">Morris</a>
              </nav>
            </li>
            <li className="nav-item show">
              <a href className="nav-link with-sub"><i data-feather="map-pin" /> Maps</a>
              <nav className="nav">
                <a href="map-google.html">Google Maps</a>
                <a href="map-leaflet.html">Leaflet Maps</a>
                <a href="map-vector.html">Vector Maps</a>
              </nav>
            </li>
          </ul>
        </div>{/* sidebar-body */}
      </div>{/* sidebar */}
      <div className="content content-components">
        <div className="container">
          <ol className="breadcrumb df-breadcrumbs mg-b-10">
            <li className="breadcrumb-item"><a href="#">Components</a></li>
            <li className="breadcrumb-item"><a href="#">Charts</a></li>
            <li className="breadcrumb-item active" aria-current="page">Chartjs Charts</li>
          </ol>
          <h1 className="df-title">Chartjs Charts</h1>
          <p className="df-lead">Simple yet flexible JavaScript charting for designers &amp; developers. Read the <a href="https://www.chartjs.org/docs/latest/" target="_blank">Official Chartjs Documentation</a> for a full list of instructions and other options.</p>


          <hr className="mg-y-40" />
          <h4 id="section1" className="mg-b-10">Bar Chart</h4>
          <p className="mg-b-30">Below is a basic bar chart implementation that you can use.</p>
          <div data-label="Example" className="df-example">
            <div className="ht-250 ht-lg-300"><canvas id="chartBar1" /></div>
          </div>{/* df-example */}


          <hr className="mg-y-50 mg-b-40" />
          <h4 id="section2" className="mg-b-10">Horizontal Chart</h4>
          <p className="mg-b-30">Below is the horizontal bar chart example.</p>
          <div data-label="Example" className="df-example">
            <div className="ht-250 ht-lg-300"><canvas id="chartBar2" /></div>
          </div>{/* df-example */}



          <hr className="mg-y-50 mg-b-40" />
          <h4 id="section3" className="mg-b-10">Stacked Chart</h4>
          <p className="mg-b-30">Below is the stacked bar chart example.</p>
          <div data-label="Example" className="df-example">
            <div className="ht-250 ht-lg-300"><canvas id="chartBar3" /></div>
          </div>{/* df-example */}
          <hr className="mg-y-50 mg-b-40" />
          <h4 id="section4" className="mg-b-10">Line Chart</h4>
          <p className="mg-b-30">Below is the line chart example.</p>
          <div data-label="Example" className="df-example">
            <div className="ht-250 ht-lg-300"><canvas id="chartLine1" /></div>
          </div>{/* df-example */}
          <hr className="mg-y-50 mg-b-40" />
          <h4 id="section5" className="mg-b-10">Area Chart</h4>
          <p className="mg-b-30">Below is the area chart example.</p>
          <div data-label="Example" className="df-example">
            <div className="ht-250 ht-lg-300"><canvas id="chartArea1" /></div>
          </div>{/* df-example */}
          <hr className="mg-y-50 mg-b-40" />
          <h4 id="section6" className="mg-b-10">With Transparency</h4>
          <p className="mg-b-30">Below is the bar chart example with transparency of the bar.</p>
          <div data-label="Example" className="df-example">
            <div className="ht-250 ht-lg-300"><canvas id="chartBar4" /></div>
          </div>{/* df-example */}
          <hr className="mg-y-50 mg-b-40" />
          <h4 id="section7" className="mg-b-10">With Gradient</h4>
          <p className="mg-b-30">Below is the bar chart example with gradient effect of the bar.</p>
          <div data-label="Example" className="df-example">
            <div className="ht-250 ht-lg-300"><canvas id="chartBar5" /></div>
          </div>{/* df-example */}
          <hr className="mg-y-50 mg-b-40" />
          <h4 id="section8" className="mg-b-10">Pie and Donut Chart</h4>
          <p className="mg-b-30">Below are an example of data in a pie and donut chart.</p>
          <div data-label="Example" className="df-example">
            <div className="d-md-flex">
              <div className="ht-250 mg-b-20 mg-md-b-0 mg-md-r-30 mg-xl-r-40"><canvas id="chartPie" /></div>
              <div className="ht-250"><canvas id="chartDonut" /></div>
            </div>
          </div>
        </div>
      </div>


      <div className="col-sm-6 col-lg-3">
        <div className="card card-body">
          <h6 className="tx-uppercase tx-11 tx-spacing-1 tx-color-02 tx-semibold mg-b-8">Conversion Rate</h6>
          <div className="d-flex d-lg-block d-xl-flex align-items-end">
            <h3 className="tx-normal tx-rubik mg-b-0 mg-r-5 lh-1">0.81%</h3>
            <p className="tx-11 tx-color-03 mg-b-0"><span className="tx-medium tx-success">1.2% <i className="icon ion-md-arrow-up"></i></span></p>
          </div>
          <div className="chart-three">
            <div id="flotChart3" className="flot-chart ht-30" style={{padding: '0px', position: 'relative'}}>
              <canvas className="flot-base" width="250" height="30"
                      style={{direction: 'ltr', position: 'absolute', left: '0px', top: '0px', width: '250.5px', height: '30px'}}></canvas>
              <canvas className="flot-overlay" width="250" height="30"
                      style={{direction: 'ltr', position: 'absolute', left: '0px', top: '0px', width: '250.5px', height: '30px'}}></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  }
}

function mapStateToProps(state) {
  return{
    auth: state.auth,
    graphData: state.graphData,
  }
}

function matchDispatchToProps(dispatch){
  return {
    onGetGraphData(){
      dispatch(graphActions.queryGraphData())
    }

  }
}


export default connect(mapStateToProps, matchDispatchToProps)(Graph);