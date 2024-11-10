import { FunctionComponent, useState, useRef } from 'react';
import styles from '../styles/Details.module.css';
import { Order } from 'types';

export type DetailsType = {
  	className?: string;
	order: Order;
	onChange?: () => void;
}

const Details: FunctionComponent<DetailsType> = ({ className = "", order, onChange }) => {
	const [temp_order, SetTempData] = useState<Order>(order);
	const [isEditing, setIsEditing] = useState(false);
	const HighlightElementsRef = useRef<HTMLDivElement>(null);

	const triggerHighlight = () => {
		if (HighlightElementsRef.current) {
        const elements = HighlightElementsRef.current.querySelectorAll('.highlight-target'); // Adjust selector as needed

        elements.forEach((el) => {
            el.classList.add(styles.editable); // Add pulse class

            // Remove the class after animation ends
            // el.addEventListener('animationend', () => {
            //     el.classList.remove(styles.pulseAnimation);
            // }, { once: true }); // Ensures the event listener is removed after it triggers once
        });
	}
    };


	const delete_id = () => {
		fetch('/api/delete_order', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(order),
		})
			.then(() => {
				if (onChange) onChange();
			});
	};

	const update_order = () => {
		fetch('/api/update_order', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(temp_order),
		})
			.then(() => {
				setIsEditing(false);
				if (onChange) onChange();
			});
	};

	const updating = () => {
		setIsEditing(true);
		triggerHighlight();
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

			<div className={styles.centerWrapper}>
				<div className={styles.item_id}>{order.id}</div>
			</div>
			<div ref={HighlightElementsRef}>	
			<div className={styles.infoGrid}>
			<label htmlFor="item" className={`${styles.labelItem} ${styles.label}`}>Item</label>
				<input
					id="item"
					name="item"
					className={`${styles.something} ${styles.dynamic_input} highlight-target`}
					value={temp_order.item}
					onChange={handleInputChange}
					readOnly={!isEditing}
				/>
			

			{/* Label and input for address */}
			
				<label htmlFor="address" className={`${styles.labelAddress} ${styles.label}`}>Address</label>
				
				<input
					id="address"
					name="address"
					className={`${styles.somewhereSt} ${styles.dynamic_input} highlight-target`}
					value={temp_order.address}
					onChange={handleInputChange}
					readOnly={!isEditing}
				/>
			

			{/* Label and input for order_date */}
			
				<label htmlFor="order_date" className={`${styles.labelOrder} ${styles.label}`}>Order Date</label>
				
				<input
					id="order_date"
					name="order_date"
					className={`${styles.div} ${styles.dynamic_input} highlight-target`}
					value={temp_order.order_date}
					onChange={handleInputChange}
					readOnly={!isEditing}
				/>
			

			{/* Label and input for price */}
			
				<label htmlFor="price" className={`${styles.labelPrice} ${styles.label}`}>Price</label>
				
				<input
					id="price"
					name="price"
					className={`${styles.div1} ${styles.dynamic_input} highlight-target`}
					value={temp_order.price}
					onChange={handleInputChange}
					readOnly={!isEditing}
				/>
				</div>
			</div>

			{/* Additional content like images and buttons */}
			
			<img src="edit_icon.png" className={styles.image_update} onClick={updating} />
			{isEditing ? (
				<button className={styles.button_delete} onClick={update_order}>Update</button>
			) : (
				<button className={styles.button_delete} onClick={delete_id}>Delete</button>
			)}
		</div>
	);
};

export default Details;
