import { FunctionComponent } from 'react';
import styles from "../styles/analytics.module.css";
import StatisticsCard from '../components/analytics_components/StatisticsCard';
import NotesCard from '../components/analytics_components/NotesCard';
import AddChart from '../components/analytics_components/GraphWindow';

const Analytics: FunctionComponent = () => {
  return (
    
    <main className={styles.analytics}>
     <div className={styles.dashboard}>
                <img className={styles.UserPicture} alt="" src="Ellipse_photo.svg" />
                <div className="spacer" />
                    <div className={styles.iconsGroup}>
                        <img className={styles.homeIcon} alt="" src="Home.png" />
                        <img className={styles.homeIcon} alt="" src="Cart.png" />
                        <img className={styles.homeIcon} alt="" src="Graph.png" />
                        <img className={styles.homeIcon} alt="" src="Parcel.png" />
                        <img className={styles.homeIcon} alt="" src="Gears.png" />
                    </div>
            </div>
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          <div className={styles.column}>
            <StatisticsCard  />
          <AddChart />
          </div>
          <div className={styles.column}>
            <NotesCard />
          <AddChart />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Analytics;
