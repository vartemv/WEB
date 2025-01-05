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
import { useSensor,useSensors, MouseSensor } from "@dnd-kit/core";

// Main content component for the Desktop
const DesktopContent: FunctionComponent = () => {
    // Destructure logic and state management from custom hook
    const {
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
        closeDeviceDetails,
        refreshOrder
    } = useDesktopLogic();

    // Access device-related state and actions from the context
    const { handleDragEnd, refreshDevices } = useDevices();

    // Refresh device list when the component mounts
    useEffect(() => {
        refreshOrder();
        refreshDevices();
    }, []);

    // Configure drag sensor with activation constraints
    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: {
            distance: 10, // Activate drag only after 10px movement to prevent accidental drags
        },
    });

    // Combine sensors (can be expanded for additional sensor types)
    const sensors = useSensors(mouseSensor);

    return (
        // Provide drag-and-drop context to enable DnD functionality
        <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
            <div className={styles.desktop1}>
                {/* Dashboard component */}
                <Dashboard />
                {/* Orders grid displays the filtered list of orders */}
                <OrdersGrid orders={filteredOrders} onOrderClick={openDetails} />
                {/* Filter component to handle filtering actions */}
                <Filters activeFilter={activeFilter} onFilterClick={handleFilterClick} />
                {/* Button to trigger the Create Order modal */}
                <AddOrderButton onClick={openCreateOrder} />
                {/* Devices component displays devices and allows adding or selecting devices */}
                <Devices 
                    onDeviceAdd={refreshDevices} 
                />

                {/* Conditional rendering: Show order details in a popup if details are open */}
                {isDetailsOpen && selectedOrder && (
                    <PortalPopup
                        overlayColor="rgba(113, 113, 113, 0.3)"
                        placement="Centered"
                        onOutsideClick={closeDetails}>
                        <Details order={selectedOrder} onChange={handleOrderChanged} />
                    </PortalPopup>
                )}

                {/* Conditional rendering: Show device details in a popup */}
                {isDeviceDetailsOpen && selectedDevice && (
                    <PortalPopup
                        overlayColor="rgba(113, 113, 113, 0.3)"
                        placement="Centered"
                        onOutsideClick={closeDeviceDetails}>
                        <DeviceDetails selDevice={selectedDevice} />
                    </PortalPopup>
                )}

                {/* Conditional rendering: Show Create Order modal */}
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

// Main Desktop component that wraps content with DevicesProvider for state management
const Desktop: FunctionComponent = () => {
    return (
        <DevicesProvider>
            <DesktopContent />
        </DevicesProvider>
    );
}; 

// Export the Desktop component as default
export default Desktop;
