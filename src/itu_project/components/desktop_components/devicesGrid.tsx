import { FunctionComponent } from "react";
import FlipMove from "react-flip-move";
import { useDrag } from "react-dnd";
import styles from "../../styles/Desktop.module.css"; // Replace with your actual styles
import { Device, Order } from "types"; // Replace with actual type definition

interface DevicesGridProps {
    orders: Order[];
    devices: Device[];
    onDeviceClick: (order: Device) => void;
}

export const DeviceGrid: FunctionComponent<DevicesGridProps> = ({ orders, devices, onDeviceClick }) => (
    <FlipMove className={styles.DevicesGrid}>
        {devices.map((device) => (
            <div key={device.id} className={styles.device} onClick={() => onDeviceClick(device)}>
                <img src={"Cart_item.svg"}/>
                <hr className={styles.Separator} />
                <div className={styles.OrderId}>{device.name}</div>
            </div>
        ))}
    </FlipMove>
);