import { FunctionComponent } from 'react';
import styles from '../styles/Details.module.css';

export type DetailsType = {
  	className?: string;
}

const Details:FunctionComponent<DetailsType> = ({ className="" }) => {
  	return (
    		<div className={[styles.details, className].join(' ')}>
      			<div className={styles.bhjbhj4cjccs94c}>54252bhjbhj4cjccs94c</div>
      			<div className={styles.something}>Something</div>
      			<div className={styles.somewhereSt}>
        				<p className={styles.somewhereSt1}>somewhere st</p>
      			</div>
      			<img className={styles.imageIcon} alt="" src="image.png" />
      			<img className={styles.upsIcon} alt="" src="UPS.png" />
      			<div className={styles.div}>10/10/10</div>
      			<img className={styles.amazonIcon} alt="" src="Amazon.png" />
      			<div className={styles.div1}>100$</div>
    		</div>);
};

export default Details;
