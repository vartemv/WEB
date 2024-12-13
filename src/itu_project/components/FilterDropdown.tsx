import React from 'react';
import styles from '../styles/FilterDropdown.module.css';

interface FilterDropdownProps {
  label: string;
  iconSrc?: string;
  options?: string[];
  onSelect?: (value: string) => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({ label, iconSrc, options = [], onSelect = () => {} }) => {
  return (
    <div className={styles.dropdownContainer}>
      {/* <span className={styles.dropdownText}></span> */}
      <select 
        className={styles.dropdownSelect} 
        onChange={(e) => onSelect(e.target.value)}>
        <option value="">{label}</option>   Default placeholder option
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      {/* <img src={iconSrc} alt="" className={styles.dropdownIcon} /> */}
    </div>
  );
};

export default FilterDropdown;