export interface Order {
    id: number;
    item: string;
    name: string;
    address: string;
    status: string;
    price: number;
    order_date: string;
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

export interface Note {
    id: number;
    note: string;
    chartId: number;
}

export interface ChartSetting {
    id: number;
    charttype: string; 
    year: string;
    month: string;
    itemtype: string;
    note?: string;
  }
  
  export interface ChartConfig {
    type: string;
    allowedVisualizations: ('Pie' | 'Bar')[];
    getData: (orders: Order[]) => ChartData[];
  }