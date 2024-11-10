import React, { useEffect, useState } from 'react';
import styles from '../../styles/analytics.module.css';
import StatisticItem from '../analytics_components/StatisticsItem';
import { Order } from 'types';

interface OrderStats {
  total: number;
  tables: number;
  chairs: number;
}

const StatisticsCard: React.FC = () => {
  const [orderStats, setOrderStats] = useState<OrderStats>({ total: 0, tables: 0, chairs: 0 });

  const fetchOrderStats = async () => {
    try {
      const response = await fetch('/api/get_order');
      const { data } = await response.json();

    
      const total = data.length;
      const tables = data.filter((order: Order) => order.item.toLowerCase() === 'table').length;
      const chairs = data.filter((order: Order) => order.item.toLowerCase() === 'chair').length;

    
      setOrderStats({ total, tables, chairs });
    } catch (error) {
      console.error('Error fetching order statistics:', error);
    }
  };

  
  useEffect(() => {
    fetchOrderStats();
  }, []);

  return (
    <section className={styles.statisticsCard}>
      <div className={styles.cardHeader}>
        <h2 className={styles.cardTitle}>Key statistics</h2>
      </div>
      <div className={styles.statisticsGrid}>
        <StatisticItem label="Total orders" value={orderStats.total.toString()} />
        <StatisticItem label="Tables" value={orderStats.tables.toString()} />
        <StatisticItem label="Chairs" value={orderStats.chairs.toString()} />
      </div>
    </section>
  );
};

export default StatisticsCard;

