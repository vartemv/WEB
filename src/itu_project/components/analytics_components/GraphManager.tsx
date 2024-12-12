import React, { useState, useEffect } from 'react';
import GraphWindow from './GraphWindow';
import { Order } from 'types';

type GraphManagerProps = {
  orders: Order[];
};

interface ChartSetting {
  id: number;
  charttype: string;
  year: string;
  month: string;
  itemtype: string;
}

const GraphManager: React.FC<GraphManagerProps> = ({ orders }) => {
    const [graphWindows, setGraphWindows] = useState<number[]>([0]);
    const [chartSettings, setChartSettings] = useState<ChartSetting[]>([]);
  
    useEffect(() => {
      const loadChartSettings = async () => {
        try {
          const response = await fetch('/api/get_chart_settings');
          const data = await response.json();
          if (data.success && data.data) {
            const settings = Array.isArray(data.data) ? data.data : [data.data];
            setChartSettings(settings);
            // Create windows for existing charts plus one extra for new chart creation
            if (settings.length > 0) {
              setGraphWindows([...Array(settings.length + 1)].map((_, index) => index));
            }
          }
        } catch (error) {
          console.error('Failed to load chart settings:', error);
        }
      };
  
      loadChartSettings();
    }, []);
  
    const handleCreateNewGraphWindow = () => {
      setGraphWindows(prev => [...prev, prev.length]);
    };
  
    return (
      <div>
        {graphWindows.map((id) => (
          <GraphWindow 
            key={id} 
            orders={orders} 
            onCreate={handleCreateNewGraphWindow}
            initialSettings={chartSettings[id]}
          />
        ))}
      </div>
    );
  };

export default GraphManager;