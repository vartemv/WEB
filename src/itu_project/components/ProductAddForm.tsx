// components/ProductFormModal.tsx
import React from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";

interface ProductFormModalProps {
  formData: {
    name: string;
    category: string;
    price: number;
    quantity: number;
    min_stock_level: number;
  };
  setFormData: React.Dispatch<React.SetStateAction<{
    name: string;
    category: string;
    price: number;
    quantity: number;
    min_stock_level: number;
  }>>;
  isSheetOpen: boolean;
  setIsSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit: (e: React.FormEvent) => void;
}

const ProductFormModal: React.FC<ProductFormModalProps> = ({
  formData,
  setFormData,
  isSheetOpen,
  setIsSheetOpen,
  handleSubmit,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  return (
    <Sheet open={isSheetOpen} onOpenChange={(open) => {
        if (open !== false) setIsSheetOpen(open);
      }} modal={false}>
      <SheetContent className="w-80 translate-x-0 transition-transform duration-300">
        <SheetHeader>
          <SheetTitle>Add new product</SheetTitle>
          <SheetDescription>Add all important information about your new product.</SheetDescription>
        </SheetHeader>
        <div className="flex justify-center items-center mt-4">
          <form onSubmit={handleSubmit} className="w-full max-w-md">
            <div className="mb-4">
              <Label htmlFor="name">Name</Label>
              <Input 
                id="name" 
                type="text" 
                value={formData.name} 
                onChange={handleInputChange} 
                placeholder="Add name"
                className="w-full"
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="category">Category</Label>
              <Input 
                id="category" 
                type="text" 
                value={formData.category} 
                onChange={handleInputChange} 
                placeholder="Add category" 
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="price">Price</Label>
              <Input 
                id="price" 
                type="number" 
                value={formData.price}
                onChange={handleInputChange}
                placeholder="Add price" 
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="quantity">Quantity</Label>
              <Input 
                id="quantity" 
                type="number" 
                value={formData.quantity}
                onChange={handleInputChange}
                placeholder="Enter quantity" 
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="min_stock_level">Minimum stock count</Label>
              <Input 
                id="min_stock_level"
                type="number" 
                value={formData.min_stock_level}
                onChange={handleInputChange}
                placeholder="Enter minimum count" 
              />
            </div>
            <div className="flex justify-between mt-4">
              <Button 
                variant="destructive" 
                onClick={(e) => {
                  e.preventDefault();
                  setFormData({
                    name: '',
                    category: '',
                    price: 0,
                    quantity: 0,
                    min_stock_level: 0,
                  });
                  setIsSheetOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="bg-blue-500 text-right" 
                disabled={!formData.name || !formData.category || !formData.min_stock_level}
              >
                Add Item
              </Button>
            </div>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ProductFormModal;

