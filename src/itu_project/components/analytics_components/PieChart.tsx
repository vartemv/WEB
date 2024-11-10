import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Order } from 'types';

type ChartData = {
  name: string;
  value: number;
};

const COLORS = ['#65558f', '#00C49F', '#FFBB28'];

const PieChartComponent: React.FC = () => {
  const [chartData, setChartData] = useState<ChartData[]>([]);

  const fetchOrderStats = async () => {
    try {
      const response = await fetch('/api/get_order');
      const { data } = await response.json();
      
      const allOrders = data.length;
      const shippedOrders = data.filter((order: Order) => order.status === 'Shipped').length;
      const activeOrders = data.filter((order: Order) => order.status === 'Active').length;


      const formattedData: ChartData[] = [
        { name: 'All Orders', value: allOrders },
        { name: 'Shipped', value: shippedOrders },
        { name: 'Active', value: activeOrders },
      ];

      setChartData(formattedData);
    } catch (error) {
      console.error('Error fetching order statistics:', error);
    }
  };

  useEffect(() => {
    fetchOrderStats();
  }, []);

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
    // </div>
  );
};

export default PieChartComponent;

