import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import styles from '../../styles/StockManagement.module.css';
import CategoryGrid from "../../components/categoryGrid";

const StockManagement: React.FC = () => {

  const [categories, setCategories] = useState<string[]>([]);

  const fetchCategories = async () => {
      const response = await fetch('/api/get_categories');
      // if (!response.ok) throw new Error("Failed to fetch categories");
      const result = await response.json();
      console.log(result);
      if (result.success) {
        setCategories(result.data);
      }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (<>
    <main className={styles.stockManagement}>
      <div className={styles.contentContainer}>
        <h1 className={styles.pageTitle}>Stock: Your Categories</h1>
        <div className="border-t border-gray-300 my-2"></div>
        <div>
          <h1>All Categories TODO: delete list; change categories icons(bigger, maybe add image)</h1>
          <ul>
            {categories.map((category) => (
              <li key={category}>
                <Link href={`/stock/${category}`}>
                {category}
                </Link>
              </li>
            ))}
          </ul>
          </div>
        <div className="border-t border-gray-300 my-2"></div>
        <CategoryGrid categories={categories}/>
        {/* <section className={styles.filterSection}>
          <div className={styles.filterGroup}>
            <SearchBar />
            <FilterDropdown label="Select Availability"
            options={["In stock", "Low stock", "Out of stock"]}
            onSelect={handleFilterSelect} />
            <FilterDropdown label="Select Category" />
            <FilterDropdown label="Filters" />
          </div>
          <NewStockButton onClick={openModal} />
        </section> */}

        {/* <Modal isOpen={isModalOpen} onClose={closeModal} onSubmit={handleAddItem} /> */}
        {/* <StockTable items={stockItems} /> */}
      </div>
    </main>
    </>
  );
};

export default StockManagement;