// Václav Zapletal xzaple40
import { ChartConfig, ChartData } from '../types';
import { Order } from 'types';

export const itemStatsChart: ChartConfig = {
  type: 'Item Statistics',
  allowedVisualizations: ['Bar', 'Pie'],
  getData: (orders: Order[], year: string, month: string): ChartData[] => {
    if (!orders?.length) {
      throw new Error('No orders available');
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
      
      return year === orderYear && month === orderMonthName;
    });

    if (!filteredOrders.length) {
      throw new Error(`No orders found for ${month} ${year}`);
    }

    const itemStats = new Map<string, number>();
    filteredOrders.forEach(order => {
      itemStats.set(order.item, (itemStats.get(order.item) || 0) + 1);
    });

    return Array.from(itemStats.entries())
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5); 
  }
};