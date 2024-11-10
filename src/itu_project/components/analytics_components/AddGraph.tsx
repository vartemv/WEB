import React from 'react';
import styles from '../../styles/AddGraph.module.css';

interface AddGraphProps {
  onClick: () => void;
}

const AddGraph: React.FC<AddGraphProps> = ({ onClick }) => {
  return (
    <button className={styles.AddGraph} onClick={onClick}>
      <div className={styles.verticalBar} />
      <div className={styles.horizontalBar} />
    </button>
  );
};

export default AddGraph;