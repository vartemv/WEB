import React, { useState } from 'react';
import AddGraph from './AddGraph';
import ChartSelection from './ChartSelection';
import styles from '../../styles/GraphWindow.module.css';



const GraphWindow: React.FC = () => {
  const [showChartSelection, setShowChartSelection] = useState(false);

  const handleAddGraphClick = () => {
    setShowChartSelection(true);
  };

  return (
    <main className={styles.mainContainer}>
      {showChartSelection ? (
        <ChartSelection />
      ) : (
        <AddGraph onClick={handleAddGraphClick} />
      )}
    </main>
  );
};

export default GraphWindow;