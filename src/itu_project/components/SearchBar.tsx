import React from 'react';
import styles from '../styles/SearchBar.module.css';

const SearchBar: React.FC = () => {
  return (
    <div className={styles.searchContainer}>
      <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/457c3220bc9f1d9e86c6a007a20b03688d35d0f3ef7f770a3fa01fdba2cbe89a?placeholderIfAbsent=true&apiKey=9822d2f548184319a14eb0b77089634c" alt="" className={styles.searchIcon} />
      <input
        type="text"
        placeholder="Quick search"
        className={styles.searchInput}
        aria-label="Quick search"
      />
    </div>
  );
};

export default SearchBar;