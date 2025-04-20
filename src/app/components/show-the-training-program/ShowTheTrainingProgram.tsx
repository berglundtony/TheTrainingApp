"use client";
import { useEffect, useState } from "react";
import { fetchWorkouts } from "@/lib/actions";
import { JSX } from "react";
import styles from "./showthetrainingprogram.module.css";
import { supabase } from "@/lib/supabase/supaBaseClient";

export default function ShowTheTrainingProgram(): JSX.Element {
    const [workouts, setWorkouts] = useState<any[]>([]);

    useEffect(() => {
        const loadWorkouts = async () => {
            const result = await fetchWorkouts();
            setWorkouts(result);
        };
        loadWorkouts();
    }, []);

    const deleteTraining = async (exercise_id: number) => {
        const { error } = await supabase
            .from("workouts")
            .delete()
            .eq("exercise_id", exercise_id);

        if (error) {
            console.error("Kunde inte ta bort övningen:", error.message);
        } else {
            setWorkouts((prev) => prev.filter((w) => w.exercise_id !== exercise_id));
        }
    };


    return (
        <>
            <div className={styles.workoutWrapper}>
                <h1 className={styles.title}>WORKOUT TRAINING</h1>
            </div>
            <div className={styles.container}>
                <div className={styles.grid}>
                    <ul className={styles.card}>
                        {workouts.map((w) => (
                            <li className={styles.exercise} key={w.id ?? `${w.exercise_id}-${w.day}-${w.week}`}>
                                <strong>{w.week},{w.day}</strong><br />
                                Exercise: {w.exercise_id}<br />
                                Bodypart: {w.body_part ?? 'Okänd'}<br />
                                Weight: {w.weight} kg<br />
                                Set: {w.set}, Reps: {w.rep}, Rest: {w.rest} sek<br />
                                Superset: {w.superset ? 'Superset1' : 'Superset2'}
                                {/* <button className={styles.button}>Edit</button> */}
                                <button className={styles.button} onClick={() => deleteTraining(w.exercise_id)} >Delete</button>
                                <hr />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}

