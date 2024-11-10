import React from 'react';
import styles from '../../styles/analytics.module.css';

const NotesCard: React.FC = () => {
  return (
    <section className={styles.notesCard}>
      <div className={styles.notesHeader}>
        <h2 className={styles.notesTitle}>Notes - July 2024</h2>
        <button className={styles.listAllButton}>
          <span className={styles.buttonContent}>List all</span>
        </button>
      </div>
      <p className={styles.noteContent}>
        {/* Sales increase due to the start of summer holidays */}
      </p>
    </section>
  );
};

export default NotesCard;

