import { FunctionComponent, useState } from 'react';
import styles from '../styles/CreateOrder.module.css';
import { Order } from 'types';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { useEffect } from 'react';

export type CreateOrderType = {
	className?: string;
	onCreation?: () => void;
}

const getCurrentDateString = () => {
	const date = new Date();
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
	const day = String(date.getDate()).padStart(2, '0');
	return `${year}/${month}/${day}`;
};

const CreateOrder: FunctionComponent<CreateOrderType> = ({ className = "", onCreation }) => {
	const [orderData, setOrderData] = useState<Order>({
		item: '',
		name: '',
		address: '',
		price: 0,
		order_date: getCurrentDateString(),
		status: "Active",
		id: NaN,
		could_be_printed: false
	})

	useEffect(() => {
		console.log('Updated order data:', orderData);
	}, [orderData]);

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
				if (onCreation) onCreation();
			});
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setOrderData((prev) => ({
			...prev,
			[name]: value, // Dynamically update the correct field based on the input's name
		}));
	};

	const handleSelectChange = (value: string) => {
		setOrderData((orderData) => ({
			...orderData,
			could_be_printed: value === "yes", // "light" corresponds to "Yes"
		}));
		console.log(orderData);
	};


	return (
		<div className={[styles.createOrder, className].join(' ')}>

			<div className={styles.obFormslabel}>
				<div className={styles.label}>Product</div>
				<input
					name="item"
					className={styles.frame}
					value={orderData.item}
					onChange={handleInputChange}
					placeholder="Enter item name"
				/>
			</div>
			<div className={styles.obFormslabel1}>
				<div className={styles.label}>Address</div>
				<input
					name="address"
					className={styles.frame}
					value={orderData.address}
					onChange={handleInputChange}
					placeholder="Enter address"
				/>
			</div>
			<div className={styles.obFormslabel2}>
				<div className={styles.label}>Price</div>
				<input
					name="price"
					className={styles.frame}
					value={orderData.price}
					onChange={handleInputChange}
					placeholder="0"
				/>
			</div>
			<div className={styles.obFormslabel2}>
				<div className={styles.label}>Printable</div>
				<Select onValueChange={handleSelectChange}>
					<SelectTrigger className="w-[180px] bg-white text-black">
						<SelectValue placeholder="Print" />
					</SelectTrigger>
					<SelectContent className='z-[100]'>
						<SelectItem value="yes">Yes</SelectItem>
						<SelectItem value="no">No</SelectItem>
					</SelectContent>
				</Select>
			</div>
			<div className={styles.obFormslabel3}>
				<div className={styles.label}>Client Name</div>
				<input
					name="name"
					className={styles.frame}
					value={orderData.name}
					onChange={handleInputChange}
					placeholder="Enter name"
				/>
			</div>
			<button onClick={add} className={styles.submitButton}>Submit Order</button>

		</div>);
};

export default CreateOrder;