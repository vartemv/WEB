import { ChartConfig } from './types';
import { orderStateChart, customerTypeChart } from './implementations';

const charts: Record<string, ChartConfig> = {
  'Orders state': orderStateChart,
  'Customer type': customerTypeChart
};

export const getChartConfig = (type: string): ChartConfig | undefined => 
  charts[type];

export const getAvailableTypes = (): string[] => 
  Object.keys(charts);

export const getAllowedVisualizations = (type: string): string[] => 
  charts[type]?.allowedVisualizations || ['Pie'];