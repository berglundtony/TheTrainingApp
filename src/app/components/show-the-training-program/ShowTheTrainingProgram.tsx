import { fetchWorkouts } from "@/lib/actions";
// import { Exercise, } from "@/lib/interfaces";
// import { Workout } from "@/lib/supabase/types"
import { JSX } from "react";
import styles from "./showthetrainingprogram.module.css";

export default async function ShowTheTrainingProgram(): Promise<JSX.Element> {
    const workouts = await fetchWorkouts();

    return (
        <>
            <div className={styles.workoutWrapper}>
                <h1 className={styles.title}>WORKOUT TRAINING</h1>
            </div>
            <div className={styles.container}>
                <h2 className={styles.title}>Dina träningspass</h2>
                <div className={styles.grid}>
                    <ul>
                        {workouts.map((w) => (
                            <li key={w.id ?? `${w.exercise_id}-${w.day}-${w.week}`}>
                                <strong>Week {w.week}, Day {w.day}</strong><br />
                                Exercise: {w.exercise_id}<br />
                                Bodypart: {w.body_part ?? 'Okänd'}<br />
                                Weight: {w.weight} kg<br />
                                Set: {w.set}, Reps: {w.rep}, Rest: {w.rest} sek<br />
                                Superset: {w.superset ? 'Superset1' : 'Superset2'}
                                <hr />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}

