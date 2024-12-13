import React from 'react';
import styles from '../styles/NewStockButton.module.css';

interface NewStockButtonProps {
  onClick: () => void;  // Callback function passed from the parent to trigger opening the modal
}

const NewStockButton: React.FC<NewStockButtonProps> = ({ onClick }) => {
  return (
    <button className={styles.newStockButton} onClick={onClick}>
      <img src="New_stock.png" alt="" className={styles.buttonIcon} />
      New Stock
    </button>
  );
};

export default NewStockButton;