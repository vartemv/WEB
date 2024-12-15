import React, {useState, useEffect} from 'react';
import { useRouter } from "next/router";
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue,} from "@/components/ui/select"
import styles from '../../../styles/StockManagement.module.css';
import SearchBar from '../../../components/SearchBar';
import NewStockButton from '../../../components/NewStockButton';
import StockTable from '../../../components/StockTable';
import StockTableMod from '../../../components/StockTableMod';
import ProductFormModal from '../../../components/ProductAddForm';

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
  const [filter, setFilter] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const defaultAvailability: "none" | "in_stock" | "low_stock" | "out_of_stock" = "none";
  const [availabilityFilter, SetAvailabilityFilter] = useState<"none" | "in_stock" | "low_stock" | "out_of_stock">(defaultAvailability);

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: 0,
    quantity: 0,
    min_stock_level: 0,
  });

  // const handleAddItem = async (newItem: Item) => {
  //     const response = await fetch('/api/add_item', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(newItem),
  //     });

  //   fetchStockItems();
  //   closeModal();
  // };

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
    SetAvailabilityFilter(defaultAvailability);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();    
    
    try {
      const createPostResponse = await fetch('/api/add_item', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({...formData}),
      });
      
      const data = await createPostResponse.json();
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
        setErrorMessage(data.message || 'Failed to create item');
        return;
      }

    } catch (error) {
      console.error("Error creating item:", error);
      setErrorMessage('An error occurred while creating the item');
    }
    };

  return (<>
  
    <main className={`bg-gray-100 flex flex-col overflow-hidden transition-all duration-300 ${
    isSheetOpen ? 'mr-80' : 'mr-0' }`}>
      <div className="bg-white flex flex-col w-full justify-start p-3 pb-[386px]">
        <h1 className={styles.pageTitle}>Stock: {category}</h1>
        <div className="border-t border-gray-300 my-2"></div>
        <section className={styles.filterSection}>
          <div className={styles.filterGroup}>
            <SearchBar />
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
        </section>

        {/* <Modal isOpen={isModalOpen} onClose={closeModal} onSubmit={handleAddItem} /> */}
        {/* <StockTable items={stockItems} /> */}
        {errorMessage && (
      <div className="text-red-500 text-sm mb-4 text-center w-full">
        {errorMessage}
      </div>
      )}
        <StockTableMod items={stockItems} />
      </div>
    </main>
    </>
  );
};

export default StockManagement;