"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { BodyPart, ExerciseDropDown } from "@/lib/interfaces";
import { ChangeEvent, useState } from "react";
import styles from "./bodypartexercise.module.css";

export default function BodyPartExerciseClient({ bodyParts, exercises, selected }:
    {
        bodyParts: BodyPart[]; exercises: ExerciseDropDown[]; selected: string;
        
    }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [selectedBodyPart, setSelectedBodyPart] = useState(selected);
    const [selectedExercise, setSelectedExercise] = useState("none");

    const handleSelectedBodyPart = (e: ChangeEvent<HTMLSelectElement>) => {
        const value = e.currentTarget.value;
        if (value === selected) return; 

        const newParams = new URLSearchParams(searchParams.toString());
        if (value === "none") {
            newParams.delete("filterBy");
        } else {
            newParams.set("filterBy", value.toLowerCase());
            setSelectedBodyPart(value);
        }
        newParams.delete("exercise");
        router.replace(`${pathname}?${newParams.toString()}`);
    };
    
    const handleSelectedExercise = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        if (value === selected) return;

        const newParams = new URLSearchParams(searchParams.toString());
        if (value === "none") {
            newParams.delete("exercise");
        } else {
            newParams.set("exercise", value.toLowerCase());
            setSelectedExercise(value);
        }
        console.log(`Replacing URL with: ${pathname}?${newParams.toString()}`);
        router.push(`${pathname}?${newParams.toString()}`);
    };



    return (
        <div className={styles.bodyPartExerciseContainer}>
            <select
                onChange={handleSelectedBodyPart}
                value={selectedBodyPart}
                className={styles.bodyPartsBySelect}>
                <option key="-1" value="none">- - - Choose bodypart - - -</option>,
                {bodyParts.map((b) => <option
                    className={styles.bodyPartOption} key={b.id} value={b.name}>
                    {b.name.charAt(0).toUpperCase() + b.name.slice(1)}</option>)}
            </select>
            {exercises.length > 0 && (
                <select id="ChooseExerciseBySelect"
                    onChange={handleSelectedExercise}
                    value={selectedExercise}
                    name="chooseExercise"
                    className={styles.exerciseBySelectBodyPart}>
                    <option key="-1" value="none">- - - Choose exercise - - -</option>
                    {exercises.map((b) =>
                        <option className={styles.exerciseOption} key={b.id} value={b.name}>
                            {b.name.charAt(0).toUpperCase() + b.name.slice(1)}</option>)}
                </select>
             )} 
        </div>
    );
}
