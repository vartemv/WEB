import React, { useState, useEffect } from 'react';
import GraphWindow from './GraphWindow';
import { Order } from 'types';
import styles from '../../styles/GraphWindow.module.css';

type GraphWindowProps = {
  orders: Order[];
};

interface ChartSetting {
  id: number;
  charttype: string;
  year: string;
  month: string;
  itemtype: string;
}

const GraphManager: React.FC<GraphWindowProps> = ({ orders }) => {
  // Use a tuple of [id, chartSetting] to maintain unique IDs
  const [graphWindows, setGraphWindows] = useState<[number, ChartSetting | undefined][]>([[0, undefined]]);
  const [nextId, setNextId] = useState(1);

  useEffect(() => {
    const loadChartSettings = async () => {
      try {
        const response = await fetch('/api/get_chart_settings');
        const data = await response.json();
        if (data.success && data.data) {
          const settings = Array.isArray(data.data) ? data.data : [data.data];
          // Always include an undefined window for new chart creation
          const windows = [
            ...settings.map((setting: ChartSetting) => 
              [setting.id, setting] as [number, ChartSetting]
            ),
            [nextId, undefined] // Add empty window for new chart
          ];
          setGraphWindows(windows);
          setNextId(prev => prev + settings.length + 1);
        }
      } catch (error) {
        console.error('Failed to load chart settings:', error);
        // If loading fails, at least show the new chart window
        setGraphWindows([[0, undefined]]);
      }
    };
  
    loadChartSettings();
  }, []);

  const handleCreateNewGraphWindow = () => {
    setGraphWindows(prev => [...prev, [nextId, undefined]]);
    setNextId(prev => prev + 1);
  };

  const handleDeleteWindow = (windowId: number) => {
    setGraphWindows(prev => prev.filter(([id]) => id !== windowId));
  };

  return (
    <div className={styles.graphGrid}>
      {graphWindows.map(([id, settings]) => (
        <GraphWindow 
          key={id}
          orders={orders} 
          onCreate={handleCreateNewGraphWindow}
          initialSettings={settings}
          onDelete={() => handleDeleteWindow(id)}
        />
      ))}
    </div>
  );
};

export default GraphManager;