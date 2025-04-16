"use client";

import { useState } from 'react';
import styles from './SupersetPending.module.css';
export default function SupersetPending({
    superset,
    onChange,
}: {
    superset: boolean; // Superset är en boolean
    onChange: (value: boolean) => void; // onChange ska hantera en boolean
}) {
    const [selected, setSelected] = useState<boolean>(superset);

    const toggle = () => {
        const newSupersetValue = !selected;
        setSelected(newSupersetValue);
        onChange(newSupersetValue); 
    };

    return (
        <div className={styles.container}>
            <label className={styles.label}>
                <span className={styles.text}>
                    {superset ? "Superset 2" : "Superset 1"} {/* Ändrar text baserat på boolean */}
                </span>
                <input
                    type="checkbox"
                    checked={superset}
                    onChange={toggle}
                    className={styles.hiddenCheckbox}
                    id="supersetToggle"
                />
                <div className={`${styles.switch} ${superset ? styles.switchOn : styles.switchOff}`}>
                    <div className={`${styles.thumb} ${superset ? styles.thumbOn : styles.thumbOff}`} />
                </div>
            </label>
        </div>
    );
}