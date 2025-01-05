// Václav Zapletal xzaple40
import { Order } from 'types';
import { ChartData } from '../types';

export const orderStateChart = {
  type: 'Orders state',
  allowedVisualizations: ['Pie', 'Bar'],
  getData: (orders: Order[], year: string, month: string): ChartData[] => {
    if (!orders) {
      throw new Error('Orders array is undefined');
    }

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear().toString();
    const currentMonth = currentDate.getMonth() + 1;

    const filteredOrders = orders.filter(order => {
      const [orderYear, orderMonth] = order.order_date.split('/');
      
      
      const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      const orderMonthName = monthNames[parseInt(orderMonth) - 1];
      
      if (month === 'Current') {
        return orderYear === year  && parseInt(orderMonth) === currentMonth;
      }

      
      const isYearMatch = orderYear === year;
      const isMonthMatch = month === orderMonthName;
      
      console.log(`Order date: ${order.order_date}, Year match: ${isYearMatch}, Month match: ${isMonthMatch}`);
      
      return isYearMatch && isMonthMatch;
    });

    if (filteredOrders.length === 0) {
      throw new Error(`No orders found for ${month} ${year}`);
    }

    const allOrders = filteredOrders.length;
    const shippedOrders = filteredOrders.filter(order => order.status === 'Shipped').length;
    const activeOrders = filteredOrders.filter(order => order.status === 'Active').length;

    return [
      { name: 'All Orders', value: allOrders },
      { name: 'Shipped', value: shippedOrders },
      { name: 'Active', value: activeOrders }
    ];
  }
};