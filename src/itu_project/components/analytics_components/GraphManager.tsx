import React, { useState, useEffect } from 'react';
import GraphWindow from './GraphWindow';
import { Order } from 'types';
import styles from '../../styles/GraphWindow.module.css';

type GraphWindowProps = {
  orders: Order[];
  onChartSelect: (chartId: number | undefined) => void;
  onNoteAdded: () => void;
};

interface ChartSetting {
  id: number;
  charttype: string;
  year: string;
  month: string;
  itemtype: string;
}

const GraphManager: React.FC<GraphWindowProps> = ({ orders, onChartSelect, onNoteAdded }) => {
  const [graphWindows, setGraphWindows] = useState<[number, ChartSetting | undefined][]>([]);
  const [nextId, setNextId] = useState(1);

  useEffect(() => {
    const loadChartSettings = async () => {
      try {
        const response = await fetch('/api/get_chart_settings');
        const data = await response.json();
        if (data.success && data.data) {
          const settings = Array.isArray(data.data) ? data.data : [data.data];
          const windows = [
            ...settings.map((setting: ChartSetting) => 
              [setting.id, setting] as [number, ChartSetting]
            ),
            // Add empty window with a unique ID
            [Math.max(...settings.map(s => s.id), 0) + 1, undefined]
          ];
          setGraphWindows(windows);
          // Update nextId to be greater than all existing IDs
          setNextId(Math.max(...windows.map(([id]) => id)) + 1);
        }
      } catch (error) {
        console.error('Failed to load chart settings:', error);
        setGraphWindows([[1, undefined]]);
        setNextId(2);
      }
    };
  
    loadChartSettings();
  }, []);

  const handleCreateNewGraphWindow = () => {
    // Add new window with the next unique ID
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
          key={`graph-window-${id}`} // Ensure unique key
          orders={orders} 
          onCreate={handleCreateNewGraphWindow}
          initialSettings={settings}
          onDelete={() => handleDeleteWindow(id)}
          onClick={() => onChartSelect(settings?.id)}
          onChartSelect={onChartSelect}
          onNoteAdded={onNoteAdded}
        />
      ))}
    </div>
  );
};

export default GraphManager;