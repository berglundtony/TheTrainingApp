"use client";
import styles from './weekdaydropdown.module.css';
import { Set, Rep,SetRepDropDownProps } from "@/lib/interfaces";


export default function SetAndRepDropDown({
    selectedSet,
    selectedRep,
    onChangeSet,
    onChangeRep,
}: SetRepDropDownProps) {

    const set: Set[] =
        [
            { id: 'one', amount: 1 },
            { id: 'two', amount: 2 },
            { id: 'three', amount: 3 },
            { id: 'four', amount: 4 },
            { id: 'five', amount: 5 },
            { id: 'six', amount: 6 },
        ]
    const repetitions: Rep[] =
        [
            { id: 'one', amount: 1 },
            { id: 'two', amount: 2 },
            { id: 'three', amount: 3 },
            { id: 'four', amount: 4 },
            { id: 'five', amount: 5 },
            { id: 'six', amount: 6 },
            { id: 'seven', amount: 7 },
            { id: 'eight', amount: 8 },
            { id: 'nine', amount: 9 },
            { id: 'ten', amount: 10 },
            { id: 'eleven', amount: 11 },
            { id: 'twelve', amount: 12 },
        ];

    return (
        <div className={styles.container}>
            <label htmlFor="week" className={styles.labelSetRep}>Set:</label>
            <select value={selectedSet} onChange={(e) => onChangeSet(e.target.value)} id='week' className={styles.selectSetRep}>
                <option value="none">- - - Select set - - -</option>
                {set.map((s) => (
                    <option key={s.id} value={s.id} className={styles.selectSetRepOption}>
                        {s.amount}
                    </option>
                ))}
            </select>
            <label htmlFor="day" className={styles.labelSetRep}>Repetitions:</label>
            <select value={selectedRep} onChange={(e) => onChangeRep(e.target.value)} id='rep' className={styles.selectSetRep}>
                <option value="none">- - - Select repetions - - -</option>
                {repetitions.map((r) => (
                    <option key={r.id} value={r.id} className={styles.selectSetRepOption}>
                        {r.amount}
                    </option>
                ))}
            </select>
        </div>
    );
}