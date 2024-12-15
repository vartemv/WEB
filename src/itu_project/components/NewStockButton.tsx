import React from 'react';
import styles from '../styles/NewStockButton.module.css';
import { PackagePlus } from 'lucide-react';

interface NewStockButtonProps {
  onClick: () => void;
}

const NewStockButton: React.FC<NewStockButtonProps> = ({ onClick }) => {
  return (
    <button className={styles.newStockButton} onClick={onClick}>
      <PackagePlus className={styles.buttonIcon} />
      New Stock
    </button>
  );
};

export default NewStockButton;