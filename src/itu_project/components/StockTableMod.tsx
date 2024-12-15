import React, { useEffect, useState } from 'react';
import styles from '../styles/StockTable.module.css';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { EllipsisVertical, CirclePlus, CircleMinus } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger} from "@/components/ui/dropdown-menu"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useFormData } from "../contexts/FormDataContext";


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
  const { selectedItems, setSelectedItems, toggleItemSelection, isSheetOpen } = useFormData();
  const [stockItems, setStockItems] = useState<StockItem[]>(items);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  const getAvailabilityClass = (item: StockItem) => {
    if (item.quantity == 0) {
      return styles.outOfStock;
    } else if (item.quantity <= item.min_stock_level) {
      return styles.lowStock;
    } else {
      return styles.inStock;
    }
  };

  const handleOperation = async (item_id: number, operation: boolean) => {
    setStockItems((stockItems) =>
      stockItems.map((item) => {
        if (item.id === item_id) {
          const newQuantity = operation ? item.quantity + 1 : item.quantity - 1;
          return { ...item, quantity: newQuantity >= 0 ? newQuantity : 0 };
        }
        return item;
      })
    );
      

    const response = await fetch('/api/update_quantity', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ item_id, change: operation }),
    });

    const data = await response.json();
    
    if (data.success) {
      // console.log('Item updated successfully');
      // data.updatedQuantity
    } else {
      setStockItems((stockItems) =>
        stockItems.map((item) =>
          item.id === item_id
            ? { ...item, quantity: operation ? item.quantity - 1 : item.quantity + 1 }
            : item
      ));
    }
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

const handleSelectAllChange = () => {
  const stockItemIds = new Set(stockItems.map(item => item.id));
  const selectedItemIds = new Set([...selectedItems].map(item => item.id));

  const allStockItemsSelected = stockItems.every(item => selectedItemIds.has(item.id));

  if (allStockItemsSelected) {
    const filteredItems = [...selectedItems].filter(item => !stockItemIds.has(item.id));
    setSelectedItems(new Set(filteredItems));
  } else {
    const updatedItems = new Set([
      ...selectedItems,
      ...stockItems.map(item => {
        const existingItem = [...selectedItems].find(selected => selected.id === item.id);
        return {
          id: item.id,
          label: item.name,
          quantity: existingItem ? existingItem.quantity : 0
        };
      })
    ]);
    setSelectedItems(updatedItems);
  }
};

  useEffect(() => {
    setStockItems(items);
  }, [items]);

  return (<>
    <Table>
      <TableCaption>A list of your items.</TableCaption>
      <TableHeader>
        <TableRow>
          {isSheetOpen && (
            <TableHead>
              <input
                type="checkbox"
                checked={stockItems.every(item => 
                  [...selectedItems].some(selected => selected.id === item.id)
                )}
                onChange={handleSelectAllChange}
              />
            </TableHead>
          )}
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
        {stockItems.map((item) => (
          <TableRow key={item.id}
            onMouseEnter={() => setHoveredRow(item.id)}
            onMouseLeave={() => setHoveredRow(null)}
            className="relative hover:bg-gray-100 transition">
            {isSheetOpen && (
              <TableCell>
                <input
                  type="checkbox"
                  checked={Array.from(selectedItems).some(item_s => item_s.id === item.id && item_s.label === item.name)}
                  onChange={() => toggleItemSelection(item.id, item.name)} // Toggle item selection
                />
              </TableCell>
            )}

            <TableCell className="font-medium">{item.id}</TableCell>
            <TableCell>{item.name}</TableCell>
            {/* <TableCell>{item.quantity}</TableCell> */}
            <TableCell className="relative flex items-center">
              {hoveredRow === item.id ? (
                <span className="flex items-center gap-1">
                  <CircleMinus
                    className="cursor-pointer text-red-500 hover:text-red-700"
                    onClick={() => handleOperation(item.id, false)}
                  />
                  <span> {item.quantity} </span>
                  <CirclePlus
                    className="cursor-pointer text-green-500 hover:text-green-700"
                    onClick={() => handleOperation(item.id, true)}
                  />
                </span>
              ) : (
                <span className="ml-7">{item.quantity}</span>
              )}
            </TableCell>
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