import { FunctionComponent } from 'react';
import useSWR from 'swr';
import styles from "../styles/analytics.module.css";
import NotesCard from '../components/analytics_components/NotesCard';
import GraphWindow from '../components/analytics_components/GraphWindow';
import { Order } from 'types';
import { getTotalOrders } from '@/lib/orderUtils';
import StatisticItem from '../components/analytics_components/StatisticsItem';
import GraphManager from '@/components/analytics_components/GraphManager';

const fetcher = (url: string) => fetch(url).then(res => res.json());

const Analytics: FunctionComponent = () => {
  const { data, error, mutate } = useSWR('/api/get_order', fetcher);

  if (error) return <div>Failed to load orders</div>;
  if (!data) return <div>Loading...</div>;

  const orders: Order[] = data.data || [];

  return (
    <main className={styles.analytics}>
      <div className={styles.dashboard}>
        <img className={styles.UserPicture} alt="" src="Ellipse_photo.svg" />
        <div className="spacer" />
        <div className={styles.iconsGroup}>
          <img className={styles.homeIcon} alt="Home" src="Home.png" />
          <img className={styles.homeIcon} alt="Cart" src="Cart.png" />
          <img className={styles.homeIcon} alt="Graph" src="Graph.png" />
          <img className={styles.homeIcon} alt="Parcel" src="Parcel.png" />
          <img className={styles.homeIcon} alt="Gears" src="Gears.png" />
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          <div className={styles.column}>
            <section className={styles.statisticsCard}>
              <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>Key statistics</h2>
              </div>
              <div className={styles.statisticsGrid}>
                <StatisticItem label="Total orders" value={getTotalOrders(orders)} />
              </div>
            </section>
            <GraphManager orders={orders} />
          </div>
          <div className={styles.column}>
            <NotesCard />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Analytics;