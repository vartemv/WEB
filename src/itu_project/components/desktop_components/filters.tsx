import { FunctionComponent } from "react";
import styles from "../../styles/Desktop.module.css";

interface FiltersProps {
    activeFilter: string;
    onFilterClick: (filter: string) => void;
}

export const Filters: FunctionComponent<FiltersProps> = ({ activeFilter, onFilterClick }) => (
    <div className={styles.filters}>
         <div
            className={`${styles.allWrapper} ${activeFilter === "all" ? styles.ChoosedFilter : ''}`}
            onClick={() => onFilterClick("all")}
        >
            All
        </div>
        <div
            className={`${styles.activeWrapper} ${activeFilter === "Active" ? styles.ChoosedFilter : ''}`}
            onClick={() => onFilterClick("Active")}
        >
            Active
        </div>
        <div
            className={`${styles.activeWrapper} ${activeFilter === "Printing" ? styles.ChoosedFilter : ''}`}
            onClick={() => onFilterClick("Printing")}
        >
            Printing
        </div>
        <div
            className={`${styles.notActiveWrapper} ${activeFilter === "Shipped" ? styles.ChoosedFilter : ''}`}
            onClick={() => onFilterClick("Shipped")}
        >
            Shipped
        </div>
    </div>
);
