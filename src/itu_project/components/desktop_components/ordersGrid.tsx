//Vereninov Artem, xveren00
import { FunctionComponent } from "react"; // Importing React for functional component creation
import { DndContext, useDraggable, DragEndEvent } from "@dnd-kit/core"; // Importing necessary hooks for drag-and-drop functionality
import styles from "../../styles/Desktop.module.css"; // Importing the styles for the component
import { Order } from "types"; // Importing the Order type (replace with the actual type definition)


// Defining the expected props for the OrdersGrid component
interface OrdersGridProps {
    orders: Order[]; // Array of orders to be displayed in the grid
    onOrderClick: (order: Order) => void; // Function to handle clicks on individual orders
}

// Defining the expected props for the DraggableOrder component
interface DraggableOrderProps {
    order: Order; // Single order to be displayed as a draggable item
    onOrderClick: (order: Order) => void; // Function to handle clicks on individual orders
}

// DraggableOrder Component
// This component represents a single order that can be dragged within the grid
const DraggableOrder: FunctionComponent<DraggableOrderProps> = ({ order, onOrderClick }) => {

    // useDraggable hook to make the order draggable
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: order.id, // Unique identifier for the draggable item
    });

    // Applying transform styles to position the dragged item
    const style = {
        transform: transform
            ? `translate3d(${transform.x}px, ${transform.y}px, 0)` // Applying the transformed position while dragging
            : undefined,
        zIndex: transform ? 10000 : "auto" // Ensures the dragged item is above other items
    };

    return (
        <div
            ref={setNodeRef} // Assigning the ref for draggable item
            style={{ ...style }} // Applying dynamic styles based on dragging
            {...(order.could_be_printed && order.status === "Active" ? listeners : {})} // Attaching drag listeners if the order can be printed and is active
            {...attributes} // Applying the attributes necessary for drag functionality
            className={`${styles.order} `}
            onClick={() => onOrderClick(order)} // Triggering the order click handler
        >
            {/* Order Details Section */}
            <div className={styles.TextGrid}>
                {/* Item Name */}
                <div className={styles.ItemCont}>
                    <img className={styles.TextGridIcon} src="Cart_item.svg" alt="*" />
                    <div className={styles.ItemName}>{order.item}</div>
                </div>
                {/* Client Name */}
                <div className={styles.ItemCont}>
                    <img className={styles.TextGridIcon} src="Person.svg" alt="*" />
                    <div className={styles.ClientName}>{order.name}</div>
                </div>
                {/* Client Address */}
                <div className={styles.ItemCont}>
                    <img className={styles.TextGridIcon} src="Location.svg" alt="*" />
                    <div className={styles.ClientAddress}>{order.address}</div>
                </div>
            </div>

            <hr className={styles.Separator} /> {/* Separator between order details and other information */}

            {/* Order ID */}
            <div className={styles.OrderId}> Order # {order.id}</div>

            <img className={styles.MarketplaceIcon} alt="" src="Shopify.svg" /> {/* Marketplace icon */}

            {/* Status Section */}
            <div
                className={`${styles.StatusWrapper} ${styles.statusPadding} ${order.status === "Shipped" ? styles.StatusShipped : (order.status === "Printing"? styles.StatusPrinting : styles.StatusActive)}`}
            >
                {/* Displaying order status */}
                <div className={styles.Status}>{order.status}</div>
            </div>

            {/* Printable Icon (only shown if the order can be printed) */}
            {order.could_be_printed && (
                <img className={styles.PrintableIconWrapper} alt="" src="printer.svg" />
            )}
        </div>
    );
};

// OrdersGrid Component
// This component renders a grid of draggable orders
export const OrdersGrid: FunctionComponent<OrdersGridProps> = ({ orders, onOrderClick }) => (
    
    <div className={styles.OrdersGrid}> {/* Main grid container */}
        {orders.map((order) => (
            <DraggableOrder
                key={order.id} // Unique key for each order
                order={order} // Passing individual order data to DraggableOrder
                onOrderClick={onOrderClick} // Passing the order click handler
            />
        ))}
    </div>
);
