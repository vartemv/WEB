import React, {useState, useEffect} from 'react';
import { useRouter } from "next/router";
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue,} from "@/components/ui/select"
import styles from '../../../styles/StockManagement.module.css';
import SearchBar from '../../../components/SearchBar';
import NewStockButton from '../../../components/NewStockButton';
import StockTable from '../../../components/StockTable';
import StockTableMod from '../../../components/StockTableMod';
import ProductFormModal from '../../../components/ProductAddForm';
import ProductEditFormModal from '../../../components/ProductEditForm';
import { useFormData } from "../../../contexts/FormDataContext";

interface Item {
    id: number;
    name: string;
    category: string;
    price: number;
    quantity: number;
    min_stock_level: number;
  }

const StockManagement: React.FC = () => {
  const router = useRouter();
  const {category} = router.query;
  const [stockItems, setStockItems] = useState<Item[]>([]);
  const [availabilityFilter, SetAvailabilityFilter] = useState<"none" | "in_stock" | "low_stock" | "out_of_stock">("none");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { formData, setFormData } = useFormData();

  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    id: 0,
    name: '',
    category: '',
    price: 0,
    quantity: 0,
    min_stock_level: 0,
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchStockItems = async () => {
      const response = await fetch(`/api/get_items?category=${category}`);
      if (!response.ok) throw new Error("Failed to fetch orders");
      const data = await response.json();
      setStockItems(data.data);
  };

  useEffect(() => {
    fetchStockItems();
  }, []);

  const resetFilters = () => {
    SetAvailabilityFilter("none");
    setSearchTerm("");
  };

  const filteredItems = stockItems.filter((item) => {
    const matchesAvailability = availabilityFilter === "none" ||
            (availabilityFilter === "in_stock" && item.quantity > item.min_stock_level) ||
            (availabilityFilter === "low_stock" && item.quantity > 0 && item.quantity <= item.min_stock_level) ||
            (availabilityFilter === "out_of_stock" && item.quantity === 0);

    const matchesSearch = searchTerm === "" || item.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesAvailability && matchesSearch;
});
  
  const handleDeleteItem = (itemId: number) => {
    setStockItems((stockItems) => stockItems.filter((item) => item.id !== itemId));
  };

  const handleEditItem = (item: any) => {
    setEditFormData(item);
    setIsEditSheetOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();    
    
    try {
      const createItemResponse = await fetch('/api/add_item', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({...formData}),
      });
      
      const data = await createItemResponse.json();
      if (data.success) {
        console.log('Item created successfully');
        fetchStockItems();
        setErrorMessage(null);
        setFormData({
          name: '',
          category: '',
          price: 0,
          quantity: 0,
          min_stock_level: 0,
        });
        setIsSheetOpen(false);
      }else {
        setErrorMessage('Failed to create item');
        return;
      }

    } catch (error) {
      console.error("Error creating item:", error);
      setErrorMessage('An error occurred while creating the item');
    }
    };

    const handleEditSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
    
      try {
        const updateItemResponse = await fetch('/api/update_item', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...editFormData }),
        });
    
        const data = await updateItemResponse.json();
        if (data.success) {
          console.log('Item updated successfully');
          fetchStockItems();
          setErrorMessage(null);
          setIsEditSheetOpen(false);
        } else {
          setErrorMessage('Failed to update item');
          return;
        }
      } catch (error) {
        console.error('Error updating item:', error);
        setErrorMessage('An error occurred while updating the item');
      }
    };

  return (<>
    <main className={`bg-gray-100 flex flex-col overflow-hidden transition-all duration-300 ${
    isSheetOpen || isEditSheetOpen ? 'mr-80' : 'mr-0' }`}>
      <div className="bg-white flex flex-col w-full justify-start p-3 pb-[386px]">
        <h1 className={styles.pageTitle}>Stock: {category}</h1>
        <div className="border-t border-gray-300 my-2"></div>
        <section className={styles.filterSection}>
          <div className={styles.filterGroup}>
            <SearchBar value={searchTerm} onChange={setSearchTerm} />
            <Select value={availabilityFilter} onValueChange={(value: string) => SetAvailabilityFilter(value as "none" | "in_stock" | "low_stock" | "out_of_stock")}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select availability" />
              </SelectTrigger>
              <SelectContent className="bg-white shadow-lg">
                <SelectItem value="none">Select availability</SelectItem>
                <SelectItem value="in_stock">In stock</SelectItem>
                <SelectItem value="low_stock">Low stock</SelectItem>
                <SelectItem value="out_of_stock">Out of stock</SelectItem>
              </SelectContent>
            </Select>

            {/* Other Filters */}
            
            <button onClick={resetFilters} className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400">
              Reset Filters
            </button>
          </div>
          <NewStockButton onClick={() => setIsSheetOpen(!isSheetOpen)} />
          <ProductFormModal 
          formData={formData}
          setFormData={setFormData}
          isSheetOpen={isSheetOpen}
          setIsSheetOpen={setIsSheetOpen}
          handleSubmit={handleSubmit}
        />
        <ProductEditFormModal
        formData={editFormData}
        setFormData={setEditFormData}
        isSheetOpen={isEditSheetOpen}
        setIsSheetOpen={setIsEditSheetOpen}
        handleSubmit={handleEditSubmit}
      />
        
        </section>
        
        {/* <StockTable items={stockItems} /> */}
        {errorMessage && (
      <div className="text-red-500 text-sm mb-4 text-center w-full">
        {errorMessage}
      </div>
      )}
        <StockTableMod items={filteredItems} onDelete={handleDeleteItem} onEdit={handleEditItem}/>
      </div>
    </main>
    </>
  );
};

export default StockManagement;