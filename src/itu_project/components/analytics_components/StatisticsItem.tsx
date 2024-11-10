import React from 'react';
import styles from '../../styles/analytics.module.css';

interface StatisticItemProps {
  label: string;
  value: string;
}

const StatisticItem: React.FC<StatisticItemProps> = ({ label, value }) => {
  return (
    <div className={styles.statisticItem}>
      <div className={styles.statisticLabel}>{label}</div>
      <div className={styles.statisticValue}>{value}</div>
    </div>
  );
};

export default StatisticItem;
