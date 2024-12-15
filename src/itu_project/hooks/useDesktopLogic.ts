import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { Order, Device } from "types"; // Replace with actual type definition
import { useDevice } from "./useDevice";

const get_from_db = async (api: string) => {
    const response = await fetch(api);
    if (!response.ok) throw new Error("Failed to fetch");
    const obj = await response.json();
    return obj.data;
}

export const useDesktopLogic = () => {
    const router = useRouter();
    const [orders, setOrders] = useState<Order[]>([]);
    const [isDetailsOpen, setDetailsOpen] = useState(false);
    const [isDeviceDetailsOpen, setDeviceDetailsOpen] = useState(false);
    const [isCreateOrderOpen, setCreateOrderOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [activeFilter, setActiveFilter] = useState<string>("all");
    const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);

    const refreshOrder = async () => {
        const order = await get_from_db("/api/get_order");
        setOrders(order);
    };

    useEffect(() => {
        refreshOrder();
    }, []);

    const filteredOrders = useMemo(() => {
        return orders.filter((order) => activeFilter === "all" || activeFilter === order.status);
    }, [orders, activeFilter]);

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

    const openDeviceDetails = useCallback((device: Device) => {
        setSelectedDevice(device);
        setDeviceDetailsOpen(true);
    }, []);

    const closeDetails = useCallback(() => {
        setDetailsOpen(false);
    }, []);
    
    const closeDeviceDetails = useCallback(() => {
        setDeviceDetailsOpen(false);
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

    const navigateToAnalytics = () => {
        router.push("/analytics");
    };
    

    return {
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
        refreshOrder
    };
};