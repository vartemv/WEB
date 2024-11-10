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
    const [activeFilter, setActiveFilter] = useState<string>("all");

    const refreshOrder = async() => {
        const data = await get_orders();
        setOrders(data);
    }

    useEffect(() => {
        refreshOrder()
    }, []);

    const handleOrderCreated = async () => {
        refreshOrder();
        setCreateOrderOpen(false);
    };

    const handleOrderChanged = async () => {
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

    const handleFilterClick = (filter: string) => {
        setActiveFilter(filter);
    };

    return (<>
        <div className={styles.desktop1}>
            <div className={styles.dashboard}>
                <img className={styles.UserPicture} alt="" src="Ellipse_photo.svg" />
                <div className="spacer" />
                    <div className={styles.iconsGroup}>
                        <img className={styles.homeIcon} alt="" src="Home.png" />
                        <img className={styles.homeIcon} alt="" src="Cart.png" />
                        <img className={styles.homeIcon} alt="" src="Parcel.png" />
                        <img className={styles.homeIcon} alt="" src="Graph.png" />
                        <img className={styles.homeIcon} alt="" src="Gears.png" />
                    </div>
            </div>
            <div className={styles.OrdersGrid}>
            {orders.map((order) => (
                <div key={order.id} className={styles.order} onClick={() => openDetails(order)}>
                    
                    <div className={styles.TextGrid}>
                        <div className={styles.ItemCont}>
                        <img className = {styles.TextGridIcon} src="Cart_item.svg" alt="*"/>
                        <div className={styles.ItemName}>{order.item}</div>
                        </div>
                        <div className={styles.ItemCont}>
                            <img className = {styles.TextGridIcon} src="Person.svg" alt="*"/>
                            <div className={styles.ClientName}>{order.name}</div>
                        </div>
                        <div className={styles.ItemCont}>
                            <img className = {styles.TextGridIcon} src="Location.svg" alt="*"/>
                            <div className={styles.ClientAddress}>{order.address}</div>
                        </div>
                    </div>
                    <hr className={styles.Separator} />
                    <div className={styles.OrderId}> Order # {order.id}</div>
                    <img className={styles.MarketplaceIcon} alt="" src="Shopify.svg" />
                    <div className={styles.StatusWrapper}>
                        <div className={styles.Status}>{order.status}</div>
                    </div>
                </div>
            ))}
            </div>
            <div className={styles.filters}>
                <div className={`${styles.allWrapper} ${activeFilter ===  "all" ? styles.ChoosedFilter : '' }`} onClick={() => handleFilterClick("all")}>
                    All
                </div> 
                <div className={`${styles.activeWrapper} ${activeFilter ===  "active" ? styles.ChoosedFilter : '' }`} onClick={() => handleFilterClick("active")}>
                    Active
                </div>
                <div className={`${styles.notActiveWrapper} ${activeFilter ===  "shipped" ? styles.ChoosedFilter : '' }`} onClick={() => handleFilterClick("shipped")}>
                    Shipped
                </div>
            </div>
            <div className={styles.add} onClick={openCreateOrder}>
                <div className={styles.PlusWrapper} />
                <img className={styles.plusIcon} alt="" src="Plus.png" />
            </div>
        </div>
        {isDetailsOpen && selectedOrder &&(
            <PortalPopup
                overlayColor="rgba(113, 113, 113, 0.3)"
                placement="Centered"
                onOutsideClick={closeDetails}>
                <Details order={selectedOrder} onChange={handleOrderChanged}/>
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
