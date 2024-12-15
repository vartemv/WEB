import React from 'react';
import styles from '../../styles/GraphWindow.module.css';
import PieChartComponent from './visualizations/PieChart';
import BarChartComponent from './visualizations/BarChart';
import { ChartSetting, Order } from 'types';
import { getChartConfig } from './charts/registry';
import { useGraphWindow } from '../../hooks/useGraphWindow';

interface GraphWindowProps {
  orders: Order[];
  onCreate: () => void;
  initialSettings?: ChartSetting;
  onDelete: () => void;
  onClick?: () => void;
  onChartSelect?: (chartId: number) => void;
  onNoteAdded?: () => void;
}

const GraphWindow: React.FC<GraphWindowProps> = ({ 
  orders, 
  onCreate, 
  initialSettings, 
  onDelete, 
  onClick, 
  onNoteAdded, 
  onChartSelect 
}) => {
  const { chartState, actions } = useGraphWindow(
    initialSettings,
    onNoteAdded,
    onChartSelect,
    onClick,
    onDelete,
    onCreate,
    orders
  );

  const { 
    showChart,
    showChartSelection,
    chartType,
    year,         
    month, 
    itemType,
    showNoteModal,
    note,
    chartId,
    error,
    isEditing
  } = chartState;

  const {
    setShowChartSelection,
    setNote,
    handleAddNote,
    handleDelete,
    setChartType,  
    setYear,       
    setMonth,      
    setItemType,
    handleCreateChart,
    setShowNoteModal,
    handleAddGraphClick,
    handleOptionChange,
    setError,
    setIsEditing,
    handleSaveChart,
    setShowChart,
    handleCancel
  } = actions;

  const config = getChartConfig(itemType);
  const allowedVisualizations = config?.allowedVisualizations || ['Pie'];

   // Add this handler
   const handleEditClick = () => {
    setIsEditing(true);
    setShowChartSelection(true);
  };


  return (
    <main 
      className={styles.mainContainer}       
      onClick={(e) => {
        e.preventDefault();
        if (chartId) {
          onClick?.();
          onChartSelect?.(chartId);
        }
      }}
    >
      {error && <div className={styles.error}>{error}</div>}

      {showChart && !isEditing && (
      <>
        <button 
          className={styles.editButton}
          onClick={(e) => {
            e.stopPropagation();
            handleEditClick();
          }}
          title="Edit chart"
          type="button"
        >
          Edit
        </button>
        <button 
          className={styles.deleteButton}
          onClick={handleDelete}
          title="Delete chart"
          type="button"
        >
          ×
        </button>
      </>
    )}
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
            <option value="Customer type">Customer type</option>
          </select>
        </div>
        <div className={styles.buttonGroup}>
          <button 
            onClick={handleSaveChart}
            className={styles.saveButton}
          >
            {isEditing ? 'Save Changes' : 'Create Chart'}
          </button>
          {isEditing && (
            <button 
            onClick={handleCancel}
            className={styles.cancelButton}
          >
            Cancel
          </button>
          )}
    </div>
  </div>
    ) : (
      !showChart && <a onClick={handleAddGraphClick}>Add chart</a>
    )}
     {showChart && !isEditing && chartType === 'Pie' && (
      <PieChartComponent 
        orders={orders} 
        itemType={itemType}
        year={year}
        month={month}
      />
    )}

    {showChart && !isEditing && chartType === 'Bar' && (
      <BarChartComponent 
        orders={orders} 
        itemType={itemType}
        year={year}
        month={month}
      />
    )}
      {showChart && !isEditing && (
      <button 
          className={styles.noteButton}
          onClick={() => setShowNoteModal(true)}
        >
          Add Note
        </button>
      )}

      {showNoteModal && (
        <div className={styles.modal}>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Enter your note"
          />
          <button onClick={handleAddNote}>Save Note</button>
          <button onClick={() => setShowNoteModal(false)}>Cancel</button>
        </div>
      )}
    </main>
  );
};

export default GraphWindow;