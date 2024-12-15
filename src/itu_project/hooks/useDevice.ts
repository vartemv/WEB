import { Device } from "@/types";
import axios from "axios";

interface deviceCreate
{
    photo: string;
    name: string;
}

export const useDevice = () => {

    const createDevice = async (device: deviceCreate) => {
        return await axios
        .post('/api/create_device', device)
        .then((res) => {
            return {success: true, data:res.data};
        })
        .catch ((err) => {
            return {success: false, data: null, message: "Failed to create device"};
        })
    }

    const changeStatus = async (deviceID: string) => {
        return await axios
        .post('/api/change_device_status', {deviceID:deviceID})
        .then((res)=>{
            return {success: true, data: res.data};
        })
        .catch((err)=>{
            return {success: false, data: null, message: "Failed to change status of device"}
        })
    }

    return {createDevice, changeStatus}
};