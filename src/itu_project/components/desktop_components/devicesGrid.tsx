// Author Vereninov Artem, xveren00
import { FunctionComponent, useEffect } from "react"; // Importing React and necessary hooks
import FlipMove from "react-flip-move"; // Importing FlipMove for animations when list items move
import { useDroppable } from "@dnd-kit/core"; // Importing the useDroppable hook for drag-and-drop functionality
import styles from "../../styles/Desktop.module.css"; // Importing styles for the component (assumed to be in Desktop.module.css)
import { Device, Order } from "types"; // Importing the types for Device and Order (replace with actual definitions)
import { useDesktopLogic } from "@/hooks/useDesktopLogic"; // Importing custom hook for managing desktop logic (not used in this snippet)
import { useDevices } from "@/contexts/DeviceContext"; // Importing context hook for devices data

// DevicesGridProps interface defines the expected props for DeviceGrid component
interface DevicesGridProps {
    orders: Order[]; // List of orders (not used in this component but might be passed for other purposes)
    onDeviceClick: (order: Device) => void; // Function to handle click event on a device
}

// DeviceGrid component renders a list of devices and maps them to DroppableDevice components
export const DeviceGrid: FunctionComponent<DevicesGridProps> = ({ orders, onDeviceClick }) => {
    // Accessing the devices context
    const { devices } = useDevices();
    console.log(devices); // Logging devices to the console for debugging purposes

    return (
        <div className={styles.DevicesGrid}>
            {/* Mapping each device to a DroppableDevice component */}
            {devices.map((device) => (
                <DroppableDevice key={device.id} device={device} onDeviceClick={onDeviceClick} />
            ))}
        </div>
    );
};

// DroppableDeviceProps interface defines the expected props for DroppableDevice component
interface DroppableDeviceProps {
    device: Device; // Single device object
    onDeviceClick: (order: Device) => void; // Function to handle click event on a device
}

// DroppableDevice component handles each individual device with drag-and-drop functionality
const DroppableDevice: FunctionComponent<DroppableDeviceProps> = ({ device, onDeviceClick }) => {
    // Disable droppable functionality if the device is occupied, otherwise initialize droppable
    const { isOver, setNodeRef } = device.occupied
        ? { isOver: false, setNodeRef: () => {} } // Disable droppable if device is occupied
        : useDroppable({
              id: device.id, // Unique identifier for the droppable area, based on device ID
          });

    // Accessing the function to refresh the devices (likely after a drop operation)
    const { refreshDevices } = useDevices();

    return (
        <div
            ref={setNodeRef} // Setting the droppable reference on the device element
            className={`${styles.device} ${isOver && !device.occupied ? styles.hovered : ""}`} // Apply a hover effect if device is being dragged over (and is not occupied)
            onClick={() => onDeviceClick(device)} // Handle click event on the device (passing the clicked device)
            onDrop={refreshDevices} // Refresh devices when an item is dropped on the device
        >
            {/* Device status wrapper to indicate if the device is occupied or free */}
            <div
                className={`${styles.StatusWrapper} ${device.occupied ? styles.StatusShipped : styles.StatusActive}`}
            >
                <div className={styles.Status}>{device.occupied ? "Occupied" : "Free"}</div>
            </div>

            {/* Device photo */}
            <img src={device.photo} className={styles.devPhoto} />

            {/* Separator line */}
            <hr className={styles.Separator} />

            {/* Device name */}
            <div className={styles.OrderId}>{device.name}</div>
        </div>
    );
};
