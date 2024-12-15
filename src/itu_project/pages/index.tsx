import { FunctionComponent, useEffect } from "react";
import { useDesktopLogic } from "../hooks/useDesktopLogic";
import { Dashboard } from "@/components/desktop_components/dashboard";
import { OrdersGrid } from "@/components/desktop_components/ordersGrid";
import { Filters } from "@/components/desktop_components/filters";
import { AddOrderButton } from "@/components/desktop_components/addOrder";
import { Devices } from "@/components/desktop_components/devices";
import  PortalPopup  from "../components/PortalPopup";
import  Details  from "../components/Details";
import  CreateOrder  from "../components/CreateOrder";
import DeviceDetails from "../components/deviceDetails";
import styles from "../styles/Desktop.module.css";
import { DndContext } from "@dnd-kit/core";
import { DevicesProvider, useDevices } from "@/contexts/DeviceContext";

const DesktopContent: FunctionComponent = () => {
    const {
        orders,
        filteredOrders,
        isDetailsOpen,
        isCreateOrderOpen,
        selectedOrder,
        activeFilter,
        isDeviceDetailsOpen,
        selectedDevice,
        handleOrderCreated,
        handleOrderChanged,
        openDetails,
        closeDetails,
        openCreateOrder,
        closeCreateOrder,
        handleFilterClick,
        navigateToAnalytics,
        openDeviceDetails,
        closeDeviceDetails,
    } = useDesktopLogic();

    const {handleDragEnd, refreshDevices} = useDevices();

    useEffect(()=>{
        refreshDevices();
    },[]);

    return (
        <DndContext onDragEnd={handleDragEnd}>
        <div className={styles.desktop1}>
            <Dashboard navigateToAnalytics={navigateToAnalytics} />
            <OrdersGrid orders={filteredOrders} onOrderClick={openDetails} />
            <Filters activeFilter={activeFilter} onFilterClick={handleFilterClick} />
            <AddOrderButton onClick={openCreateOrder} />
            <Devices orders={orders} onDeviceClick={openDeviceDetails} onDeviceAdd={refreshDevices}/>
            {isDetailsOpen && selectedOrder && (
                <PortalPopup
                    overlayColor="rgba(113, 113, 113, 0.3)"
                    placement="Centered"
                    onOutsideClick={closeDetails}>
                    <Details order={selectedOrder} onChange={handleOrderChanged} />
                </PortalPopup>
            )}

            {isDeviceDetailsOpen && selectedDevice && (
                <PortalPopup
                    overlayColor="rgba(113, 113, 113, 0.3)"
                    placement="Centered"
                    onOutsideClick={closeDeviceDetails}>
                    <DeviceDetails selDevice={selectedDevice} />
                </PortalPopup>
            )}

            {isCreateOrderOpen && (
                <PortalPopup
                    overlayColor="rgba(113, 113, 113, 0.3)"
                    placement="Centered"
                    onOutsideClick={closeCreateOrder}>
                    <CreateOrder onCreation={handleOrderCreated} />
                </PortalPopup>
            )}
        </div>
        </DndContext>
    );
};

const Desktop: FunctionComponent = () => {
    return (
        <DevicesProvider>
            <DesktopContent/>
        </DevicesProvider>
    )
} 

export default Desktop;