// Author: Vereninov Artem, xveren00
import { FunctionComponent, useState, useRef } from 'react'; // Import React hooks and types
import styles from '../styles/Details.module.css'; // Import CSS module for styling
import { Order } from 'types'; // Import the Order type to define the shape of the data

// Type definition for the props that the Details component will accept
export type DetailsType = {
  	className?: string; // Optional className for custom styling
	order: Order; // The order data to be displayed and edited
	onChange?: () => void; // Optional callback function to be triggered when the data is updated or deleted
}

// Main Details component that shows order details and allows editing
const Details: FunctionComponent<DetailsType> = ({ className = "", order, onChange }) => {
	// State for temporarily storing order data while editing
	const [temp_order, SetTempData] = useState<Order>(order);
	// State to track if the user is in editing mode
	const [isEditing, setIsEditing] = useState(false);
	// Ref for the container that will be highlighted during editing
	const HighlightElementsRef = useRef<HTMLDivElement>(null);

	// Function to highlight editable elements when editing mode is enabled
	const triggerHighlight = () => {
		if (HighlightElementsRef.current) {
			// Find all elements with the 'highlight-target' class and add the 'editable' class to them
			const elements = HighlightElementsRef.current.querySelectorAll('.highlight-target');
			elements.forEach((el) => {
				el.classList.add(styles.editable); // Add the 'editable' class to highlight
			});
		}
	};

	// Function to handle deleting the order
	const delete_id = () => {
		// Send a request to the backend to delete the order
		fetch('/api/delete_order', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json', // Ensure the data is sent as JSON
			},
			body: JSON.stringify(order), // Send the order data to delete
		})
			.then(() => {
				if (onChange) onChange(); // Trigger the onChange callback after deletion
			});
	};

	// Function to handle updating the order with the new values from the input fields
	const update_order = () => {
		// Send a request to the backend to update the order
		fetch('/api/update_order', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json', // Send the data as JSON
			},
			body: JSON.stringify(temp_order), // Send the updated order data
		})
			.then(() => {
				setIsEditing(false); // Switch off the editing mode
				if (onChange) onChange(); // Trigger the onChange callback after update
			});
	};

	// Function to enable editing mode and highlight editable fields
	const updating = () => {
		setIsEditing(true); // Set editing state to true
		triggerHighlight(); // Trigger the highlighting of editable fields
	};

	// Function to handle input changes while editing
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target; // Get the input's name and value
		SetTempData((prev) => ({
			...prev, // Spread the previous state
			[name]: value, // Dynamically update the correct field based on the input's name
		}));
	};

	return (
		<div className={styles.details}>

			{/* Wrapper for the order ID */}
			<div className={styles.centerWrapper}>
				<div className={styles.item_id}>{order.id}</div> {/* Display order ID */}
			</div>

			{/* Wrapper for editable details */}
			<div ref={HighlightElementsRef}>
				{/* Grid for displaying editable fields */}
				<div className={styles.infoGrid}>
				
					{/* Item Name */}
					<label htmlFor="item" className={`${styles.labelItem} ${styles.label}`}>Item</label>
					<input
						id="item"
						name="item"
						className={`${styles.something} ${styles.dynamic_input} highlight-target`} // Apply styling and make the field editable
						value={temp_order.item} // Display current value of the item
						onChange={handleInputChange} // Handle input changes
						readOnly={!isEditing} // Disable input if not in editing mode
					/>
				
					{/* Address */}
					<label htmlFor="address" className={`${styles.labelAddress} ${styles.label}`}>Address</label>
					<input
						id="address"
						name="address"
						className={`${styles.somewhereSt} ${styles.dynamic_input} highlight-target`} // Apply styling and make the field editable
						value={temp_order.address} // Display current address
						onChange={handleInputChange} // Handle input changes
						readOnly={!isEditing} // Disable input if not in editing mode
					/>
				
					{/* Order Date */}
					<label htmlFor="order_date" className={`${styles.labelOrder} ${styles.label}`}>Order Date</label>
					<input
						id="order_date"
						name="order_date"
						className={`${styles.div} ${styles.dynamic_input} highlight-target`} // Apply styling and make the field editable
						value={temp_order.order_date} // Display current order date
						onChange={handleInputChange} // Handle input changes
						readOnly={!isEditing} // Disable input if not in editing mode
					/>
				
					{/* Price */}
					<label htmlFor="price" className={`${styles.labelPrice} ${styles.label}`}>Price</label>
					<input
						id="price"
						name="price"
						className={`${styles.div1} ${styles.dynamic_input} highlight-target`} // Apply styling and make the field editable
						value={temp_order.price} // Display current price
						onChange={handleInputChange} // Handle input changes
						readOnly={!isEditing} // Disable input if not in editing mode
					/>
				</div>
			</div>

			{/* Image and button for triggering editing or submitting the update */}
			<img src="edit_icon.png" className={styles.image_update} onClick={updating} /> {/* Edit icon to trigger editing mode */}
			{/* Conditional button rendering depending on whether the order is in editing mode */}
			{isEditing ? (
				<button className={styles.button_delete} onClick={update_order}>Update</button> // Update button if in editing mode
			) : (
				<button className={styles.button_delete} onClick={delete_id}>Delete</button> // Delete button if not in editing mode
			)}
		</div>
	);
};

// Export the Details component for use in other parts of the application
export default Details;
