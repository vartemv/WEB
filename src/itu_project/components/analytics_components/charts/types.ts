import { Order } from 'types';

export interface ChartData {
  name: string;
  value: number;
}

export interface ChartConfig {
  type: string;
  allowedVisualizations: ('Pie' | 'Bar' | 'Line')[];
  getData: (orders: Order[], year: string, month: string) => ChartData[];
}