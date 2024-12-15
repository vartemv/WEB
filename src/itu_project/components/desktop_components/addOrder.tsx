import { FunctionComponent } from "react";
import styles from "../../styles/Desktop.module.css";

interface AddOrderButtonProps {
    onClick: () => void;
}

export const AddOrderButton: FunctionComponent<AddOrderButtonProps> = ({ onClick }) => (
    <div className={styles.add} onClick={onClick}>
        <div className={styles.PlusWrapper} />
        <img className={styles.plusIcon} alt="" src="Plus.png" />
    </div>
);