import { ChartConfig, ChartData } from '../types';
import { Order } from 'types';

export const dailyOrdersChart: ChartConfig = {
  type: 'Daily Orders',
  allowedVisualizations: ['Line'], // Only allow Line visualization
  getData: (orders: Order[], year: string, month: string): ChartData[] => {
    if (!orders?.length) {
      throw new Error('No orders available');
    }

    const filteredOrders = orders.filter(order => {
      const [orderYear, orderMonth] = order.order_date.split('/');
      const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      const orderMonthName = monthNames[parseInt(orderMonth) - 1];
      
      return year === orderYear && month === orderMonthName;
    });

    if (!filteredOrders.length) {
      throw new Error(`No orders found for ${month} ${year}`);
    }

    // Group by day
    const dailyCounts = new Map<number, number>();
    filteredOrders.forEach(order => {
      const day = parseInt(order.order_date.split('/')[2]);
      dailyCounts.set(day, (dailyCounts.get(day) || 0) + 1);
    });

    return Array.from(dailyCounts.entries())
      .map(([day, count]) => ({
        name: day.toString(),
        value: count
      }))
      .sort((a, b) => parseInt(a.name) - parseInt(b.name));
  }
};