// Author: Vereninov Artem, xveren00
import { FunctionComponent, useState, useEffect } from 'react'; // Import React hooks and component types
import styles from '../styles/CreateOrder.module.css'; // Import CSS module for styling
import { Order } from 'types'; // Import the Order type
import {
	Select, // Import select dropdown component and related subcomponents
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"; // Import custom UI components for the select dropdown

// Type definition for the props that the CreateOrder component will accept
export type CreateOrderType = {
	className?: string; // Optional className for custom styling
	onCreation?: () => void; // Callback function to be triggered after the order creation
}

// Function to get the current date in the format YYYY/MM/DD
const getCurrentDateString = () => {
	const date = new Date();
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed, so we add 1
	const day = String(date.getDate()).padStart(2, '0'); // Ensure the day is two digits
	return `${year}/${month}/${day}`; // Return formatted date string
};

// Main component for creating an order
const CreateOrder: FunctionComponent<CreateOrderType> = ({ className = "", onCreation }) => {
	// State to hold the order data with initial values
	const [orderData, setOrderData] = useState<Order>({
		item: '',
		name: '',
		address: '',
		price: 0,
		order_date: getCurrentDateString(), // Set default date as today
		status: "Active",
		id: NaN,
		could_be_printed: false // Initial assumption that order can't be printed
	})

	// Effect hook to log the updated order data whenever it changes
	useEffect(() => {
		console.log('Updated order data:', orderData);
	}, [orderData]); // Dependency array ensures this runs whenever `orderData` changes

	// Function to handle adding the order by sending a POST request to the API
	const add = () => {
		console.log(orderData); // Log the order data before sending
		fetch('/api/add_order', {
			method: 'POST', // HTTP method for the request
			headers: {
				'Content-Type': 'application/json' // Ensure data is sent in JSON format
			},
			body: JSON.stringify(orderData) // Convert order data to JSON string
		})
			.then((res) => res.json()) // Parse the response as JSON
			.then(({ data }) => {
				console.log(data); // Log the response data
				if (onCreation) onCreation(); // If provided, call the onCreation callback
			});
	};

	// Function to handle changes in input fields (name, value)
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target; // Destructure name and value from the input event
		setOrderData((prev) => ({
			...prev, // Spread the previous state
			[name]: value, // Dynamically update the correct field based on input's name
		}));
	};

	// Function to handle changes in the "Printable" dropdown selection
	const handleSelectChange = (value: string) => {
		setOrderData((orderData) => ({
			...orderData, // Spread the previous state
			could_be_printed: value === "yes", // Set `could_be_printed` to true if "yes" is selected
		}));
		console.log(orderData); // Log the updated order data
	};

	// Render the component's JSX
	return (
		<div className={[styles.createOrder, className].join(' ')}> {/* Merge the passed className with the default styling */}

			{/* Product Name Input */}
			<div className={styles.obFormslabel}>
				<div className={styles.label}>Product</div>
				<input
					name="item"
					className={styles.frame}
					value={orderData.item}
					onChange={handleInputChange} // Call handleInputChange when the input changes
					placeholder="Enter item name"
				/>
			</div>

			{/* Address Input */}
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

			{/* Price Input */}
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

			{/* Printable Dropdown */}
			<div className={styles.obFormslabel2}>
				<div className={styles.label}>Printable</div>
				<Select onValueChange={handleSelectChange}> {/* Trigger handleSelectChange on value change */}
					<SelectTrigger className="w-[180px] bg-white text-black">
						<SelectValue placeholder="Print" /> {/* Default placeholder */}
					</SelectTrigger>
					<SelectContent className='z-[100]'>
						<SelectItem value="yes">Yes</SelectItem>
						<SelectItem value="no">No</SelectItem>
					</SelectContent>
				</Select>
			</div>

			{/* Client Name Input */}
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

			{/* Submit Button */}
			<button onClick={add} className={styles.submitButton}>Submit Order</button>

		</div>
	);
};

// Export the CreateOrder component
export default CreateOrder;