import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Order } from 'types';
import { getChartConfig } from '../charts/registry';

// In BarChart.tsx
type Props = {
  orders: Order[];
  itemType: string;
  year: string;    // Add these
  month: string;   // parameters
};

const BarChartComponent: React.FC<Props> = ({ orders, itemType, year, month }) => {
  const config = getChartConfig(itemType);
  const data = config?.getData(orders, year, month) || []; // Pass the parameters

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#65558f" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;