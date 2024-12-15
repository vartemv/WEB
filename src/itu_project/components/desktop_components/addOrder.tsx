//Author Vereninov Artem, xveren00
// Importing necessary components from React and CSS styling
import { FunctionComponent } from "react"; // Import FunctionComponent for type safety in functional components
import styles from "../../styles/Desktop.module.css"; // Import styles from Desktop.module.css for styling

// Interface definition for the props the component will receive
interface AddOrderButtonProps {
    onClick: () => void; // onClick function that will be triggered when the button is clicked
}

// AddOrderButton component definition
export const AddOrderButton: FunctionComponent<AddOrderButtonProps> = ({ onClick }) => (
    // Wrapper div with an 'add' class to represent the button area
    <div className={styles.add} onClick={onClick}>
        {/* Inner wrapper for the plus icon, styling purposes */}
        <div className={styles.PlusWrapper} />
        
        {/* Plus icon image to visually indicate the "add" action */}
        <img className={styles.plusIcon} alt="" src="Plus.png" />
    </div>
);