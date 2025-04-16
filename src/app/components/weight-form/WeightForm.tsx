import styles from "./WeightForm.module.css"

type Props = {
    weight: number;
    onChange: (value: number) => void;
};

export default function WeightForm({ weight, onChange }: Props) {
    return (
        <div className={styles.container}>
            <label htmlFor="weight" className={styles.label}>Weight:
                <input
                    id="weight"
                    type="number"
                    value={weight}
                    onChange={(e) => onChange(Number(e.target.value))}
                    min={0}
                    step={1}
                    className={styles.weightInput}
                /></label>
            <span className={styles.kilo}>kg</span>
        </div>
    );
}