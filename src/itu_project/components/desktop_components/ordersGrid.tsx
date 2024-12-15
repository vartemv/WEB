import { FunctionComponent } from "react";
import { DndContext, useDraggable } from "@dnd-kit/core";
import styles from "../../styles/Desktop.module.css"; // Replace with your actual styles
import { Order } from "types"; // Replace with actual type definition
import { useState } from "react";

interface OrdersGridProps {
    orders: Order[];
    onOrderClick: (order: Order) => void;
}

interface DraggableOrderProps {
    order: Order;
    onOrderClick: (order: Order) => void;
}



// Draggable Order Component
const DraggableOrder: FunctionComponent<DraggableOrderProps> = ({ order, onOrderClick }) => {
    const [isDropped, setIsDropped] = useState(false);

    const dropAnimationStyle = isDropped
        ? {
            animation: "dropAnimation 1s forwards", // Trigger the drop animation
        }
        : {};

    // Handle the drop event and trigger the animation
    const handleDrop = () => {
        setIsDropped(true);
        setTimeout(() => {
            setIsDropped(false); // Reset the dropped state after animation is complete
        }, 1000); // Match the duration of the animation
    };

    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: order.id,
    });

    const style = {
        transform: transform
            ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
            : undefined,
        zIndex: transform ? 10000 : "auto"
    };

    return (
        <div
            ref={setNodeRef}
            style={{ ...style, ...dropAnimationStyle }}
            {...listeners}
            {...attributes}
            className={`${styles.order} ${isDropped ? styles.dropped : ""}`}
            onClick={() => onOrderClick(order)}
            onDrop={handleDrop}
        >
            <div className={styles.TextGrid}>
                <div className={styles.ItemCont}>
                    <img className={styles.TextGridIcon} src="Cart_item.svg" alt="*" />
                    <div className={styles.ItemName}>{order.item}</div>
                </div>
                <div className={styles.ItemCont}>
                    <img className={styles.TextGridIcon} src="Person.svg" alt="*" />
                    <div className={styles.ClientName}>{order.name}</div>
                </div>
                <div className={styles.ItemCont}>
                    <img className={styles.TextGridIcon} src="Location.svg" alt="*" />
                    <div className={styles.ClientAddress}>{order.address}</div>
                </div>
            </div>
            <hr className={styles.Separator} />
            <div className={styles.OrderId}> Order # {order.id}</div>
            <img className={styles.MarketplaceIcon} alt="" src="Shopify.svg" />
            <div
                className={`${styles.StatusWrapper} ${order.status === "Shipped" ? styles.StatusShipped : styles.StatusActive
                    }`}
            >
                <div className={styles.Status}>{order.status}</div>
            </div>
        </div>
    );
};

// Orders Grid Component
export const OrdersGrid: FunctionComponent<OrdersGridProps> = ({ orders, onOrderClick }) => (
    <div className={styles.OrdersGrid}>
        {orders.map((order) => (
            <DraggableOrder
                key={order.id}
                order={order}
                onOrderClick={onOrderClick}
            />
        ))}
    </div>
);
