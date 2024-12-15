import { FunctionComponent } from "react";
import FlipMove from "react-flip-move";
import { useDrag } from "react-dnd";
import styles from "../../styles/Desktop.module.css"; // Replace with your actual styles
import { Order } from "types"; // Replace with actual type definition

interface OrdersGridProps {
    orders: Order[];
    onOrderClick: (order: Order) => void;
}

export const OrdersGrid: FunctionComponent<OrdersGridProps> = ({ orders, onOrderClick }) => (
    <FlipMove className={styles.OrdersGrid}>
        {orders.map((order) => (
            <div key={order.id} className={styles.order} onClick={() => onOrderClick(order)}>
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
                    className={`${styles.StatusWrapper} ${order.status === "Shipped" ? styles.StatusShipped : styles.StatusActive}`}
                >
                    <div className={styles.Status}>{order.status}</div>
                </div>
            </div>
        ))}
    </FlipMove>
);