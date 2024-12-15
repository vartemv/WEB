import { useState, useEffect } from 'react';
import type { Note } from '../types';

export function useNotes(chartId?: number) {
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

  const handleEditClick = () => {
    setIsEditing(true);
    const initialEditState = notes.reduce((acc, note) => {
      acc[note.id] = note.note;
      return acc;
    }, {} as {[key: number]: string});
    setEditedNotes(initialEditState);
  };

  const updateNotes = async (editedNotes: {[key: number]: string}) => {
    try {
      const updatePromises = Object.entries(editedNotes).map(([noteId, noteText]) => {
        if (!noteText.trim()) {
          return fetch('/api/delete_note', {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ noteId: parseInt(noteId) }),
          });
        }
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
      if (chartId) {
        await fetchNotes(chartId);
      }
      return true;
    } catch (error) {
      console.error('Error updating notes:', error);
      return false;
    }
  };

  const handleSaveEdits = async () => {
    const success = await updateNotes(editedNotes);
    if (success) {
      setIsEditing(false);
    }
  };

  const deleteAllNotes = async () => {
    try {
      const deletePromises = notes.map((note) => {
        return fetch('/api/delete_note', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ noteId: note.id }),
        });
      });
      
      await Promise.all(deletePromises);
      setNotes([]);
      return true;
    } catch (error) {
      console.error('Error deleting notes:', error);
      return false;
    }
  };

  const handleDeleteAll = async () => {
    const success = await deleteAllNotes();
    if (success) {
      setIsEditing(false);
    }
  };

  const handleNoteChange = (noteId: number, value: string) => {
    setEditedNotes(prev => ({
      ...prev,
      [noteId]: value 
    }));
  };

  useEffect(() => {
    if (chartId) {
      fetchNotes(chartId);
    } else {
      setNotes([]);
    }
  }, [chartId]);

  return {
    notes,
    isEditing,
    editedNotes,
    handleEditClick,
    handleSaveEdits,
    handleDeleteAll,
    handleNoteChange,
    setIsEditing,
    setEditedNotes
  };
}