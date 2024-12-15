import React, { useState } from 'react';
import styles from '../styles/StockTable.module.css';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { EllipsisVertical } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger} from "@/components/ui/dropdown-menu"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"


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
  onDelete: (itemId: number) => void;
  onEdit: (item: StockItem) => void;
}

const StockTableMod: React.FC<StockTableProps> = ({ items, onDelete, onEdit }) => {

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

  const handleDelete = async (item_id: number) => {
    try {
      const response = await fetch('/api/delete_item', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ item_id }),
      });
      
      const data = await response.json();
      if (data.success) {
        onDelete(item_id);
      } else {
        console.error('Failed to delete item:', data.message || 'Unknown error');
        return;
      }

    } catch (error) {
      console.error("Error creating item:", error);
    }
};

  return (<>
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
          <TableHead></TableHead>
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
            <TableCell className="text-right w-[50px]">
            <div className="flex justify-end">
            <Dialog>
            <DropdownMenu>
              <DropdownMenuTrigger>
                    <EllipsisVertical className="cursor-pointer"/>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="transform translate-x-[-20px]">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onEdit(item)}>Edit</DropdownMenuItem>
                <DialogTrigger asChild>
                  <DropdownMenuItem>Delete</DropdownMenuItem>
                </DialogTrigger>
              </DropdownMenuContent>
            </DropdownMenu>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription> This action cannot be undone. Are you sure you want to permanently 
                  delete this item from your stock?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit" variant="destructive" onClick={()=> handleDelete(item.id)} >Delete</Button>
                </DialogFooter>
            </DialogContent>
            </Dialog>
            </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </>
  );
};

export default StockTableMod;