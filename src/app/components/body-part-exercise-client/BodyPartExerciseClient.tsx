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
    allExercises: ExerciseDropDown[];
    filteredExercises: ExerciseDropDown[];
    selected: string;
    onChangeExercise: (val: string) => void;
    setBodyPart: (bodyPart: string) => void;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const bodyParts = useBodyParts(allExercises);

    const [selectedBodyPart, setSelectedBodyPart] = useState<string>("none");
    const [selectedExercise, setSelectedExercise] = useState<string>("none");

    // Synka bodypart till parent när det ändras
    useEffect(() => {
        if (selectedBodyPart !== "none") {
            setBodyPart(selectedBodyPart);
        }
    }, [selectedBodyPart, setBodyPart]);

    // Initialisera val vid första render
    useEffect(() => {
        if (filteredExercises.length > 0 && selected === "") {
            const firstExercise = filteredExercises[0].exerciseId;
            setSelectedExercise(firstExercise);
            onChangeExercise(firstExercise);

            // Uppdatera URL
            const newParams = new URLSearchParams(searchParams.toString());
            newParams.set("exercise", firstExercise);
            router.replace(`${pathname}?${newParams.toString()}`);
        }
    }, [filteredExercises, selected, onChangeExercise, pathname, router, searchParams]);

    const handleSelectedBodyPart = (e: ChangeEvent<HTMLSelectElement>) => {
        const value = e.currentTarget.value;
        setSelectedBodyPart(value);

        const newParams = new URLSearchParams(searchParams.toString());
        if (value === "none") {
            newParams.delete("filterBy");
        } else {
            newParams.set("filterBy", value.toLowerCase());
        }
        newParams.delete("exercise"); // rensa val när man ändrar bodypart
        router.replace(`${pathname}?${newParams.toString()}`);
    };

    const handleSelectedExercise = (e: ChangeEvent<HTMLSelectElement>) => {
        const value = e.currentTarget.value;
        setSelectedExercise(value);
        onChangeExercise(value);

        const newParams = new URLSearchParams(searchParams.toString());
        if (value === "none") {
            newParams.delete("exercise");
        } else {
            newParams.set("exercise", value);
        }
        router.replace(`${pathname}?${newParams.toString()}`);
    };

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
                {bodyParts.map((b, index) => (
                    <option key={index} value={b} className={styles.bodyPartOption}>
                        {b.charAt(0).toUpperCase() + b.slice(1)}
                    </option>
                ))}
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
                            <option key={b.exerciseId} value={b.exerciseId} className={styles.exerciseOption }>
                                {b.name.charAt(0).toUpperCase() + b.name.slice(1)}
                            </option>
                        ))}
                    </select>
                </>
            )}
        </div>
    );
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