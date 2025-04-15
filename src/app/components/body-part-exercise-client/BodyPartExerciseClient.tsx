"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { ExerciseDropDown } from "@/lib/interfaces";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import styles from "./bodypartexercise.module.css";


export default function BodyPartExerciseClient({
    allExercises,
    filteredExercises,
    selected,
    onChangeExercise,
    setBodyPart,
}: {
    allExercises: ExerciseDropDown[],
    filteredExercises: ExerciseDropDown[],
    selected: string,
    onChangeExercise: (val: string) => void,
    setBodyPart: (bodyPart: string) => void
}) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [selectedBodyPart, setSelectedBodyPart] = useState(selected || 'none');
    const [selectedExercise, setSelectedExercise] = useState("none");
    console.log("Filtered exercises being passed into BodyPartExerciseClient:", filteredExercises);
    setBodyPart(selectedBodyPart);
   
    const bodyParts = useBodyParts(allExercises);
    console.log('Body parts:', bodyParts);

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
        onChangeExercise(value);
        if (value === selected) return;

        const newParams = new URLSearchParams(searchParams.toString());
        if (value === "none") {
            newParams.delete("exercise");
        } else {
            newParams.set("exercise", value);
            setSelectedExercise(value);
        }
        console.log(`Replacing URL with: ${pathname}?${newParams.toString()}`);
        router.push(`${pathname}?${newParams.toString()}`);
    };

    useEffect(() => {
        if (!selected && filteredExercises.length > 0) {
            onChangeExercise(filteredExercises[0].exerciseId);
        }
    }, [selected, filteredExercises, onChangeExercise]);

    return (
        <div className={styles.bodyPartExerciseContainer}>
            <label htmlFor="bodyPart" className={styles.labelBodyPart}>Body part:</label>
            <select
                onChange={handleSelectedBodyPart}
                value={selectedBodyPart}
                className={styles.bodyPartsBySelect}
                id="bodyPart"
            >
                <option key="-1" value="none">- - - Choose body part - - -</option>
                {bodyParts.length > 0 ? (
                    bodyParts.map((b, index) => (
                        <option className={styles.bodyPartOption} key={index} value={b}>
                            {b.charAt(0).toUpperCase() + b.slice(1)}
                        </option>
                    ))
                ) : (
                    <option disabled>Loading body parts...</option>
                )}
            </select>

            {filteredExercises.length > 0 && (
                <>
                    <label htmlFor="ChooseExerciseBySelect" className={styles.labelExercise}>Exercise:</label>
                    <select
                        id="ChooseExerciseBySelect"
                        onChange={handleSelectedExercise}
                        value={selectedExercise}
                        name="chooseExercise"
                        className={styles.exerciseBySelectBodyPart}
                    >
                        <option key="-1" value="none">- - - Choose exercise - - -</option>
                        {filteredExercises.map((b) => (
                            <option className={styles.exerciseOption} key={b.exerciseId} value={b.exerciseId}>
                                {b.name.charAt(0).toUpperCase() + b.name.slice(1)}
                            </option>
                        ))}
                    </select>
                </>  
            )}
        </div>
    )
}

export function useBodyParts(exercises: ExerciseDropDown[]): string[] {
    return useMemo(() => {
        const unique = Array.from(
            new Set(
                exercises.flatMap((ex) =>
                    ex.bodyParts?.map((p) => p.toLowerCase().trim()) ?? []
                )
            )
        );
        return unique.sort((a, b) => a.localeCompare(b));
    }, [exercises]);
}