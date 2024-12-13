import React, {useState, useEffect} from 'react';
import styles from '../styles/StockManagement.module.css';
import Modal from '@/components/AddItem';
import SearchBar from '../components/SearchBar';
import FilterDropdown from '../components/FilterDropdown';
import NewStockButton from '../components/NewStockButton';
import StockTable from '../components/StockTable';

interface Item {
    id: number;
    name: string;
    category: string;
    price: number;
    quantity: number;
    min_stock_level: number;
  }

const StockManagement: React.FC = () => {

  const [stockItems, setStockItems] = useState<Item[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState<string>("");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleAddItem = async (newItem: Item) => {
      const response = await fetch('/api/add_item', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      });

    fetchStockItems();
    closeModal();
  };

  const fetchStockItems = async () => {
      const response = await fetch('/api/get_items');
      if (!response.ok) throw new Error("Failed to fetch orders");
      const data = await response.json();
      setStockItems(data.data);
  };

  const fetchFilteredItems = async (selectedFilter: string) => {
    try {
      const response = await fetch(`/api/availability_filter?availability=${selectedFilter}`);
      const data = await response.json();
      setStockItems(data.data);
    //   if (data.success) {
    //     setStockItems(data.data);
    //   }
    } catch (error) {
      console.error('Error fetching filtered items:', error);
    }
  };

  useEffect(() => {
    fetchStockItems();
  }, []);

  const handleFilterSelect = (selectedValue: string) => {
    setFilter(selectedValue);
    if (selectedValue) {
      fetchFilteredItems(selectedValue);
    } else {
        fetchStockItems();
    }
  };

  return (<>
    <main className={styles.stockManagement}>
      <div className={styles.contentContainer}>
        <h1 className={styles.pageTitle}>Stock</h1>
        <section className={styles.filterSection}>
          <div className={styles.filterGroup}>
            <SearchBar />
            <FilterDropdown label="Select Availability"
            options={["In stock", "Low stock", "Out of stock"]}
            onSelect={handleFilterSelect} />
            <FilterDropdown label="Select Category" />
            <FilterDropdown label="Filters" />
          </div>
          <NewStockButton onClick={openModal} />
        </section>

        <Modal isOpen={isModalOpen} onClose={closeModal} onSubmit={handleAddItem} />
        <StockTable items={stockItems} />
      </div>
    </main>
    </>
  );
};

export default StockManagement;