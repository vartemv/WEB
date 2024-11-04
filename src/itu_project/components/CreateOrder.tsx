import { FunctionComponent, useState } from 'react';
import styles from '../styles/CreateOrder.module.css';
import {Order} from 'types';

export type CreateOrderType = {
  	className?: string;
	onAddOrder: (newOrder: Order) => void;
}

const CreateOrder:FunctionComponent<CreateOrderType> = ({ className="", onAddOrder }) => {
	const [orderData, setOrderData] = useState<Order>({
		item: '',
		name: '',
		address: '',
		id: 1000,
		price: 1000,
		order_date: new Date(),
		status: "Active"
	})

	const add = () => {
		console.log(orderData);
		fetch('/api/add_order', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(orderData)
		})
			.then((res) => res.json())
			.then(({ data }) => {
				console.log(data);

				onAddOrder(orderData);

				setOrderData({ item: '', name: '', address: '', id: NaN, status: '', order_date: new Date(), price: NaN});
			});
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setOrderData((prev) => ({
            ...prev,
            [name]: value, // Dynamically update the correct field based on the input's name
        }));
    };

  	return (
    		<div className={[styles.createOrder, className].join(' ')}>
      			<div className={styles.createOrder1}>Create order</div>
      			<div className={styles.obFormslabel}>
        				<div className={styles.label}>item name</div>
        				<input
							name="item"
                    		className={styles.frame}
                    		value={orderData.item}
                    		onChange={handleInputChange}
                    		placeholder="Enter item name"
                		/>
      			</div>
      			<div className={styles.obFormslabel1}>
        				<div className={styles.label}>address</div>
						<input
							name = "address"
                    		className={styles.frame}
                    		value={orderData.address}
                    		onChange={handleInputChange}
                    		placeholder="Enter address"
                		/>
      			</div>
      			<div className={styles.obFormslabel2}>
        				<div className={styles.label}>item ID</div>
        				<input
							name = "id"
                    		className={styles.frame}
                    		value={orderData.id}
                    		onChange={handleInputChange}
                    		placeholder="Enter item id"
                		/>
      			</div>
				  <div className={styles.obFormslabel3}>
        				<div className={styles.label}>Client Name</div>
        				<input
							name = "name"
                    		className={styles.frame}
                    		value={orderData.name}
                    		onChange={handleInputChange}
                    		placeholder="Enter name"
                		/>
      			</div>
				  <button onClick={add} className={styles.submitButton}>Submit Order</button>
      			<img className={styles.createOrderChild} alt="" src="Rectangle 4.png" />
    		</div>);
};

export default CreateOrder;
