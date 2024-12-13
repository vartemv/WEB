import { ChartConfig, ChartData } from '../types';
import { Order } from 'types';

export const customerTypeChart: ChartConfig = {
  type: 'Customer type',
  allowedVisualizations: ['Pie'],
  getData: (orders: Order[]): ChartData[] => {
    const customerCategories = new Map<string, number>();
    
    // Group customers by first letter of their name
    orders.forEach(order => {
      const firstLetter = order.name[0].toUpperCase();
      const category = `Group ${firstLetter}`;
      customerCategories.set(category, (customerCategories.get(category) || 0) + 1);
    });

    // Convert map to array of ChartData objects
    return Array.from(customerCategories.entries())
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically
  }
};