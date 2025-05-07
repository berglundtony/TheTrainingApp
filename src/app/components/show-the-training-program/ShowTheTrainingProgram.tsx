"use client";
import { useEffect, useState } from "react";
import { fetchWorkouts } from "@/lib/actions";
import { JSX } from "react";
import styles from "./showthetrainingprogram.module.css";
import { Workout } from "@/lib/supabase/types";
import { fetchExerciseById } from "src/app/actions";
import { Exercise } from "@/lib/interfaces";
import WorkoutCard from "../workout-card/WorkoutCard";

export default function ShowTheTrainingProgram(): JSX.Element {
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [exerciseMap, setExerciseMap] = useState<Record<string, Exercise>>({});

    useEffect(() => {
        const loadWorkouts = async () => {
            const result = await fetchWorkouts();
            console.log("Fetched workouts:", result);
            setWorkouts(result);
        };
        loadWorkouts();
    }, []);

    useEffect(() => {
        if (workouts.length === 0) return;

        const loadExercises = async () => {
            const exercisesArray = await Promise.all(workouts.map(w => fetchExerciseById(w.exercise_id)));
            console.log("ExerciseArray:", exercisesArray);
            const exerciseObj = Object.fromEntries(
                workouts
                    .map((w, i) => [w.exercise_id, exercisesArray[i]])
                    .filter(([, exercise]) => exercise !== null) as [string, Exercise][]
            );
            console.log("ExerciseObj:", workouts);
  

            setExerciseMap(exerciseObj);
        };

        loadExercises();
    }, [workouts]);

    return (
        <>
            <div className={styles.container}>
                <div className={styles.workoutWrapper}>
                    <h1 className={styles.title}>WORKOUT TRAINING</h1>
                </div>
            </div>
            {workouts.map((w, i) => (
                exerciseMap[w.exercise_id] && (
                    <WorkoutCard
                        key={w.id}
                        workout={w}
                        exercise={exerciseMap[w.exercise_id]}
                        index={i}
                        onDelete={(id) => setWorkouts(prev => prev.filter(w => w.exercise_id !== id))}
                    />
                )
            ))}
            <div className={styles.emptyState}>
                {workouts.length === 0 && <p>No workouts found.</p>}
            </div>
        </>
    );
}



