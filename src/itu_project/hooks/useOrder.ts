import { Order } from "@/types";
import axios from "axios";

export const useOrder = () => {

    const changeOrderStatus = async (status: string, orderId: string) => {
        return await axios
        .post('/api/change_order_status', {status:status, id: orderId})
        .then((res)=>{
            return {success: true, data: res.data};
        })
        .catch((err)=>{
            return {success: false, data: null, message: "Failed to change status of device"}
        })
    }

    return {changeOrderStatus}
};