// Author Vereninov Artem, xveren00
import { FunctionComponent, useEffect } from "react"; // Importing React and necessary hooks
import FlipMove from "react-flip-move"; // Importing FlipMove for animations when list items move
import { useDroppable } from "@dnd-kit/core"; // Importing the useDroppable hook for drag-and-drop functionality
import styles from "../../styles/Desktop.module.css"; // Importing styles for the component (assumed to be in Desktop.module.css)
import { Device, Order } from "types"; // Importing the types for Device and Order (replace with actual definitions)
import { useDesktopLogic } from "@/hooks/useDesktopLogic"; // Importing custom hook for managing desktop logic (not used in this snippet)
import { useDevices } from "@/contexts/DeviceContext"; // Importing context hook for devices data

// DevicesGridProps interface defines the expected props for DeviceGrid component

// DeviceGrid component renders a list of devices and maps them to DroppableDevice components
export const DeviceGrid: FunctionComponent = ({ }) => {
    // Accessing the devices context
    const { devices } = useDevices();

    return (
        <div className={styles.DevicesGrid}>
            {/* Mapping each device to a DroppableDevice component */}
            {devices.map((device) => (
                <DroppableDevice key={device.id} device={device}  />
            ))}
        </div>
    );
};

// DroppableDeviceProps interface defines the expected props for DroppableDevice component
interface DroppableDeviceProps {
    device: Device; // Single device object
}

// DroppableDevice component handles each individual device with drag-and-drop functionality
const DroppableDevice: FunctionComponent<DroppableDeviceProps> = ({ device}) => {
    // Always call useDroppable, regardless of the `device.occupied` state
    const { isOver, setNodeRef } = useDroppable({
        id: device.id, // Unique identifier for the droppable area, based on device ID
    });

    // Use conditional rendering for effects and behavior instead of skipping hooks
    const nodeRef = device.occupied ? undefined : setNodeRef;
    const isHovered = isOver && !device.occupied;

    return (
        <div
            ref={nodeRef} // Only set the nodeRef if the device is not occupied
            className={`${styles.device} ${isHovered ? styles.hovered : ""}`} // Apply a hover effect if the device is being dragged over and is not occupied
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
