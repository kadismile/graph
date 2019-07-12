import * as type from '../constants/ActionTypes'

const initialState = {
  data:[],
  orderData:[],
  orderCountData:[],
  deliveryAmountsData: [],
  skuData: [],
  deliveryAmountDriverData: [],
  DeliveryAmountsDistributor: [],
  DeliveredOrdersByDriver: [],
  netSales: [],
  averageSales: [],
  grossSales: [],
  topSkus: [],
  topStores: [],
  numericalDistribution: [],
  dailyShippingStatus: [],
  dailyActiveStores:[],
  averageOrders:[],
  deliveryRate:[],
  dailyDelivery:[],
  cancelReasons: []
};

//REDUCER
export default function graphDataReducer(state=initialState, action){

  switch(action.type) {

    case type.GET_GRAPH_DATA: {
      return {
        ...state,
        data: JSON.parse(action.data.data.body),
      }
    }

    case type.GET_ORDER_DATA: {
      return {
        ...state,
        orderData: JSON.parse(action.data.data.body),
      }
    }

    case type.GET_ORDER_DATA_COUNT: {
      return {
        ...state,
        orderCountData: JSON.parse(action.data.data.body),
      }
    }

    case type.GET_DELIVERY_AMOUNT_DATA: {
      return {
        ...state,
        deliveryAmountsData: JSON.parse(action.data.data.body),
      }
    }

    case type.GET_SKU_DATA: {
      return {
        ...state,
        skuData: JSON.parse(action.data.data.body),
      }
    }

    case type.GET_DELIVERY_AMOUNT_BY_DRIVER_DATA: {
      return {
        ...state,
        deliveryAmountDriverData: JSON.parse(action.data.data.body),
      }
    }

    case type.GET_QUERY_NET_DATA: {
      return {
        ...state,
        netSales: JSON.parse(action.data.data.body),
      }
    }

    case type.GET_GROSS_SALES_DATA: {
      return {
        ...state,
        grossSales: JSON.parse(action.data.data.body)
      }
    }

    case type.GET_DELIVERY_AMOUNT_BY_DISTRIBUTOR: {
      return {
        ...state,
        DeliveryAmountsDistributor: JSON.parse(action.data.data.body)
      }
    }

    case type.GET_DELIVERED_ORDERS_BY_DRIVER: {
      return {
        ...state,
        DeliveredOrdersByDriver: JSON.parse(action.data.data.body)
      }
    }

    case type.GET_QUERY_AVERAGE_SALES: {
      return {
        ...state,
        averageSales: JSON.parse(action.data.data.body)
      }
    }
    case type.GET_TOP_SKUS: {
      return {
        ...state,
        topSkus: JSON.parse(action.data.data.body)
      }
    }
    case type.GET_TOP_STORES: {
      return {
        ...state,
        topStores: JSON.parse(action.data.data.body)
      }
    }

    case type.GET_NUMERICAL_DISTRIBUTION: {
      return {
        ...state,
        numericalDistribution: JSON.parse(action.data.data.body)
      }
    }

    case type.GET_DAILY_SHIPPING_STATUS: {
      return {
        ...state,
        dailyShippingStatus: JSON.parse(action.data.data.body)
      }
    }

    case type.GET_DAILY_ACTIVE_STORES: {
      return {
        ...state,
        dailyActiveStores: JSON.parse(action.data.data.body)
      }
    }

    case type.GET_AVERAGE_ORDERS: {
      return {
        ...state,
        averageOrders: JSON.parse(action.data.data.body)
      }
    }

    case type.GET_DELIVERY_RATE: {
      return {
        ...state,
        deliveryRate: JSON.parse(action.data.data.body)
      }
    }

    case type.GET_DAILY_DELIVERY: {
      return {
        ...state,
        dailyDelivery: JSON.parse(action.data.data.body)
      }
    }

    case type.GET_CANCEL_REASONS: {
      return {
        ...state,
        cancelReasons: JSON.parse(action.data.data.body)
      }
    }

    default: return state
  }
}