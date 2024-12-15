import { useState, useEffect } from 'react';
import { ChartSetting, Order } from '../types';
import { getChartConfig } from '../components/analytics_components/charts/registry';

export function useGraphWindow(
    initialSettings?: ChartSetting,
    onNoteAdded?: () => void,
    onChartSelect?: (chartId: number) => void,
    onClick?: () => void,
    onDelete?: () => void,
    onCreate?: () => void
  ) {
    const [showChartSelection, setShowChartSelection] = useState(false);
    const [chartType, setChartType] = useState(initialSettings?.charttype || 'Pie');
    const [year, setYear] = useState(initialSettings?.year || '2024');
    const [month, setMonth] = useState(initialSettings?.month || 'Current');
    const [itemType, setItemType] = useState(initialSettings?.itemtype || 'Orders state');
    const [showChart, setShowChart] = useState(!!initialSettings);
    const [chartId, setChartId] = useState<number | undefined>(initialSettings?.id);
    const [showNoteModal, setShowNoteModal] = useState(false);
    const [note, setNote] = useState('');
  
    const handleAddGraphClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setShowChartSelection(true);
    };

    const handleOptionChange = (setter: (value: string) => void) => (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setter(e.target.value);
    };

    const handleDelete = async () => {
        if (!chartId) return;
    
        try {
        const response = await fetch('/api/delete_chart_settings', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: chartId })
        });
        if (response.ok) {
            onDelete?.();
            onChartSelect?.(undefined);
        }
        } catch (error) {
        console.error('Error deleting chart:', error);
        }
    };

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

  const handleAddNote = async () => {
    if (!chartId) return;

    try {
      const response = await fetch('/api/save_note', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chartId, note })
      });

      const data = await response.json();
      if (data.success) {
        if (chartId) {
          onClick?.();
          onChartSelect?.(chartId);
        }
        onNoteAdded?.();
        setShowNoteModal(false);
        setNote('');
      }
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  const handleCreateChart = async () => {
    try {
        const response = await fetch('/api/save_chart_settings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chartType, year, month, itemType })
        });

        const data = await response.json();
        if (data.success) {
            setChartId(data.data.id);
            setShowChart(true);
            setShowChartSelection(false);
            onCreate?.(); 
        }
    } catch (error) {
        console.error('Error creating chart:', error);
    }
};

  return {
    chartState: {
      showChartSelection,
      chartType,
      year,
      month,
      itemType,
      showChart,
      chartId,
      showNoteModal,
      note
    },
    actions: {
      setShowChartSelection,
      setChartType,
      setYear,
      setMonth,
      setItemType,
      setShowNoteModal,
      setNote,
      handleAddNote,
      handleCreateChart,
      handleDelete,
      handleAddGraphClick,
      handleOptionChange
    }
  };
}