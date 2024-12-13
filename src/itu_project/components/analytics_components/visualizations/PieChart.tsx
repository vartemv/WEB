import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Order } from 'types';
import { getChartConfig } from '../charts/registry';

type Props = {
  orders: Order[];
  itemType: string;
};

const COLORS = ['#65558f', '#00C49F', '#FFBB28'];

const PieChartComponent: React.FC<Props> = ({ orders, itemType }) => {
  const config = getChartConfig(itemType);
  const data = config?.getData(orders) || [];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          label
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieChartComponent;