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
            return res.data;
        })
        .catch ((err) => {
            return {success: false, data: null, message: "Failes to create device"};
        })
    }

    return {createDevice}
};