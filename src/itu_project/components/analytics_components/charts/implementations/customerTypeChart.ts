import { ChartConfig, ChartData } from '../types';
import { Order } from 'types';

export const customerTypeChart: ChartConfig = {
  type: 'Customer type',
  allowedVisualizations: ['Pie'],
  getData: (orders: Order[], year: string, month: string): ChartData[] => {
    // Filter orders by year
    const filteredOrders = orders.filter(order => {
      const orderDate = new Date(order.order_date);
      const orderYear = orderDate.getFullYear().toString();
      const orderMonth = orderDate.toLocaleString('default', { month: 'long' });
      
      return (year === orderYear) && 
             (month === 'Current' || month === orderMonth);
    });

    const customerCategories = new Map<string, number>();
    
    filteredOrders.forEach(order => {
      const firstLetter = order.name[0].toUpperCase();
      const category = `Group ${firstLetter}`;
      customerCategories.set(category, (customerCategories.get(category) || 0) + 1);
    });

    return Array.from(customerCategories.entries())
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }
};