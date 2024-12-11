import React, { useState } from 'react';
import styles from '../../styles/GraphWindow.module.css';
import PieChartComponent from './PieChart';

const GraphWindow: React.FC = () => {
  const [showChartSelection, setShowChartSelection] = useState(false);
  const [chartType, setChartType] = useState('Pie');
  const [year, setYear] = useState('2024');
  const [month, setMonth] = useState('Current');
  const [itemType, setItemType] = useState('Orders state');
  const [showPieChart, setShowPieChart] = useState(false);

  const handleAddGraphClick = () => {
    setShowChartSelection(true);
  };

  const handleOptionChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (event: React.ChangeEvent<HTMLSelectElement>) => {
    setter(event.target.value);
  };

  const handleCreatePieChart = () => {
    setShowPieChart(true);
    setShowChartSelection(false);
  };

  return (
    <main className={styles.mainContainer}>
      {showChartSelection ? (
        <div>
          <div>
            <label>Chart Type:</label>
            <select value={chartType} onChange={handleOptionChange(setChartType)}>
              <option value="Pie">Pie</option>
              <option value="Bar">Bar</option>
              <option value="Line">Line</option>
            </select>
          </div>
          <div>
            <label>Year:</label>
            <select value={year} onChange={handleOptionChange(setYear)}>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
            </select>
          </div>
          <div>
            <label>Month:</label>
            <select value={month} onChange={handleOptionChange(setMonth)}>
              <option value="Current">Current</option>
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </select>
          </div>
          <div>
            <label>Item Type:</label>
            <select value={itemType} onChange={handleOptionChange(setItemType)}>
              <option value="Orders state">Orders state</option>
              <option value="Product category">Product category</option>
              <option value="Customer type">Customer type</option>
            </select>
          </div>
          <button onClick={handleCreatePieChart}>Create Pie Chart</button>
        </div>
      ) : (
        !showPieChart && <a onClick={handleAddGraphClick}>Add chart</a>
      )}
      {showPieChart && <PieChartComponent />}
    </main>
  );
};

export default GraphWindow;