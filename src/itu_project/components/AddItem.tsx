import React, { useState, useEffect  } from 'react';
import styles from '../styles/Modal.module.css';


interface Item {
    id: number;
    name: string;
    category: string;
    price: number;
    quantity: number;
    min_stock_level: number;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newItem: Item) => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [newItem, setNewItem] = useState<Item>({
    id: 0,
    name: '',
    category: '',
    price: 0,
    quantity: 0,
    min_stock_level: 0,
  });

  useEffect(() => {
    if (!isOpen) {
      setNewItem({
        id: 0,
        name: '',
        category: '',
        price: 0,
        quantity: 0,
        min_stock_level: 0,
      });
    }
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewItem({
      ...newItem,
      [name]: value,
    });
  };

  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(newItem);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.headertitle}>New Product</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
            <label className={styles.label_line}>
              ID:
              <input
              className={styles.input}
              type="number"
              name="id"
              value={newItem.id}
              onChange={handleChange}
              required
            />
          </label>
          <label className={styles.label_line}>
            Name:
            <input
              className={styles.input}
              type="text"
              name="name"
              value={newItem.name}
              onChange={handleChange}
              required
            />
          </label>
          <label className={styles.label_line}>
            Category:
            <input
              className={styles.input}
              type="text"
              name="category"
              value={newItem.category}
              onChange={handleChange}
              required
            />
          </label>
          <label className={styles.label_line}>
            Price:
            <input
              className={styles.input}
              type="number"
              name="price"
              value={newItem.price}
              onChange={handleChange}
              required
            />
          </label>
          <label className={styles.label_line}>
            Quantity:
            <input
              className={styles.input}
              type="number"
              name="quantity"
              value={newItem.quantity}
              onChange={handleChange}
              required
            />
          </label>
          <label className={styles.label_line}>
            Minimum Stock Level:
            <input
              className={styles.input}
              type="number"
              name="min_stock_level"
              value={newItem.min_stock_level}
              onChange={handleChange}
              required
            />
          </label>
          <button className={styles.button} type="submit">Add Item</button>
          <button className={styles.button} type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
