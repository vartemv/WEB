import React, { createContext, useContext, useState, ReactNode, useCallback } from "react";
import { Device } from "@/types";
import { useDevice } from "@/hooks/useDevice"; // Importing changeStatus function

// Define the shape of the context data
interface DevicesContextType {
  devices: Device[];
  setDevices: React.Dispatch<React.SetStateAction<Device[]>>;
  refreshDevices: () => Promise<void>;
  handleOrderAssignment: (orderId: string, deviceId: string) => void;
  handleDragEnd: ({ active, over }: any) => void;
}

// Create the context with an initial undefined value
const DevicesContext = createContext<DevicesContextType | undefined>(undefined);

// Fetch devices from an API
const getDevicesFromDB = async (): Promise<Device[]> => {
  const response = await fetch("/api/get_devices");
  if (!response.ok) {
    throw new Error("Failed to fetch devices");
  }
  const result = await response.json();
  return result.data; // Assuming API response structure contains `data` property
};

// Provider component
export const DevicesProvider = ({ children }: { children: ReactNode }) => {
  const [devices, setDevices] = useState<Device[]>([]);
  const { changeStatus } = useDevice(); // Accessing changeStatus function

  // Function to refresh devices from the API
  const refreshDevices = useCallback(async () => {
    try {
      const fetchedDevices = await getDevicesFromDB();
      setDevices(fetchedDevices);
    } catch (error) {
      console.error("Error refreshing devices:", error);
    }
  }, []);

  // Handle order assignment
  const handleOrderAssignment = useCallback(
    async (orderId: string, deviceId: string) => {
      await changeStatus(deviceId); // Call the changeStatus function
      await refreshDevices(); // Refresh the device list
    },
    [refreshDevices, changeStatus]
  );

  // Handle drag and drop
  const handleDragEnd = useCallback(
    async ({ active, over }: any) => {
      if (over) {
        const orderId = active.id;
        const deviceId = over.id;
        await handleOrderAssignment(orderId, deviceId);
      }
    },
    [handleOrderAssignment]
  );

  return (
    <DevicesContext.Provider
      value={{
        devices,
        setDevices,
        refreshDevices,
        handleOrderAssignment,
        handleDragEnd,
      }}
    >
      {children}
    </DevicesContext.Provider>
  );
};

// Custom hook to consume the DevicesContext
export const useDevices = () => {
  const context = useContext(DevicesContext);
  if (!context) {
    throw new Error("useDevices must be used within a DevicesProvider");
  }
  return context;
};
