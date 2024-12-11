import { Order } from 'types';

export const getTotalOrders = (orders: Order[]): number => {
  return orders.length;
};