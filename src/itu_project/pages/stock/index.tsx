import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import styles from '../../styles/StockManagement.module.css';
import CategoryGrid from "../../components/CategoryGrid";
import { Dashboard } from "@/components/desktop_components/dashboard";

const StockManagement: React.FC = () => {

  const [categories, setCategories] = useState<string[]>([]);

  const fetchCategories = async () => {
      const response = await fetch('/api/get_categories');
      // if (!response.ok) throw new Error("Failed to fetch categories");
      const result = await response.json();
      if (result.success) {
        setCategories(result.data);
      }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (<>
  <Dashboard />
    <main className={styles.stockManagement}>
      <div className={styles.contentContainer}>
        <h1 className={styles.pageTitle}>Stock: Your Categories</h1>
        <div className="border-t border-gray-300 my-2"></div>
        <CategoryGrid categories={categories}/>
      </div>
    </main>
    </>
  );
};

export default StockManagement;