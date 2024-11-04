import { FunctionComponent } from 'react';
import styles from '../styles/Details.module.css';
import {Order} from 'types';

export type DetailsType = {
  	className?: string;
	order: Order;
}

const Details:FunctionComponent<DetailsType> = ({ className="", order }) => {
  	return (
    		<div className={[styles.details, className].join(' ')}>
      			<div className={styles.bhjbhj4cjccs94c}>{order.id}</div>
      			<div className={styles.something}>{order.item}</div>
      			<div className={styles.somewhereSt}>
        				<p className={styles.somewhereSt1}>{order.address}</p>
      			</div>
      			<img className={styles.imageIcon} alt="" src="image.png" />
      			<img className={styles.upsIcon} alt="" src="UPS.png" />
      			<div className={styles.div}>10/10/10</div>
      			<img className={styles.amazonIcon} alt="" src="Shopify.png" />
      			<div className={styles.div1}>100$</div>
    		</div>);
};

export default Details;
