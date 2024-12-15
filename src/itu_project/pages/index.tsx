import { FunctionComponent } from "react";
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
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const Desktop: FunctionComponent = () => {
    const {
        orders,
        devices,
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
        closeDeviceDetails
    } = useDesktopLogic();

    return (
        
        <div className={styles.desktop1}>
            <DndProvider backend={HTML5Backend}>
            <Dashboard navigateToAnalytics={navigateToAnalytics} />
            <OrdersGrid orders={filteredOrders} onOrderClick={openDetails} />
            <Filters activeFilter={activeFilter} onFilterClick={handleFilterClick} />
            <AddOrderButton onClick={openCreateOrder} />
            <Devices orders={orders} devices={devices} onDeviceClick={openDeviceDetails}/>
            

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
            </DndProvider>
        </div>
    );
};

export default Desktop;