import { FunctionComponent } from "react";
import styles from "../../styles/Desktop.module.css";

interface DashboardProps {
    navigateToAnalytics: () => void;
}

export const Dashboard: FunctionComponent<DashboardProps> = ({ navigateToAnalytics }) => (
    <div className={styles.dashboard}>
        <img className={styles.UserPicture} alt="" src="Ellipse_photo.svg" />
        <div className="spacer" />
        <div className={styles.iconsGroup}>
            <img className={styles.homeIcon} alt="*" src="Home.png" />
            <img className={styles.homeIcon} alt="*" src="Cart.png" />
            <img className={styles.homeIcon} alt="*" src="Graph.png" onClick={navigateToAnalytics} />
            <img className={styles.homeIcon} alt="*" src="Parcel.png" />
            <img className={styles.homeIcon} alt="*" src="Gears.png" />
        </div>
    </div>
);
