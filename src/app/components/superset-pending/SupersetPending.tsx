"use client";

import styles from './SupersetPending.module.css';
import { useState } from 'react';

export default function SupersetPending() {
    const [selected, setSelected] = useState({
        superset1: false,
        superset2: false,
    });

    const toggle = (key: 'superset1' | 'superset2') => {
        setSelected((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    return (
        <div className={styles.container}>
            <label className={styles.label}>
                <span className={styles.text}>{selected.superset1 ? 'Superset 2' : 'Superset 1'}</span>
                <button onClick={() => toggle('superset1')} className={`${styles.switch} ${selected.superset1 ? styles.switchOn : styles.switchOff}`}>
                    <div className={`${styles.thumb} ${selected.superset1 ? styles.thumbOn : styles.thumbOff}`} />
                </button>
            </label>
        </div>
    );
}