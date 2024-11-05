import { FunctionComponent, useState } from 'react';
import styles from '../styles/Details.module.css';
import {Order} from 'types';

export type DetailsType = {
  	className?: string;
	order: Order;
	onDelete?: () => void;
}

const Details:FunctionComponent<DetailsType> = ({ className="", order, onDelete }) => {

	const [temp_order, SetTempData] = useState<Order>(
		order
	)

	const delete_id = () => {
		fetch('/api/delete_order',{
			method: 'POST',
			headers:{
				'Content-Type':'application/json'
			},
			body: JSON.stringify(order)
		})
			.then(()=>{
				if(onDelete) onDelete();
			});
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        SetTempData((prev) => ({
            ...prev,
            [name]: value, // Dynamically update the correct field based on the input's name
        }));
    };

  	return (
    		<div className={styles.details}>
      			<div className={styles.item}>{order.id}</div>
				  <input
							name = "item"
                    		className={`${styles.something} ${styles.dynamic_input}`}
                    		value={temp_order.item}
							onChange={handleInputChange}
                		/>
      			{/* <div className={styles.something}>{order.item}</div> */}
      			<div className={styles.somewhereSt}>{order.address}</div>
      			<div className={styles.div}>10/10/10</div>
      			<img className={styles.amazonIcon} alt="" src="Shopify.png" />
      			<div className={styles.div1}>{order.price}$</div>
				<button className={styles.button_delete} onClick={delete_id}>Delete</button>
    		</div>);
};

export default Details;
