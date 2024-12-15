// Václav Zapletal xzaple40
import { useState, useEffect } from 'react';
import { ChartSetting } from '../types';

export function useGraphManager() {
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
            [Math.max(...settings.map(s => s.id), 0) + 1, undefined]
          ];
          setGraphWindows(windows);
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
    setGraphWindows(prev => [...prev, [nextId, undefined]]);
    setNextId(prev => prev + 1);
  };

  const handleDeleteWindow = (windowId: number) => {
    setGraphWindows(prev => prev.filter(([id]) => id !== windowId));
  };

  return {
    state: {
      graphWindows
    },
    actions: {
      handleCreateNewGraphWindow,
      handleDeleteWindow
    }
  };
}