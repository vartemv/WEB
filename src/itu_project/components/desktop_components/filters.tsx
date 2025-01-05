//Vereninov Artem, xveren00
import { FunctionComponent } from "react"; // Importing React to create a functional component
import styles from "../../styles/Desktop.module.css"; // Importing styles from Desktop.module.css

// Defining the FiltersProps interface to specify the expected props for the Filters component
interface FiltersProps {
    activeFilter: string; // The currently active filter (either "all", "Active", "Printing", or "Shipped")
    onFilterClick: (filter: string) => void; // A function that is triggered when a filter is clicked, passing the filter type
}

// Filters component renders a list of filter options that users can click to apply a filter
export const Filters: FunctionComponent<FiltersProps> = ({ activeFilter, onFilterClick }) => (
    <div className={styles.filters}>  {/* Main container for the filters */}
        
        {/* Filter for 'All' */}
        <div
            className={`${styles.allWrapper} ${activeFilter === "all" ? styles.ChoosedFilter : ''}`} // Applies the 'ChoosedFilter' class if this is the active filter
            onClick={() => onFilterClick("all")} // Triggers onFilterClick with "all" when clicked
        >
            All
        </div>

        {/* Filter for 'Active' */}
        <div
            className={`${styles.activeWrapper} ${activeFilter === "Active" ? styles.ChoosedFilter : ''}`} // Highlights 'Active' filter if it is the active one
            onClick={() => onFilterClick("Active")} // Triggers onFilterClick with "Active" when clicked
        >
            Active
        </div>

        {/* Filter for 'Printing' */}
        <div
            className={`${styles.activeWrapper} ${activeFilter === "Printing" ? styles.ChoosedFilter : ''}`} // Highlights 'Printing' filter if it is the active one
            onClick={() => onFilterClick("Printing")} // Triggers onFilterClick with "Printing" when clicked
        >
            Printing
        </div>

        {/* Filter for 'Shipped' */}
        <div
            className={`${styles.notActiveWrapper} ${activeFilter === "Shipped" ? styles.ChoosedFilter : ''}`} // Highlights 'Shipped' filter if it is the active one
            onClick={() => onFilterClick("Shipped")} // Triggers onFilterClick with "Shipped" when clicked
        >
            Shipped
        </div>
    </div>
);
