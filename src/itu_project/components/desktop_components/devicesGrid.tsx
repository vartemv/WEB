import { FunctionComponent, useEffect } from "react";
import FlipMove from "react-flip-move";
import { useDroppable } from "@dnd-kit/core";
import styles from "../../styles/Desktop.module.css"; // Replace with your actual styles
import { Device, Order } from "types"; // Replace with actual type definition
import { useDesktopLogic } from "@/hooks/useDesktopLogic";
import { useDevices } from "@/contexts/DeviceContext";

interface DevicesGridProps {
    orders: Order[];
    onDeviceClick: (order: Device) => void;
}

export const DeviceGrid: FunctionComponent<DevicesGridProps> = ({ orders, onDeviceClick }) => {
    const {devices} = useDevices();
    console.log(devices)
    return(
    <div className={styles.DevicesGrid}>
        {devices.map((device) => (
            <DroppableDevice key={device.id} device={device} onDeviceClick={onDeviceClick} />
        ))}
    </div>)
};

interface DroppableDeviceProps {
    device: Device;
    onDeviceClick: (order:Device) => void;
}

const DroppableDevice: FunctionComponent<DroppableDeviceProps> = ({ device, onDeviceClick }) => {
    const { isOver, setNodeRef } = useDroppable({
        id: device.id, // Unique identifier for the droppable area
      });
    const {refreshDevices} = useDevices();
    return (
        <div
        ref={setNodeRef}
        className={`${styles.device} ${isOver ? styles.hovered : ""}`}
        onClick={() => onDeviceClick(device)}
        onDrop={refreshDevices}
        >
            <div className={styles.Status}>{device.occupied ? "True" : "False"}</div>
            <img src={device.photo} className={styles.devPhoto} />
            <hr className={styles.Separator} />
            <div className={styles.OrderId}>{device.name}</div>
        </div>
    )

}