import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Order } from 'types';

type ChartData = {
  name: string;
  value: number;
};

type PieChartComponentProps = {
  orders: Order[];
};

const COLORS = ['#65558f', '#00C49F', '#FFBB28'];

const PieChartComponent: React.FC<PieChartComponentProps> = ({ orders }) => {
  const [chartData, setChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    const allOrders = orders.length;
    const shippedOrders = orders.filter((order) => order.status === 'Shipped').length;
    const activeOrders = orders.filter((order) => order.status === 'Active').length;

    const formattedData: ChartData[] = [
      { name: 'All Orders', value: allOrders },
      { name: 'Shipped', value: shippedOrders },
      { name: 'Active', value: activeOrders },
    ];

    setChartData(formattedData);
  }, [orders]);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          label
        >
          {chartData.map((entry, index) => (
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