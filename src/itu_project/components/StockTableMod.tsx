import React from 'react';
import styles from '../styles/StockTable.module.css';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface StockItem {
  id: number;
  name: string;
  category: string;
  price: number;
  quantity: number;
  min_stock_level: number;
}

interface StockTableProps {
  items: StockItem[];
}

const StockTableMod: React.FC<StockTableProps> = ({ items }) => {
  const getAvailabilityClass = (item: StockItem) => {
    if (item.quantity == 0) {
      return styles.outOfStock;
    } else if (item.quantity <= item.min_stock_level) {
      return styles.lowStock;
    } else {
      return styles.inStock;
    }
  };

  const handleIncrease = (item: StockItem) => {
    // const newQuantity = item.quantity + 1;
    // onQuantityChange(item.id, newQuantity);
  };

  const handleDecrease = (item: StockItem) => {
    // const newQuantity = Math.max(0, item.quantity - 1);
    // onQuantityChange(item.id, newQuantity);
  };

  return (
    <Table>
      <TableCaption>A list of your items.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Categoty</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Availability</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">{item.id}</TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.quantity}</TableCell>
            <TableCell>{item.category}</TableCell>
            <TableCell>{item.price}</TableCell>
            <TableCell className={`${getAvailabilityClass(item)}`}>
                {item.quantity == 0 ? "Out of stock" : item.quantity <= item.min_stock_level ? "Low stock" : "In stock"}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default StockTableMod;