import { Order } from 'types';

export const getTotalOrders = (orders: Order[]): number => {
  return orders.length;
};

export const getTotalClients = (orders: Order[]): number => {
  const uniqueClients = new Set(orders.map(order => order.name));
  return uniqueClients.size;
};

export const getTotalRevenue = (orders: Order[]) => {
  return orders.reduce((sum, order) => sum + order.price, 0);
};