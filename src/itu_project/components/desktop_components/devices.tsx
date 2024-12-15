import { FunctionComponent } from "react";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { DeviceGrid } from "./devicesGrid";
import { Device, Order } from "types"; // Replace with actual type definition
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useRef } from "react";
import { useDownloads } from "@/hooks/useDownload";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";



interface DevicesGridProps {
    orders: Order[];
    onDeviceClick: (order: Device) => void;
    onDeviceAdd: () => void;
}

export const Devices: FunctionComponent<DevicesGridProps> = ({ orders, onDeviceClick, onDeviceAdd }) => {

    const [deviceSheet, setDeviceSheet] = useState<boolean>(false);
    const [name, setName] = useState("");
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileRef = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<File | null>(null);
    const [addDeviceSheet, setAddDeviceSheet] = useState<boolean>(false);
    const { photoUpload } = useDownloads();

    const openDevicesSheet = () => setDeviceSheet(true);
    const closeDevicesSheet = () => setDeviceSheet(false);
    const openAddDeviceSheet = () => setAddDeviceSheet(true);
    const closeAddDeviceSheet = () => setAddDeviceSheet(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
            setImagePreview(URL.createObjectURL(selectedFile));
        }
    };

    return (
        <div>
            <Sheet modal={false} open={deviceSheet} onOpenChange={(open) => {
                if (open) {
                    setDeviceSheet(open);
                }
            }}>
                <SheetTrigger asChild >
                    <div
                        className="fixed bottom-0 right-1/2 transform translate-x-1/2 cursor-pointer bg-blue-500 opacity-50 hover:opacity-80 transition-opacity w-10 h-10 flex items-center justify-center rounded-t-full"
                        aria-label="Open sheet"
                        onClick={openDevicesSheet}
                    >
                        <span className="text-white text-2xl font-bold">{`^`}</span>
                    </div>
                </SheetTrigger>
                <SheetContent className={`h-[435px] bg-white text-black`}
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(1px)' }} side="bottom">
                    <SheetHeader className="flex justify-between">
                        <VisuallyHidden.Root>
                            <SheetDescription>
                                Description goes here
                            </SheetDescription>
                        </VisuallyHidden.Root>
                        <div className="flex items-center gap-2">
                            <SheetTitle className="text-lg font-bold">Your devices</SheetTitle>
                            <button
                                className="bg-blue-600 text-white px-2 py-1 w-30 h-8 text-sm rounded-md hover:bg-blue-700 transition"
                                onClick={() => {
                                    closeDevicesSheet(); // Close current
                                    openAddDeviceSheet(); // Open new sheet
                                }}
                            >
                                Add Device
                            </button>

                            <button
                                className="text-gray-600 hover:text-gray-800 transition ml-auto"
                                onClick={closeDevicesSheet}
                                aria-label="Close"
                            >
                                ✖
                            </button>
                        </div>
                    </SheetHeader>

                    <SheetFooter>
                        <ScrollArea>
                            <DeviceGrid orders={orders} onDeviceClick={onDeviceClick} />
                            <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                    </SheetFooter>
                </SheetContent>
            </Sheet>

            <Sheet open={addDeviceSheet} onOpenChange={setAddDeviceSheet}>

                <SheetContent className="h-[400px] bg-white text-black" side="bottom">
                    <SheetHeader>
                        <div className="flex items-center gap-2">
                            <SheetTitle>Add a New Device</SheetTitle>
                            <button
                                className="text-gray-600 hover:text-gray-800 transition ml-auto"
                                onClick={closeAddDeviceSheet}
                                aria-label="Close"
                            >
                                ✖
                            </button>
                        </div>
                    </SheetHeader>
                    <div className="flex gap-4 py-4">
                        <div className="flex flex-col w-1/3 gap-4"> {/* Adjusted width to 1/3 */}
                            <div className="flex items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Name
                                </Label>
                                <Input
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full" /* Ensures the input resizes proportionally */
                                />
                            </div>
                            <button
                                onClick={async () => {
                                    await photoUpload(file, name);
                                    console.log("Hello")
                                    onDeviceAdd();
                                    closeAddDeviceSheet();
                                }}
                                type="submit"
                                className="w-30"
                            >
                                Add device
                            </button>
                        </div>
                        <div className="w-2/5 max-w-xs gap-2 border-2 border-dashed border-gray-400 p-4 flex flex-col items-center"> {/* Adjusted width and padding */}
                            {imagePreview && (
                                <img
                                    src={imagePreview}
                                    alt="Selected file"
                                    className="mt-2 max-w-[10rem] max-h-[10rem] object-cover" /* Reduced image size */
                                />
                            )}
                            <label className="cursor-pointer">
                                <input
                                    type="file"
                                    className="hidden"
                                    ref={fileRef}
                                    onChange={handleFileChange}
                                    accept="image/*"
                                />
                                <button
                                    type="button"
                                    className="px-3 py-1 bg-blue-500 text-white rounded-md" /* Adjusted button padding */
                                    onClick={() => fileRef.current?.click()}
                                >
                                    Add image
                                </button>
                            </label>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>

        </div>
    )
};