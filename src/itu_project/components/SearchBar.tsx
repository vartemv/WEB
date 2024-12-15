import React from 'react';
import styles from '../styles/SearchBar.module.css';
import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <div className={styles.searchContainer}>
      <Search className={styles.searchIcon}/>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Quick search"
        className={styles.searchInput}
        aria-label="Quick search"
      />
    </div>
  );
};

export default SearchBar;