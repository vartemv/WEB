import { FunctionComponent, useState, useCallback } from 'react';
import Details from "../components/Details";
import PortalPopup from "../components/PortalPopup";
import CreateOrder from "../components/CreateOrder";
import styles from '../styles/Desktop.module.css';
import {Order} from 'types';

const Desktop: FunctionComponent = () => {
    const [orders, setOrders] = useState<Order[]>([
        { id: 5315315, name: 'John Johnssss', address: 'John Wats street', status: 'Printed item' }
    ]);
    const [isDetailsOpen, setDetailsOpen] = useState(false);
    const [isCreateOrderOpen, setCreateOrderOpen] = useState(false);

    const openDetails = useCallback(() => {
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

    const addOrder = (newOrder: Order) => {
        setOrders((prevOrders) => [...prevOrders, newOrder]);
    };

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
                <div key={order.id} className={styles.order} onClick={openDetails}>
                    <img className={styles.order1Child} alt="" src="rectangle_order.png" />
                    <div className={styles.printedItem}>{order.status}</div>
                    <div className={styles.johnJohnssss}>{order.name}</div>
                    <div className={styles.johnWatsStreet}>{order.address}</div>
                    <div className={styles.hc49bcdsml}>{order.id}</div>
                    <img className={styles.shopifyIcon} alt="" src="Shopify.png" />
                    <div className={styles.order1Item} />
                    <div className={styles.status}>Status</div>
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
        {isDetailsOpen && (
            <PortalPopup
                overlayColor="rgba(113, 113, 113, 0.3)"
                placement="Centered"
                onOutsideClick={closeDetails}>
                <Details />
            </PortalPopup>
        )}
        {isCreateOrderOpen && (
            <PortalPopup
                overlayColor="rgba(113, 113, 113, 0.3)"
                placement="Centered"
                onOutsideClick={closeCreateOrder}
            >
                <CreateOrder onAddOrder= {addOrder}/>
            </PortalPopup>
        )}</>);
};

export default Desktop;
