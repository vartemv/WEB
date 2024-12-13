import { ChartConfig, ChartData } from '../types';
import { Order } from 'types';

export const orderStateChart: ChartConfig = {
  type: 'Orders state',
  allowedVisualizations: ['Pie', 'Bar'],
  getData: (orders: Order[]): ChartData[] => {
    const allOrders = orders.length;
    const shippedOrders = orders.filter(order => order.status === 'Shipped').length;
    const activeOrders = orders.filter(order => order.status === 'Active').length;

    return [
      { name: 'All Orders', value: allOrders },
      { name: 'Shipped', value: shippedOrders },
      { name: 'Active', value: activeOrders }
    ];
  }
};