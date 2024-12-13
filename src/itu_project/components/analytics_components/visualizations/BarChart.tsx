import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Order } from 'types';
import { getChartConfig } from '../charts/registry';

type Props = {
  orders: Order[];
  itemType: string;
};

const BarChartComponent: React.FC<Props> = ({ orders, itemType }) => {
  const config = getChartConfig(itemType);
  const data = config?.getData(orders) || [];

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