import { FunctionComponent, useState, useEffect, useCallback } from 'react';
import Details from "../components/Details";
import PortalPopup from "../components/PortalPopup";
import CreateOrder from "../components/CreateOrder";
import styles from '../styles/Desktop.module.css';
import {Order} from 'types';

const get_orders = async () => {
    const response = await fetch("/api/get_order");
    const obj = await response.json();
    return obj.data;
}

const Desktop: FunctionComponent = () => {

    const [orders, setOrders] = useState<Order[]>([]); 
    const [isDetailsOpen, setDetailsOpen] = useState(false);
    const [isCreateOrderOpen, setCreateOrderOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    const refreshOrder = async() => {
        const data = await get_orders();
        setOrders(data);
    }

    useEffect(() => {
        const loadOrders = async () => {
            refreshOrder();
        };
        loadOrders();
    }, []);

    const handleOrderCreated = async () => {
        refreshOrder();
        setCreateOrderOpen(false);
    };

    const handleOrderDeleted = async () => {
        refreshOrder();
        setDetailsOpen(false);
    };

    const openDetails = useCallback((order: Order) => {
        setSelectedOrder(order);
        setDetailsOpen(true);
    }, []);

    const closeDetails = useCallback(() => {
        setDetailsOpen(false);
    }, []);


    const openCreateOrder = useCallback(() => {
        setCreateOrderOpen(true);
    }, []);

    const closeCreateOrder = useCallback(() => {
        setCreateOrderOpen(false);
    }, []);

    return (<>
        <div className={styles.desktop1}>
            <div className={styles.dashboard}>
                <img className={styles.dashboardChild} alt="" src="Ellipse_photo.svg" />
                <img className={styles.homeIcon} alt="" src="Home.png" />
                <img className={styles.homeIcon} alt="" src="Trolley.png" />
                <img className={styles.homeIcon} alt="" src="Open Parcel.png" />
                <img className={styles.homeIcon} alt="" src="Graph.png" />
                <img className={styles.homeIcon} alt="" src="Gears.png" />
            </div>
            <div className={styles.OrdersGrid}>
            {orders.map((order) => (
                <div key={order.id} className={styles.order} onClick={() => openDetails(order)}>
                    <img className={styles.order1Child} alt="" src="rectangle_order.png" />
                    <div className={styles.printedItem}>{order.item}</div>
                    <div className={styles.johnJohnssss}>{order.name}</div>
                    <div className={styles.johnWatsStreet}>{order.address}</div>
                    <div className={styles.hc49bcdsml}>{order.id}</div>
                    <img className={styles.shopifyIcon} alt="" src="Shopify.png" />
                    <div className={styles.order1Item} />
                    <div className={styles.status}>{order.status}</div>
                </div>
            ))}
            </div>
            <div className={styles.filters}>
                <div className={styles.allWrapper}>
                    All
                </div> 
                <div className={styles.activeWrapper}>
                    Active
                </div>
                <div className={styles.notActiveWrapper}>
                    Shipped
                </div>
            </div>
            <div className={styles.add} onClick={openCreateOrder}>
                <div className={styles.addChild} />
                <img className={styles.plusIcon} alt="" src="Plus.png" />
            </div>
        </div>
        {isDetailsOpen && selectedOrder &&(
            <PortalPopup
                overlayColor="rgba(113, 113, 113, 0.3)"
                placement="Centered"
                onOutsideClick={closeDetails}>
                <Details order={selectedOrder} onDelete={handleOrderDeleted}/>
            </PortalPopup>
        )}
        {isCreateOrderOpen && (
            <PortalPopup
                overlayColor="rgba(113, 113, 113, 0.3)"
                placement="Centered"
                onOutsideClick={closeCreateOrder}>
                <CreateOrder onCreation={handleOrderCreated}/>
            </PortalPopup>
        )}</>);
};

export default Desktop;
