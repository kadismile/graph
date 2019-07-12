import _ from "lodash";
import Moment from 'moment';
import { extendMoment } from 'moment-range';
const moment = extendMoment(Moment);

export  const daysAgo = (startDay, daysAgo, orders) => {
  let toDate = moment(startDay).subtract(daysAgo, 'days').format('MMMM DD, YYYY');
  let range = moment().range(toDate, startDay);
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

