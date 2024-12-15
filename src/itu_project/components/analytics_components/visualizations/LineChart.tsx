// Václav Zapletal xzaple40
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Order } from 'types';
import { getChartConfig } from '../charts/registry';

type Props = {
  orders: Order[];
  itemType: string;
  year: string;
  month: string;
};

const LineChartComponent: React.FC<Props> = ({ orders, itemType, year, month }) => {
  const config = getChartConfig(itemType);
  const data = config?.getData(orders, year, month) || [];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart 
        data={data}
        margin={{ top: 5, right: 20, left: 20, bottom: 25 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
        <XAxis 
          dataKey="name" 
          label={{ value: 'Day', position: 'bottom', offset: 10 }}
          stroke="#666"
          tickMargin={10}
        />
        <YAxis 
          label={{ value: 'Orders', angle: -90, position: 'left', offset: 0 }}
          stroke="#666"
        />
        <Tooltip />
        <Line 
          type="monotone" 
          dataKey="value" 
          stroke="#65558f" 
          activeDot={{ r: 4 }}
          dot={{ r: 2 }}
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartComponent;