"use client";
import styles from "./SetAndRepDropDown.module.css";
import { Set, Rep,Rest, SetRepRestDropDownProps } from "@/lib/interfaces";


export default function SetAndRepDropDown({
    selectedSet,
    selectedRep,
    selectedRest,
    onChangeSet,
    onChangeRep,
    onChangeRest
}: SetRepRestDropDownProps) {

    const set: Set[] =
        [
            { id: '1', amount: 1 },
            { id: '2', amount: 2 },
            { id: '3', amount: 3 },
            { id: '4', amount: 4 },
            { id: '5', amount: 5 },
            { id: '6', amount: 6 },
        ]
    const repetitions: Rep[] =
        [
            { id: '1', amount: 1 },
            { id: '2', amount: 2 },
            { id: '3', amount: 3 },
            { id: '4', amount: 4 },
            { id: '5', amount: 5 },
            { id: '6', amount: 6 },
            { id: '7', amount: 7 },
            { id: '8', amount: 8 },
            { id: '9', amount: 9 },
            { id: '10', amount: 10 },
            { id: '11', amount: 11 },
            { id: '12', amount: 12 },
        ];
    const rest: Rest[] =
        [
            { id: '0', amount: 0 },
            { id: '1', amount: 60 },
            { id: '2', amount: 90 },
            { id: '3', amount: 120 },
        ]

    return (
        <div className={styles.container}>
            <label htmlFor="set" className={styles.labelSetRep}>
            <span className={styles.labelText}>Set:</span>
                <select value={selectedSet || "none"} onChange={(e) => { const value = e.target.value; onChangeSet(value === "none" ? 0 : Number(value)); }} id='set' name='set' className={styles.selectSetRep}>
                <option value="none">-Select set-</option>
                {set.map((s) => (
                    <option key={s.id} value={s.amount} className={styles.selectSetRepOption}>
                        {s.amount}
                    </option>
                ))}
                </select>
            </label>
            <label htmlFor="rep" className={styles.labelSetRep}>
            <span className={styles.labelText}>Rep:</span>
                <select value={selectedRep || "none"} onChange={(e) => { const value = e.target.value; onChangeRep(value === "none" ? 0 : Number(value)); }} id='rep' name='rep' className={styles.selectSetRep}>
                <option value="none">-repetions-</option>
                {repetitions.map((r) => (
                    <option key={r.id} value={r.amount} 
                         className={styles.selectSetRepOption}>
                        {r.amount}
                    </option>
                ))}
                </select>
            </label>

            <label htmlFor="rest" className={styles.labelSetRep}>
                <span className={styles.labelText}>Rest:</span>
                <select value={selectedRest || "none"} onChange={(e) => { const value = e.target.value; onChangeRest(value === "none" ? 0 : Number(value)); }} id='rest' name='rest' className={styles.selectSetRep}>
                    <option value="none">-resttime-</option>
                    {rest.map((r) => (
                        <option key={r.id} value={r.amount} className={styles.selectSetRepOption}>
                            {r.amount}
                        </option>
                    ))}
                </select>
            </label>
        </div>
    );
}