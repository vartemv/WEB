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

  return (
    <section className={styles.notesCard}>
      <div className={styles.notesHeader}>
        <h2 className={styles.notesTitle}>Chart Notes</h2>
        <button className={styles.listAllButton}>
          <span className={styles.buttonContent}>List all</span>
        </button>
      </div>
      {notes.map((note) => (
        <p key={note.id} className={styles.noteContent}>
          {note.note}
        </p>
      ))}
    </section>
  );
};

export default NotesCard;