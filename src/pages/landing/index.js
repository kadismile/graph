import React from 'react'
import OrdersChart from "../../components/OrdersChart";
import MonthlySku from "../../components/MonthlySku";
import AverageSales from "../../components/AverageSales";
import GrossSales from "../../components/GrossSales";
import MapChat from "../../components/MapChart";
import DeliveredAmounts from "../../components/OrdersDelivered";
import DeliveryAmountsDriver from "../../components/DeliveryAmountsDriver";
import DeliveryAmountsDistributor from "../../components/DeliveryAmountsDistributor";
import DeliveredOrdersByDriver from "../../components/DeliveredOrdersByDriver";
import VerticalMap from "../../components/VerticalMaps";
import TopSellingSku from "../../components/TopSellingSku";
import TopStores from "../../components/TopStores";
import NumericalDistribution from "../../components/NumericalDistribution";
import DailyShippingStatus from "../../components/DailyShippingStatus";
import DailyActiveStores from "../../components/DailyActiveStores";
import AverageOrders from "../../components/AverageOrders";
import DeliveryRate from "../../components/DeliveryRate";
import CancelReason from "../../components/CancelReason";

class LandingPage extends React.Component{

  render(){
    return (
      <div className="content-body">
        <div className="container pd-x-0">
          <div className="d-sm-flex align-items-center justify-content-between mg-b-20 mg-lg-b-25 mg-xl-b-30">
            <div>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb breadcrumb-style1 mg-b-10">
                  <li className="breadcrumb-item"><a href="#">Dashboard</a></li>
                  <li className="breadcrumb-item active" aria-current="page">Supplier Dashboard</li>
                </ol>
              </nav>
              <h4 className="mg-b-0 tx-spacing--1">Welcome to Dashboard</h4>
            </div>
            <div className="d-none d-md-block">

              <button className="btn btn-sm pd-x-15 btn-white btn-uppercase">
                <a href="#" className="d-flex align-items-center link-03 lh-0" id="dropdownMenuButton"
                   data-toggle="dropdown" aria-haspopup="true"
                   aria-expanded="false" style={{float: 'right', textTransform: 'capitalize'}}> Select Distributor
                  <i className="icon ion-ios-arrow-down mg-l-5"/>
                </a>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a className="dropdown-item" href="#">surulere</a>
                  <a className="dropdown-item" href="#" >ikoyi</a>
                </div>
              </button>
              <button className="btn btn-sm pd-x-15 btn-white btn-uppercase mg-l-5">
                <a href="#" className="d-flex align-items-center link-03 lh-0" id="dropdownMenuButton"
                   data-toggle="dropdown" aria-haspopup="true"
                   aria-expanded="false" style={{float: 'right', textTransform: 'capitalize'}}> Select Principal
                  <i className="icon ion-ios-arrow-down mg-l-5"/>
                </a>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a className="dropdown-item" href="#">UAC</a>
                  <a className="dropdown-item" href="#">Promasidor</a>

                </div>
              </button>
            </div>
          </div>
          <div className="row row-xs">

              <GrossSales/>
              <DailyActiveStores/>
              <AverageOrders/>
              <DeliveryRate/>


              <DailyShippingStatus/>

              <CancelReason/> {/*<DeliveredAmounts/>*/}
              <TopSellingSku/>
              <TopStores/>
              <NumericalDistribution/>

            {/*<VerticalMap/>*/}
          </div>
        </div>
      </div>
    )
  }
}

export default LandingPage