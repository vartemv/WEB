// Václav Zapletal xzaple40
import { ChartConfig } from './types';
import { orderStateChart, customerTypeChart, itemStatsChart, dailyOrdersChart } from './implementations';

const charts: Record<string, ChartConfig> = {
  'Orders state': orderStateChart,
  'Item Statistics': {
    ...itemStatsChart,
    allowedVisualizations: ['Pie']
  },
  'Daily Orders': dailyOrdersChart
};


export const getChartConfig = (type: string): ChartConfig | undefined => 
  charts[type];

export const getAvailableTypes = (): string[] => 
  Object.keys(charts);

export const getAllowedVisualizations = (type: string): string[] => 
  charts[type]?.allowedVisualizations || ['Pie'];