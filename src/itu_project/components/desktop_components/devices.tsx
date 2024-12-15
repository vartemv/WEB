// Author Vereninov Artem, xveren00
import { FunctionComponent } from "react"; // Importing FunctionComponent from React for defining functional components
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"; // Importing sheet components for creating modal-like UI elements
import { DeviceGrid } from "./devicesGrid"; // Importing the DeviceGrid component to display device details in a grid
import { Device, Order } from "types"; // Importing types for Device and Order
import { useState } from "react"; // Importing useState hook for managing component state
import { Label } from "@/components/ui/label"; // Importing Label component for form labels
import { Input } from "@/components/ui/input"; // Importing Input component for text inputs
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"; // Importing ScrollArea and ScrollBar components for scrollable content
import { useRef } from "react"; // Importing useRef hook to create references for DOM elements
import { useDownloads } from "@/hooks/useDownload"; // Importing custom hook for handling file downloads and uploads
import * as VisuallyHidden from "@radix-ui/react-visually-hidden"; // Importing a library to hide elements visually but keep them accessible

// Interface for Devices component props
interface DevicesGridProps {
    orders: Order[]; // Orders to display in the device grid
    onDeviceClick: (order: Device) => void; // Function to handle click events on a device
    onDeviceAdd: () => void; // Function to handle adding a new device
}

// Main functional component
export const Devices: FunctionComponent<DevicesGridProps> = ({ orders, onDeviceClick, onDeviceAdd }) => {

    // State hooks to manage visibility of sheets, file upload, and input fields
    const [deviceSheet, setDeviceSheet] = useState<boolean>(false); // Track if the devices sheet is open
    const [name, setName] = useState(""); // State to store the name input for new device
    const [imagePreview, setImagePreview] = useState<string | null>(null); // State to store the image preview for new device
    const fileRef = useRef<HTMLInputElement>(null); // Reference for file input element
    const [file, setFile] = useState<File | null>(null); // State to store the selected file
    const [addDeviceSheet, setAddDeviceSheet] = useState<boolean>(false); // Track if the add device sheet is open
    const { photoUpload } = useDownloads(); // Custom hook for handling photo upload

    // Functions to open and close sheets
    const openDevicesSheet = () => setDeviceSheet(true);
    const closeDevicesSheet = () => setDeviceSheet(false);
    const openAddDeviceSheet = () => setAddDeviceSheet(true);
    const closeAddDeviceSheet = () => setAddDeviceSheet(false);

    // Handle file input change (set preview and file)
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile); // Set the selected file
            setImagePreview(URL.createObjectURL(selectedFile)); // Set the preview URL for the selected file
        }
    };

    return (
        <div>
            {/* Devices sheet, opens when deviceSheet is true */}
            <Sheet modal={false} open={deviceSheet} onOpenChange={(open) => {
                if (open) {
                    setDeviceSheet(open); // Update the state when the sheet is opened
                }
            }}>
                {/* Trigger button to open the sheet */}
                <SheetTrigger asChild>
                    <div
                        className="fixed bottom-0 right-1/2 transform translate-x-1/2 cursor-pointer bg-blue-500 opacity-50 hover:opacity-80 transition-opacity w-10 h-10 flex items-center justify-center rounded-t-full"
                        aria-label="Open sheet"
                        onClick={openDevicesSheet} // Opens the device sheet on click
                    >
                        <span className="text-white text-2xl font-bold">{`^`}</span>
                    </div>
                </SheetTrigger>

                {/* Sheet content with a header and footer */}
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
                            {/* Button to open the add device sheet */}
                            <button
                                className="bg-blue-600 text-white px-2 py-1 w-30 h-8 text-sm rounded-md hover:bg-blue-700 transition"
                                onClick={() => {
                                    closeDevicesSheet(); // Close the devices sheet
                                    openAddDeviceSheet(); // Open the add device sheet
                                }}
                            >
                                Add Device
                            </button>

                            {/* Button to close the device sheet */}
                            <button
                                className="text-gray-600 hover:text-gray-800 transition ml-auto"
                                onClick={closeDevicesSheet} // Closes the devices sheet
                                aria-label="Close"
                            >
                                ✖
                            </button>
                        </div>
                    </SheetHeader>

                    {/* Footer with a scrollable device grid */}
                    <SheetFooter>
                        <ScrollArea>
                            <DeviceGrid orders={orders} onDeviceClick={onDeviceClick} /> {/* Render the device grid */}
                            <ScrollBar orientation="horizontal" /> {/* Horizontal scrollbar */}
                        </ScrollArea>
                    </SheetFooter>
                </SheetContent>
            </Sheet>

            {/* Add device sheet for adding a new device */}
            <Sheet open={addDeviceSheet} onOpenChange={setAddDeviceSheet}>
                <SheetContent className="h-[400px] bg-white text-black" side="bottom">
                    <SheetHeader>
                        <div className="flex items-center gap-2">
                            <SheetTitle>Add a New Device</SheetTitle>
                            {/* Button to close the add device sheet */}
                            <button
                                className="text-gray-600 hover:text-gray-800 transition ml-auto"
                                onClick={closeAddDeviceSheet} // Closes the add device sheet
                                aria-label="Close"
                            >
                                ✖
                            </button>
                        </div>
                    </SheetHeader>

                    {/* Form to add a new device */}
                    <div className="flex gap-4 py-4">
                        <div className="flex flex-col w-1/3 gap-4">
                            {/* Name input field */}
                            <div className="flex items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Name
                                </Label>
                                <Input
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)} // Update name state on change
                                    className="w-full"
                                />
                            </div>

                            {/* Button to add the device */}
                            <button
                                onClick={async () => {
                                    await photoUpload(file, name); // Upload photo and name
                                    console.log("Hello");
                                    onDeviceAdd(); // Call callback to add device
                                    closeAddDeviceSheet(); // Close the add device sheet
                                }}
                                type="submit"
                                className="bg-blue-600 text-white h-8 w-20 text-sm rounded-md hover:bg-blue-700 transition"
                            >
                                Add device
                            </button>
                        </div>

                        {/* Image upload section */}
                        <div className="w-2/5 max-w-xs gap-2 border-2 border-dashed border-gray-400 p-4 flex flex-col items-center">
                            {/* Display image preview if file selected */}
                            {imagePreview && (
                                <img
                                    src={imagePreview}
                                    alt="Selected file"
                                    className="mt-2 max-w-[10rem] max-h-[10rem] object-cover"
                                />
                            )}

                            {/* File input for uploading an image */}
                            <label className="cursor-pointer">
                                <input
                                    type="file"
                                    className="hidden"
                                    ref={fileRef} // File reference for selecting a file
                                    onChange={handleFileChange} // Handle file change
                                    accept="image/*" // Accept only image files
                                />
                                <button
                                    type="button"
                                    className="px-3 py-1 bg-blue-500 text-white rounded-md"
                                    onClick={() => fileRef.current?.click()} // Trigger file input on button click
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
