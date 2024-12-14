import React, { useEffect, useState } from 'react';
import styles from '../../styles/analytics.module.css';

interface Note {
  id: number;
  note: string;
  created_at: string;
  chart_id: number;
}

interface NotesCardProps {
  chartId?: number;
}

const NotesCard: React.FC<NotesCardProps> = ({ chartId }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedNotes, setEditedNotes] = useState<{[key: number]: string}>({});

  const fetchNotes = async (id: number) => {
    try {
      const res = await fetch(`/api/get_notes?chartId=${id}`);
      const data = await res.json();
      if (data.success) {
        setNotes(data.data);
      }
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  useEffect(() => {
    if (chartId) {
      fetchNotes(chartId);
    } else {
      setNotes([]);
    }
  }, [chartId]);

  const handleEditClick = () => {
    setIsEditing(true);
    const initialEditState = notes.reduce((acc, note) => {
      acc[note.id] = note.note;
      return acc;
    }, {} as {[key: number]: string});
    setEditedNotes(initialEditState);
  };

  const handleSaveEdits = async () => {
    try {
      const updatePromises = Object.entries(editedNotes).map(([noteId, noteText]) => {
        // If the note text is empty, delete the note
        if (!noteText.trim()) {
          return fetch('/api/delete_note', {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              noteId: parseInt(noteId)
            }),
          });
        }
        // Otherwise update the note
        return fetch('/api/update_note', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            noteId: parseInt(noteId),
            note: noteText,
          }),
        });
      });
  
      await Promise.all(updatePromises);
      setIsEditing(false);
      if (chartId) {
        fetchNotes(chartId);
      }
    } catch (error) {
      console.error('Error updating notes:', error);
    }
  };

  const handleNoteChange = (noteId: number, value: string) => {
    setEditedNotes(prev => ({
      ...prev,
      [noteId]: value 
    }));
  };

  const handleDeleteAllNotes = async () => {
    try {
      const deletePromises = notes.map((note) => {
        return fetch('/api/delete_note', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            noteId: note.id
          }),
        });
      });
  
      await Promise.all(deletePromises);
      setNotes([]);
    } catch (error) {
      console.error('Error deleting notes:', error);
    }
  };

  return (
    <section className={styles.notesCard}>
      <div className={styles.notesHeader}>
        <h2 className={styles.notesTitle}>Chart Notes</h2>
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
                  onClick={handleDeleteAllNotes}
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