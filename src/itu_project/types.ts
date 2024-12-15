export interface Order {
    id: number;
    item: string;
    name: string;
    address: string;
    status: string;
    price: number;
    order_date: string;
    could_be_printed: boolean;
}

export interface Device {
    id: number;
    name: string;
    occupied: boolean;
    photo: string;
}

// export interface Item {
//     id: number;
//     name: string;
//     category: string;
//     price: number;
//     quantity: string;
//     min_stock_level: string;
// }