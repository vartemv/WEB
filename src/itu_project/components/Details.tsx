import { FunctionComponent, useState } from 'react';
import styles from '../styles/Details.module.css';
import {Order} from 'types';

export type DetailsType = {
  	className?: string;
	order: Order;
	onChange?: () => void;
}

const Details:FunctionComponent<DetailsType> = ({ className="", order, onChange }) => {

	const [temp_order, SetTempData] = useState<Order>(order)
	const [isEditing, setIsEditing] = useState(false);

	const delete_id = () => {
		fetch('/api/delete_order',{
			method: 'POST',
			headers:{
				'Content-Type':'application/json'
			},
			body: JSON.stringify(order)
		})
			.then(()=>{
				if(onChange) onChange();
			});
	};

	const update_order = () => {
		fetch('/api/update_order',{
			method: 'POST',
			headers:{
				'Content-Type':'application/json'
			},
			body: JSON.stringify(temp_order)
		})
			.then(()=>{
				setIsEditing(false);
				if(onChange) onChange();
			});
	};

	const updating = () => {
		setIsEditing(true);
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
                    	className={`${styles.something} ${styles.dynamic_input}` }
                    	value={temp_order.item}
						onChange={handleInputChange}
						readOnly={!isEditing}
                		/>
      			<input
						name="address" 
						className={`${styles.somewhereSt} ${styles.dynamic_input}`}
						value={temp_order.address}
						onChange={handleInputChange}
						readOnly={!isEditing}
						/>
      			<input 
						name="order_date"
						className={`${styles.div} ${styles.dynamic_input}`}
						value={temp_order.order_date}
						onChange={handleInputChange}
						readOnly={!isEditing}
						/>
				<input 
						name = "price"
						className={`${styles.div1} ${styles.dynamic_input}`}
						value={temp_order.price}
						onChange={handleInputChange}
						readOnly={!isEditing}
						/>
      			<img className={styles.amazonIcon} alt="" src="Shopify.png" />
				<img src="edit_icon.png" className={styles.image_update} onClick={updating}/>
				{ isEditing ?
				<button className={styles.button_delete} onClick={update_order}>Update</button>
					:
				<button className={styles.button_delete} onClick={delete_id}>Delete</button>
				}

    		</div>);
};

export default Details;
