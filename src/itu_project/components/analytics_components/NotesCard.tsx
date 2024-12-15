import React, { useEffect, useState } from 'react';
import styles from '../../styles/analytics.module.css';
import { useNotes } from "../../hooks/useNotes";


interface NotesCardProps {
  chartId?: number;
  onChartUpdate?: () => void;
}

const NotesCard: React.FC<NotesCardProps> = ({ chartId }) => {
  const {
    notes,
    isEditing,
    editedNotes,
    chartDetails,
    handleEditClick,
    handleSaveEdits,
    handleDeleteAll,
    handleNoteChange,
    setIsEditing,
    setEditedNotes,
    refreshChartDetails
  } = useNotes(chartId);

  return (
    <section className={styles.notesCard}>
      <div className={styles.notesHeader}>
      <h2 className={styles.notesTitle}>
          {chartDetails ? `${chartDetails.itemtype} - ${chartDetails.month} ${chartDetails.year}` : 'Select a chart'}
        </h2>
        <div className={styles.buttonGroup}>
          {!isEditing ? (
            <>
              <button 
                onClick={handleEditClick}
                className={styles.editButton}
              >
                Edit Notes
              </button>
              {notes.length > 0 && (
                <button 
                  onClick={handleDeleteAll}
                  className={styles.deleteButton}
                >
                  Delete All
                </button>
              )}
            </>
          ) : (
            <>
              <button 
                onClick={handleSaveEdits}
                className={styles.saveButton}
              >
                Save All
              </button>
              <button 
                onClick={() => {
                  setIsEditing(false);
                  setEditedNotes({});
                }}
                className={styles.cancelButton}
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
      <div className={styles.noteContent}>
        {notes.map((note, index) => (
          <div key={note.id} className={styles.noteItem}>
            {isEditing ? (
              <input
                type="text"
                value={editedNotes[note.id] !== undefined ? editedNotes[note.id] : note.note}
                onChange={(e) => handleNoteChange(note.id, e.target.value)}
                className={styles.editNoteInput}
              />
            ) : (
              <span>{note.note}{index < notes.length - 1 ? ', ' : ''}</span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default NotesCard;