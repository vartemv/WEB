// Václav Zapletal xzaple40
import React from 'react';
import GraphWindow from './GraphWindow';
import { Order } from 'types';
import styles from '../../styles/GraphWindow.module.css';
import { useGraphManager } from '../../hooks/useGraphManager';

type GraphWindowProps = {
  orders: Order[];
  onChartSelect: (chartId: number | undefined) => void;
  onNoteAdded: () => void;
};

const GraphManager: React.FC<GraphWindowProps> = ({ 
  orders, 
  onChartSelect, 
  onNoteAdded 
}) => {
  const { state, actions } = useGraphManager();
  const { graphWindows } = state;
  const { handleCreateNewGraphWindow, handleDeleteWindow } = actions;

  return (
    <div className={styles.graphGrid}>
      {graphWindows.map(([id, settings]) => (
        <GraphWindow 
          key={`graph-window-${id}`}
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