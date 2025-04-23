"use client";

import { useState } from "react";
import CreateWorkoutClient from "../create-workout-client/CreateWorkoutClient";
import BodyPartExerciseClient from "../body-part-exercise-client/BodyPartExerciseClient";
import WorkoutSettingsClient from "../workout-settings-client/WorkoutSettingsClient";
import { saveWorkout } from "@/lib/supabase/workoutApi";
import { ExerciseDropDown } from "@/lib/interfaces";
import styles from "./WorkoutFormWrapper.module.css"
import Image from "next/image";

export default function WorkoutFormWrapper({
    allExercises,
    filteredExercises,
    selected,
}: {
    allExercises: ExerciseDropDown[];
    filteredExercises: ExerciseDropDown[];
    selected: string;
}) {
    const [selectedWeek, setSelectedWeek] = useState("none");
    const [selectedDay, setSelectedDay] = useState("none");
    const [exerciseId, setExerciseId] = useState("");
    const [bodypart, setBodyPart] = useState("");
    const [formValues, setFormValues] = useState({
        superset: false,
        weight: 0,
        set: 0,
        rep: 0,
        rest: 0,
    });
    const [isSaved, setIsSaved] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const workout = {
            day: selectedDay,
            week: selectedWeek,
            exercise_id: exerciseId,
            body_part: bodypart,
            superset: formValues.superset,
            weight: Number(formValues.weight),
            set: Number(formValues.set),
            rep: Number(formValues.rep),
            rest: Number(formValues.rest),
        };
        console.log("Formulär sparas...", formValues);
        try {
            const data = await saveWorkout(workout);
            console.log("Passet sparades!", data);
            setIsSaved(true);

            // Återställ formuläret efter en liten stund
            setTimeout(() => {
                resetForm();
            }, 1500);
        } catch (err) {
            console.error("Fel vid sparning", err);
        }
    };

    const resetForm = () => {
        setSelectedWeek("none");
        setSelectedDay("none");
        setExerciseId("");
        setBodyPart("");
        setFormValues({
            superset: false,
            weight: 0,
            set: 0,
            rep: 0,
            rest: 0,
        });
        setIsSaved(false);
    };
    const handleFormChange = (newValues: typeof formValues) => {
        setFormValues(newValues);
    };

    return (
        <>
            <div className={styles.titleWrapper}>
                <h1 className={styles.title}>CREATE YOUR WORKOUT</h1>
            </div>
            <form className={styles.form} onSubmit={handleSubmit}>
                <CreateWorkoutClient
                    selectedWeek={selectedWeek}
                    selectedDay={selectedDay}
                    setSelectedWeek={setSelectedWeek}
                    setSelectedDay={setSelectedDay}
                />
                <BodyPartExerciseClient
                    allExercises={allExercises}
                    filteredExercises={filteredExercises}
                    selected={selected}
                    onChangeExercise={setExerciseId}
                    setBodyPart={setBodyPart}
                />
                <WorkoutSettingsClient
                    values={formValues}
                    onChange={handleFormChange}
                />
                {isSaved && (
                    <p className={styles.isSaved}>
                        ☑ Passet har sparats!
                    </p>
                )}
                <div className={styles.buttonWrapper}>
                    <Image
                        className={styles.bodybuilder_image}
                        src={'/bodybuilder.gif'}
                        alt={'bodybuilder image'}
                        width={100}
                        height={100}
                    />
                    <button type='submit' className={styles.submitButton}>
                        Save Exercise
                    </button>
                </div>
            </form>
        </>
    );
}