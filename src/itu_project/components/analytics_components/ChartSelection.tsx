import React, { useState } from 'react';
import styles from '../../styles/AddingChart.module.css';
import PieChartComponent from './PieChart';

interface OptionButtonProps {
  label: string;
  value: string;
  options: string[];
  onChange: (newValue: string) => void;
}

const OptionButton: React.FC<OptionButtonProps> = ({ label, value, options, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen(!isOpen);

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className={styles.optionContainer} >
      <label className={styles.optionLabel}>{label}</label>
      <button className={styles.optionButton} onClick={handleToggle}>
        <span>{value}</span>
      </button>
      {isOpen && (
        <ul className={styles.optionList} role="listbox">
          {options.map((option) => (
            <li key={option} onClick={() => handleSelect(option)} className={styles.optionItem}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const ChartSelection: React.FC = () => {
  const [chartType, setChartType] = useState('Pie');
  const [year, setYear] = useState('2024');
  const [month, setMonth] = useState('Current');
  const [itemType, setItemType] = useState('Orders state');
  const [showChart, setShowChart] = useState(false);

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      if (chartType === 'Pie' && year === '2024' && month === 'Current' && itemType === 'Orders state') {
        setShowChart(true);
      }
    }
  };

  if (showChart) {
    return <PieChartComponent />;
  }

  return (
    <section className={styles.addingChart} onKeyPress={handleKeyPress} tabIndex={0}>
      <div className={styles.chartContainer}>
        <div className={styles.optionsWrapper}>
          <OptionButton label="Chart" value={chartType} options={['Pie', 'Bar', 'Line']} onChange={setChartType} />
          <OptionButton label="Year" value={year} options={['2023', '2024', '2025']} onChange={setYear} />
          <OptionButton
            label="Month"
            value={month}
            options={['Current', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']}
            onChange={setMonth}
          />
          <OptionButton
            label="Item type"
            value={itemType}
            options={['Orders state', 'Product category', 'Customer type']}
            onChange={setItemType}
          />
        </div>
      </div>
    </section>
  );
};

export default ChartSelection;

