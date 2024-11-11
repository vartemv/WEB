import React from 'react';
import styles from '../styles/StockTable.module.css';

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

const StockTable: React.FC<StockTableProps> = ({ items }) => {
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
    <section className={styles.stockTable}>
      <header className={styles.tableHeader}>
        <div className={styles.tableCell}>ID</div>
        <div className={styles.tableCell}>Name</div>
        <div className={styles.tableCell}>Quantity</div>
        <div className={styles.tableCell}>Category</div>
        <div className={styles.tableCell}>Price</div>
        <div className={styles.tableCell}>Availability</div>
        <img src="Meatballs.png" alt="options" className={styles.meatballs} />
      </header>
      {items.map((item) => (
        <div key={item.id} className={styles.tableRow}>
          <div className={styles.tableCell}>{item.id}</div>
          <div className={styles.tableCell}>{item.name}</div>
          {/* <div className={styles.tableCell}>{item.quantity}</div> */}
          <div className={styles.tableCell}>
            <div className={styles.quantityContainer}>
              <button
                className={styles.changeButton}
                onClick={() => handleDecrease(item)}
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                className={styles.changeButton}
                onClick={() => handleIncrease(item)}
              >
                +
              </button>
            </div>
          </div>
          <div className={styles.tableCell}>{item.category}</div>
          <div className={styles.tableCell}>{item.price}</div>
          <div className={`${styles.tableCell} ${getAvailabilityClass(item)}`}>
            {item.quantity == 0 ? "Out of stock" : item.quantity <= item.min_stock_level ? "Low stock" : "In stock"}
          </div>
          <img src="Meatballs.png" alt="options" className={styles.meatballs} />
          {/* <div className={`${styles.tableCell} ${styles.meatballs}`}> */}
            {/* <img src="Meatballs.png" alt="options" className={styles.meatballsIcon} /> */}
            {/* </div> */}
        </div>
      ))}
    </section>
  );
};

export default StockTable;