"use client";

import { Workout } from "@/lib/supabase/types";
import { Exercise } from "@/lib/interfaces";
import WorkoutCard from "../workout-card/WorkoutCard";
import { fetchWorkouts } from "@/lib/actions"; // Om du använder ett API för att hämta data
import { useEffect, useState } from "react";
import styles from "./showthetrainingprogram.module.css";
import { fetchExerciseById } from "src/app/actions";

export default function ShowTheTrainingProgram() {
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [exerciseMap, setExerciseMap] = useState<Record<string, Exercise>>({});

    useEffect(() => {
        // Här kan du hämta workouts från ett API eller annan källa
        const fetchData = async () => {
            const workoutsData = await fetchWorkouts(); // Byt ut till rätt funktion om du hämtar workouts
            if (workoutsData !== workouts) {
                setWorkouts(workoutsData);
            }

            // Hämta exercises för varje workout
            const exerciseArray: (Exercise | null)[] = await Promise.all(
                workoutsData.map((w) => fetchExerciseById(w.exercise_id))
            );

            const newExerciseMap: Record<string, Exercise> = Object.fromEntries(
                workoutsData
                    .map((w, i) => [w.exercise_id, exerciseArray[i]])
                    .filter(([, e]) => e !== null) as [string, Exercise][]
            );
            if (newExerciseMap !== exerciseMap) {
                setExerciseMap(newExerciseMap);
            }
        };

        fetchData();
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.workoutWrapper}>
                <h1 className={styles.title}>WORKOUT TRAINING</h1>
            </div>

            {workouts.map((w, i) => (
                exerciseMap[w.exercise_id] ? (
                    <WorkoutCard
                        key={w.id}
                        workout={w}
                        exercise={exerciseMap[w.exercise_id]}
                        index={i}
                        onDelete={(id) => setWorkouts(prev => prev.filter(w => w.id !== id))}
                    />
                ) : null
            ))}

            <div className={styles.emptyState}>
                {workouts.length === 0 && <p>No workouts found.</p>}
            </div>
        </div>
    );
}




