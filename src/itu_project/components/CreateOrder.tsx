import { FunctionComponent, useState } from 'react';
import styles from '../styles/CreateOrder.module.css';

export type CreateOrderType = {
  	className?: string;
}

interface FormData {
	item: string;
	name: string;
	address: string;
	item_id: string;
  }

const CreateOrder:FunctionComponent<CreateOrderType> = ({ className="" }) => {
	const [orderData, setOrderData] = useState<FormData>({
		item: '',
		name: '',
		address: '',
		item_id: '',
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
			.then(({ data }) => console.log(data));
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
        				<div className={styles.label}>What</div>
        				<input
							name="item"
                    		className={styles.frame}
                    		value={orderData.item}
                    		onChange={handleInputChange}
                    		placeholder="Enter item name"
                		/>
      			</div>
      			<div className={styles.obFormslabel1}>
        				<div className={styles.label}>Where</div>
						<input
							name = "address"
                    		className={styles.frame}
                    		value={orderData.address}
                    		onChange={handleInputChange}
                    		placeholder="Enter address"
                		/>
      			</div>
      			<div className={styles.obFormslabel2}>
        				<div className={styles.label}>ID</div>
        				<input
							name = "item_id"
                    		className={styles.frame}
                    		value={orderData.item_id}
                    		onChange={handleInputChange}
                    		placeholder="Enter item id"
                		/>
      			</div>
				  <div className={styles.obFormslabel3}>
        				<div className={styles.label}>Name</div>
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
