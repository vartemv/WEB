//Author Vereninov Artem, xveren00
// Importing necessary components and hooks
import { FunctionComponent } from "react"; // Importing FunctionComponent to define a functional component
import styles from "../../styles/Desktop.module.css"; // Importing styles from the Desktop.module.css file for styling
import { useRouter } from "next/router"; // Importing useRouter hook from Next.js to programmatically navigate between pages

// Dashboard component definition
export const Dashboard: FunctionComponent = () => {
    const router = useRouter(); // Using Next.js useRouter hook to manage routing programmatically

    return (
        // Wrapper div with a class of 'dashboard' from the imported styles
        <div className={styles.dashboard}>
            {/* User profile picture */}
            <img className={styles.UserPicture} alt="" src="Ellipse_photo.svg" />
            
            {/* Spacer element to create space between user picture and icon group */}
            <div className="spacer" />

            {/* Group of icons for different sections of the app */}
            <div className={styles.iconsGroup}>
                {/* Home icon that navigates to the home page when clicked */}
                <img className={styles.homeIcon} alt="*" src="Home.png" onClick={() => { router.push("/") }} />
                
                {/* Cart icon that navigates to the stock page when clicked */}
                <img className={styles.homeIcon} alt="*" src="Cart.png" onClick={() => { router.push("/stock") }} />
                
                {/* Graph icon that navigates to the analytics page when clicked */}
                <img className={styles.homeIcon} alt="*" src="Graph.png" onClick={() => { router.push("/analytics") }} />
                
                {/* Parcel icon (no action associated yet) */}
                <img className={styles.homeIcon} alt="*" src="Parcel.png" />
                
                {/* Gears icon (no action associated yet) */}
                <img className={styles.homeIcon} alt="*" src="Gears.png" />
            </div>
        </div>
    );
};

