"use client";

import { useEffect, useState } from "react";
import CreateWorkoutClient from "../create-workout-client/CreateWorkoutClient";
import BodyPartExerciseClient from "../body-part-exercise-client/BodyPartExerciseClient";
import WorkoutSettingsClient from "../workout-settings-client/WorkoutSettingsClient";
import { saveWorkout } from "@/lib/actions";
import { ExerciseDropDown } from "@/lib/interfaces";
import styles from "./WorkoutFormWrapper.module.css"
import Image from "next/image";
import { createClient } from "@/src/app/utils/supabase/client";

export default function WorkoutFormWrapper({
    access_token,
    allExercises,
    filteredExercises,
    selected,
}: {
    access_token: string |undefined;
    allExercises: ExerciseDropDown[];
    filteredExercises: ExerciseDropDown[];
    selected: string;
}) {
    const [selectedWeek, setSelectedWeek] = useState("none");
    const [selectedDay, setSelectedDay] = useState("none");
    const [exerciseId, setExerciseId] = useState("");
    const [bodypart, setBodyPart] = useState("");
    const [accessToken, setAccessToken] = useState("");
    const [UserId, setUserId] = useState("");
    const [formValues, setFormValues] = useState({
        superset: false,
        weight: 0,
        set: 0,
        rep: 0,
        rest: 0,
        setvalue: 0,
    });
    const [isSaved, setIsSaved] = useState(false);
    const supabase = createClient();

    if (!access_token) {
        console.error("Ingen access token");
    }

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session?.user) {
                setUserId(session.user.id)
            }
            if (session?.access_token) {
                setAccessToken(session.access_token);
            }
        });
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Remove useEffect from here

        // You may need to get the session here if not using useEffect
        // Example:
        // const { data: { session } } = await supabase.auth.getSession();

        // Make sure 'session' is available here, or pass it as a prop/state

        const workout = {
            user_id: UserId, 
            day: selectedDay,
            week: selectedWeek,
            exercise_id: exerciseId,
            body_part: bodypart,
            superset: formValues.superset,
            weight: Number(formValues.weight),
            set: Number(formValues.set),
            rep: Number(formValues.rep),
            rest: Number(formValues.rest),
            iscompleted: false,
            setvalue: Number(formValues.setvalue),
        };
        console.log("Formulär sparas...", formValues);
        try {
            const data = await saveWorkout(workout, accessToken);
            console.log("Passet sparades!", data);
            setIsSaved(true);
            setTimeout(() => resetForm(), 1500);
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
            setvalue: 0,
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