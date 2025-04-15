import styles from './WeightForm.module.css'
export default function WeightForm() {
    return (
        <div className={styles.container}>
            <label className={styles.label}>Weight:
                <input className={styles.weightInput} name='weight' />
            </label><span className={styles.kilo}>kg</span>
        </div>
    )
}