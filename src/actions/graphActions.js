import * as type from '../constants/ActionTypes';
import { auth } from './authActions';
import axios from 'axios';
export const graphActions = {
  getData(data) {
    return {
      type: type.GET_GRAPH_DATA,
      data,
    };
  },
  getOrders(data) {
    return {
      type: type.GET_ORDER_DATA,
      data,
    };
  },
  getOrdersCount(data) {
    return {
      type: type.GET_ORDER_DATA_COUNT,
      data,
    };
  },
  getdeliveryAmounts(data) {
    return {
      type: type.GET_DELIVERY_AMOUNT_DATA,
      data,
    };
  },

  getDriverDeliveryAmounts(data) {
    return {
      type: type.GET_DRIVER_DELIVERY_AMOUNT_DATA,
      data,
    };
  },

  getDistroDeliveryAmounts(data) {
    return {
      type: type.GET_DRIVER_DELIVERY_AMOUNT_DATA,
      data,
    };
  },

  getSku(data) {
    return {
      type: type.GET_SKU_DATA,
      data,
    };
  },
  getQueryNetSales(data){
    return {
      type: type.GET_QUERY_NET_DATA,
      data
    }
  },

  getdeliveredAmountsByDriver(data){
    return {
      type: type.GET_DELIVERY_AMOUNT_BY_DRIVER_DATA,
      data
    }
  },

  getQueryGrossSales(data){
    return {
      type: type.GET_GROSS_SALES_DATA,
      data
    }
  },

  getdeliveredAmountsByDistributor(data){
    return {
      type: type.GET_DELIVERY_AMOUNT_BY_DISTRIBUTOR,
      data
    }
  },
  getdeliveredOrdersByDriver(data){
    return {
      type: type.GET_DELIVERED_ORDERS_BY_DRIVER,
      data
    }
  },

  getAverageSales(data){
    return {
      type: type.GET_QUERY_AVERAGE_SALES,
      data
    }
  },

  getTopSkus(data){
    return {
      type: type.GET_TOP_SKUS,
      data
    }
  },

  getTopStores(data){
    return {
      type: type.GET_TOP_STORES,
      data
    }
  },

  getNumericalDistribution(data){
    return {
      type: type.GET_NUMERICAL_DISTRIBUTION,
      data
    }
  },

  getdailyShippingStatus(data){
    return {
      type: type.GET_DAILY_SHIPPING_STATUS,
      data
    }
  },
  getdailyActiveStores(data) {
    return {
      type: type.GET_DAILY_ACTIVE_STORES,
      data
    }
  },

  getAverageOrders(data) {
    return {
      type: type.GET_AVERAGE_ORDERS,
      data
    }
  },

  getDeliveryRate(data) {
    return {
      type: type.GET_DELIVERY_RATE,
      data
    }
  },
  getDailyDelivery(data) {
    return {
      type: type.GET_DAILY_DELIVERY,
      data
    }
  },

  getCancelReasons(data){
    return {
      type: type.GET_CANCEL_REASONS,
      data
    }
  },





  queryGraphData() {
    return (dispatch) => {
      axios
        .get(
          `https://9l18txvcq5.execute-api.us-east-1.amazonaws.com/dev/data?token=${auth.authToken()}&graph=sample.json`
        )
        .then((response) => {
          setTimeout(() => {
            dispatch(this.getData(response))
          },1200)
        }).catch((error) => {
        console.log("Error ", error)
      });
    }
  },

  queryOrders() {
    return (dispatch) => {
      axios
        .get(
          `https://9l18txvcq5.execute-api.us-east-1.amazonaws.com/dev/data?token=${auth.authToken()}&graph=ordersCount.json`
        )
        .then((response) => {
          dispatch(this.getOrders(response));
        })
        .catch((error) => {
          console.log('Error ', error);
        });
    };
  },

  queryOrdersCount() {
    return (dispatch) => {
      axios
        .get(
          `https://9l18txvcq5.execute-api.us-east-1.amazonaws.com/dev/data?token=${auth.authToken()}&graph=ordersCount.json`
        )
        .then((response) => {
          dispatch(this.getOrdersCount(response));
        })
        .catch((error) => {
          console.log('Error ', error);
        });
    };
  },


  querydeliveryAmounts() {
    return (dispatch) => {
      axios
        .get(
          `https://9l18txvcq5.execute-api.us-east-1.amazonaws.com/dev/data?token=${auth.authToken()}&graph=deliveredAmounts.json`
        )
        .then((response) => {
          dispatch(this.getdeliveryAmounts(response));
        })
        .catch((error) => {
          console.log('Error ', error);
        });
    };
  },

  queryDriverDeliveryAmounts() {
    return (dispatch) => {
      axios
        .get(
          `https://9l18txvcq5.execute-api.us-east-1.amazonaws.com/dev/data?token=${auth.authToken()}&graph=deliveredAmountsByDriver.json`
        )
        .then((response) => {
          dispatch(this.getDriverDeliveryAmounts(response))
        }).catch((error) => {
        console.log("Error ", error)
      });
    }
  },

  querydeliveryAmountsDriver() {
    return dispatch => {
      axios.get( `https://9l18txvcq5.execute-api.us-east-1.amazonaws.com/dev/data?token=${auth.authToken()}&graph=deliveredAmountsByDriver.json`)
        .then((response) => {
          dispatch(this.getdeliveredAmountsByDriver(response))
        }).catch((error) => {
        console.log("Error ", error)
      });
    }
  },

  queryNetSales() {
    return dispatch => {
      axios.get( `https://9l18txvcq5.execute-api.us-east-1.amazonaws.com/dev/data?token=${auth.authToken()}&graph=sample.json`)
        .then((response) => {
          dispatch(this.getQueryNetSales(response))
        }).catch((error) => {
        console.log("Error", error)
      });
    }
  },

  queryAverageSales() {
    return dispatch => {
      axios.get( `https://9l18txvcq5.execute-api.us-east-1.amazonaws.com/dev/data?token=${auth.authToken()}&graph=avg.json`)
        .then((response) => {
          dispatch(this.getAverageSales(response))
        }).catch((error) => {
        console.log("Error", error)
      });
    }
  },

  queryGrossSales() {
    return dispatch => {
      axios.get( `https://9l18txvcq5.execute-api.us-east-1.amazonaws.com/dev/data?token=${auth.authToken()}&graph=gmv.json`)
        .then((response) => {
          dispatch(this.getQueryGrossSales(response))
        }).catch((error) => {
        console.log("Error ", error)
      });
    }
  },
  querydeliveryAmountsDistributor() {
    return dispatch => {
      axios.get( `https://9l18txvcq5.execute-api.us-east-1.amazonaws.com/dev/data?token=${auth.authToken()}&graph=deliveredAmountsByDistributor.json`)
        .then((response) => {
          dispatch(this.getdeliveredAmountsByDistributor(response))
        }).catch((error) => {
        console.log("Error ", error)
      });
    }
  },

  querydeliveredOrdersByDriver() {
    return dispatch => {
      axios.get( `https://9l18txvcq5.execute-api.us-east-1.amazonaws.com/dev/data?token=${auth.authToken()}&graph=deliveredOrdersByDriver.json`)
        .then((response) => {
          setTimeout(()=>{
            dispatch(this.getdeliveredOrdersByDriver(response))
          },1200)
        }).catch((error) => {
        console.log("Error ", error)
      });
    }
  },

  queryDistroDeliveryAmounts() {
    return (dispatch) => {
      axios
        .get(
          `https://9l18txvcq5.execute-api.us-east-1.amazonaws.com/dev/data?token=${auth.authToken()}&graph=deliveredAmountsByDistributor.json`
        )
        .then((response) => {
          dispatch(this.getDistroDeliveryAmounts(response));
        })
        .catch((error) => {
          console.log('Error ', error);
        });
    };
  },

  querySku() {
    return (dispatch) => {
      axios
        .get(
          `https://9l18txvcq5.execute-api.us-east-1.amazonaws.com/dev/data?token=${auth.authToken()}&graph=monthlySku.json`
        )
        .then((response) => {
          dispatch(this.getSku(response));
        })
        .catch((error) => {
          console.log('Error ', error);
        });
    };
  },

  queryTopSellingSku() {
    return (dispatch) => {
      axios
        .get(
          `https://9l18txvcq5.execute-api.us-east-1.amazonaws.com/dev/data?token=${auth.authToken()}&graph=topSku.json`
        )
        .then((response) => {
          dispatch(this.getTopSkus(response));
        })
        .catch((error) => {
          console.log('Error ', error);
        });
    };
  },

  queryTopStores() {
    return (dispatch) => {
      axios
        .get(
          `https://9l18txvcq5.execute-api.us-east-1.amazonaws.com/dev/data?token=${auth.authToken()}&graph=topStores.json`
        )
        .then((response) => {
          dispatch(this.getTopStores(response));
        })
        .catch((error) => {
          console.log('Error ', error);
        });
    };
  },

  queryNumericalDistribution() {
    return (dispatch) => {
      axios
        .get(
          `https://9l18txvcq5.execute-api.us-east-1.amazonaws.com/dev/data?token=${auth.authToken()}&graph=numericalDistribution.json`
        )
        .then((response) => {
          dispatch(this.getNumericalDistribution(response));
        })
        .catch((error) => {
          console.log('Error ', error);
        });
    };
  },

  querydailyShippingStatus() {
    return (dispatch) => {
      axios
        .get(
          `https://9l18txvcq5.execute-api.us-east-1.amazonaws.com/dev/data?token=${auth.authToken()}&graph=dailyShippingStatus.json`
        )
        .then((response) => {
          dispatch(this.getdailyShippingStatus(response));
        })
        .catch((error) => {
          console.log('Error ', error);
        });
    };
  },

  queryDailyActiveStores() {
    return (dispatch) => {
      axios
        .get(
          `https://9l18txvcq5.execute-api.us-east-1.amazonaws.com/dev/data?token=${auth.authToken()}&graph=dailyActiveStores.json`
        )
        .then((response) => {
          dispatch(this.getdailyActiveStores(response));
        })
        .catch((error) => {
          console.log('Error ', error);
        });
    };
  },

  queryAverageOrders() {
    return (dispatch) => {
      axios
        .get(
          `https://9l18txvcq5.execute-api.us-east-1.amazonaws.com/dev/data?token=${auth.authToken()}&graph=avg.json`
        )
        .then((response) => {
          dispatch(this.getAverageOrders(response));
        })
        .catch((error) => {
          console.log('Error ', error);
        });
    };
  },

  queryDeliveryRate() {
    return (dispatch) => {
      axios
        .get(
          `https://9l18txvcq5.execute-api.us-east-1.amazonaws.com/dev/data?token=${auth.authToken()}&graph=dailyShippingStatus.json`
        )
        .then((response) => {
          dispatch(this.getDeliveryRate(response));
        })
        .catch((error) => {
          console.log('Error ', error);
        });
    };
  },

  queryDailyDelivery() {
    return (dispatch) => {
      axios
        .get(
          `https://9l18txvcq5.execute-api.us-east-1.amazonaws.com/dev/data?token=${auth.authToken()}&graph=dailyDeliveries.json`
        )
        .then((response) => {
          dispatch(this.getDailyDelivery(response));
        })
        .catch((error) => {
          console.log('Error ', error);
        });
    };
  },

  queryCancelReasons() {
    return (dispatch) => {
      axios
        .get(
          `https://9l18txvcq5.execute-api.us-east-1.amazonaws.com/dev/data?token=${auth.authToken()}&graph=cancelReasonsByKd.json`
        )
        .then((response) => {
          dispatch(this.getCancelReasons(response));
        })
        .catch((error) => {
          console.log('Error ', error);
        });
    };
  }
};
