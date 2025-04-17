import styles from "./showthetrainingprogram.module.css";

export default function ShowTheTrainingProgram() {
    return (
        <div className={styles.backgroundSlideshow}>
            <div className={`${styles.slide} ${styles.slide1}`}></div>
            <div className={`${styles.slide} ${styles.slide2}`}></div>
            <div className={`${styles.slide} ${styles.slide3}`}></div>
            <div className={`${styles.slide} ${styles.slide4}`}></div>

            {/* <div className={styles.overlayContent}>
                <h2>Your training plan</h2>
                <p>Put anything here: text, charts, forms...</p>
            </div> */}
        </div>
    )
}
    
