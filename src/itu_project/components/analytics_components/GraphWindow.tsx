import React, { useState, useEffect } from 'react';
import styles from '../../styles/GraphWindow.module.css';
import PieChartComponent from './visualizations/PieChart';
import BarChartComponent from './visualizations/BarChart';
import { Order } from 'types';
import { getChartConfig } from './charts/registry';

type GraphWindowProps = {
  orders: Order[];
  onCreate: () => void;
  initialSettings?: ChartSetting;
  onDelete: () => void;  // Add this
};

interface ChartSetting {
  id: number;
  charttype: string;
  year: string;
  month: string;
  itemtype: string;
}

const GraphWindow: React.FC<GraphWindowProps> = ({ orders, onCreate, initialSettings, onDelete }) => {
  const [showChartSelection, setShowChartSelection] = useState(false);
  const [chartType, setChartType] = useState(initialSettings?.charttype || 'Pie');
  const [year, setYear] = useState(initialSettings?.year || '2024');
  const [month, setMonth] = useState(initialSettings?.month || 'Current');
  const [itemType, setItemType] = useState(initialSettings?.itemtype || 'Orders state');
  const [showChart, setShowChart] = useState(!!initialSettings);
  const [chartId, setChartId] = useState<number | undefined>(initialSettings?.id);

  useEffect(() => {
    if (initialSettings) {
      setChartType(initialSettings.charttype);
      setYear(initialSettings.year);
      setMonth(initialSettings.month);
      setItemType(initialSettings.itemtype);
      setShowChart(true);
      setShowChartSelection(false);
    }
  }, [initialSettings]);

  const handleAddGraphClick = () => {
    setShowChartSelection(true);
  };

  const handleOptionChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setter(event.target.value);
  };

  const handleCreateChart = async () => {
    setShowChart(true);
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
      // Store the new chart ID
      setChartId(data.data.id);
      onCreate();
    }
  };

  const handleDelete = async () => {
    if (!chartId) {
      console.error('No chart ID found');
      return;
    }
  
    try {
      const response = await fetch('/api/delete_chart_settings', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: chartId }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      if (data.success) {
        onDelete(); // Call the parent's delete handler
      } else {
        console.error('Failed to delete chart:', data.data);
      }
    } catch (error) {
      console.error('Error deleting chart:', error);
    }
  };

  // Get allowed visualizations for the selected item type
  const config = getChartConfig(itemType);
  const allowedVisualizations = config?.allowedVisualizations || ['Pie'];

  return (
    <main className={styles.mainContainer}>
       <button 
        className={styles.deleteButton}
        onClick={handleDelete}  // Simplify the onClick handler
        title="Delete chart"
        type="button"
      >
        ×
      </button>
      {showChartSelection ? (
        <div>
          <div>
            <label>Chart Type:</label>
            <select value={chartType} onChange={handleOptionChange(setChartType)}>
              {allowedVisualizations.includes('Pie') && (
                <option value="Pie">Pie</option>
              )}
              {allowedVisualizations.includes('Bar') && (
                <option value="Bar">Bar</option>
              )}
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
            <select 
              value={itemType} 
              onChange={(e) => {
                const newType = e.target.value;
                setItemType(newType);
                const newConfig = getChartConfig(newType);
                if (newConfig && !newConfig.allowedVisualizations.includes(chartType)) {
                  setChartType(newConfig.allowedVisualizations[0]);
                }
              }}
            >
              <option value="Orders state">Orders state</option>
              <option value="Product category">Product category</option>
              <option value="Customer type">Customer type</option>
            </select>
          </div>
          <button onClick={handleCreateChart}>Create Chart</button>
        </div>
      ) : (
        !showChart && <a onClick={handleAddGraphClick}>Add chart</a>
      )}
      {showChart && chartType === 'Pie' && (
        <PieChartComponent orders={orders} itemType={itemType} />
      )}
      {showChart && chartType === 'Bar' && (
        <BarChartComponent orders={orders} itemType={itemType} />
      )}
    </main>
  );
};

export default GraphWindow;