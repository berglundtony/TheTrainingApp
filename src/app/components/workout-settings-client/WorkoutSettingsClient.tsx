"use client"

import { useState } from "react";
import SupersetPending from "../superset-pending/SupersetPending";
import WeightForm from "../weight-form/WeightForm";
import SetAndRepDropDown from "../set-and-rep-dropdown/SetAndRepDropDown";
import styles from "./WorkoutSettingsClient.module.css"

// import { saveSelection } from "@/lib/actions";

export default function CreateWorkoutClient({
    values,
    onChange
}: {
    values: {
        weight: number,
        set: number,
        rep: number,
        rest: number,
        },
        onChange: (val: typeof values) => void
    }) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        onChange({
            ...values,
            [name]: value
        });
    };
    const [selectedSet, setSelectedSet] = useState<string>("none");
    const [selectedRep, setSelectedRep] = useState<string>("none");
    const [selectedRest, setSelectedRest] = useState<string>("none");

    return (
        <div className={styles.inputBoxesWrapper}>
            <SupersetPending />
            <WeightForm />
            <SetAndRepDropDown
                selectedSet={selectedSet}
                selectedRep={selectedRep}
                selectedRest={selectedRest}
                onChangeSet={(val: string) => {
                    setSelectedSet(val);
                    handleChange({ target: { name: "set", value: val } } as React.ChangeEvent<HTMLInputElement>);
                }}
                onChangeRep={(val: string) => {
                    setSelectedRep(val);
                    handleChange({ target: { name: "rep", value: val } } as React.ChangeEvent<HTMLInputElement>)
                }} 
                onChangeRest={(val: string) => {
                    setSelectedRest(val);
                    handleChange({ target: { name: "rest", value: val } } as React.ChangeEvent<HTMLInputElement>)
                }} />
        </div>
    
    )
}





