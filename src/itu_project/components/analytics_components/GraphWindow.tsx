import React, { useState, useEffect } from 'react';
import styles from '../../styles/GraphWindow.module.css';
import PieChartComponent from './PieChart';
import { Order } from 'types';

type GraphWindowProps = {
  orders: Order[];
  onCreate: () => void;
  initialSettings?: ChartSetting; // Add this prop
};

interface ChartSetting {
  id: number;
  charttype: string;
  year: string;
  month: string;
  itemtype: string;
}


const GraphWindow: React.FC<GraphWindowProps> = ({ orders, onCreate, initialSettings }) => {
  const [showChartSelection, setShowChartSelection] = useState(false);
  const [chartType, setChartType] = useState(initialSettings?.charttype || 'Pie');
  const [year, setYear] = useState(initialSettings?.year || '2024');
  const [month, setMonth] = useState(initialSettings?.month || 'Current');
  const [itemType, setItemType] = useState(initialSettings?.itemtype || 'Orders state');
  const [showPieChart, setShowPieChart] = useState(!!initialSettings);

  useEffect(() => {
    if (initialSettings) {
      setChartType(initialSettings.charttype);
      setYear(initialSettings.year);
      setMonth(initialSettings.month);
      setItemType(initialSettings.itemtype);
      setShowPieChart(true);
      setShowChartSelection(false);
    }
  }, [initialSettings]);

  const handleAddGraphClick = () => {
    setShowChartSelection(true);
  };

  const handleOptionChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (event: React.ChangeEvent<HTMLSelectElement>) => {
    setter(event.target.value);
  };

  const handleCreatePieChart = async () => {
    setShowPieChart(true);
    setShowChartSelection(false);

    const response = await fetch('/api/save_chart_settings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ chartType, year, month, itemType }),
    });

    const data = await response.json();
    if (!data.success) {
      console.error('Failed to save chart settings');
    } else {
      onCreate();
    }
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
      {showPieChart && <PieChartComponent orders={orders} />}
    </main>
  );
};

export default GraphWindow;