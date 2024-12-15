import { FunctionComponent } from "react";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { DeviceGrid } from "./devicesGrid";
import { Device, Order } from "types"; // Replace with actual type definition

interface DevicesGridProps {
    orders: Order[];
    devices: Device[];
    onDeviceClick: (order: Device) => void;
}

export const Devices: FunctionComponent<DevicesGridProps> = ({orders, devices, onDeviceClick}) => {
    return (
        <Sheet modal>
            <SheetTrigger asChild>
                <div
                    className="fixed bottom-0 right-1/2 transform translate-x-1/2 cursor-pointer bg-blue-500 opacity-50 hover:opacity-80 transition-opacity w-10 h-10 flex items-center justify-center rounded-t-full"
                    aria-label="Open sheet"
                >
                    <span className="text-white text-2xl font-bold">{`^`}</span>
                </div>
            </SheetTrigger>
            <SheetContent className="h-[400px] bg-white text-black" side="bottom">
                <SheetHeader>
                    <SheetTitle>New one</SheetTitle>
                </SheetHeader>
                <SheetFooter>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
};