"use client";

import { Workout } from "@/lib/supabase/types";
import { Exercise } from "@/lib/interfaces";
import WorkoutCard from "../workout-card/WorkoutCard";
// import { fetchWorkouts } from "@/lib/actions"; // Om du använder ett API för att hämta data
import { useEffect, useState } from "react";
import styles from "./showthetrainingprogram.module.css";
import { fetchExerciseById } from "src/app/actions";

export default function ShowTheTrainingProgram() {
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [exerciseMap, setExerciseMap] = useState<Record<string, Exercise>>({});

    useEffect(() => {
        // Här kan du hämta workouts från ett API eller annan källa
        const fetchWorkouts = async () => {
            console.log("Anropar fetchWorkouts()");
            try {
                console.log("fetchData körs");
                const res = await fetch('/api/workouts');
                if (!res.ok) throw new Error(`HTTP error ${res.status}`);
                const data: Workout[] = await res.json();
                setWorkouts(data);
                console.log("Hämtade workouts:", data);
                const exerciseResults = await Promise.all(
                    data.map(w => fetchExerciseById(w.exercise_id))
                );

                const newExerciseMap: Record<string, Exercise> = {};
                data.forEach((w, i) => {
                    const exercise = exerciseResults[i];
                    if (exercise) {
                        newExerciseMap[w.exercise_id] = exercise;
                    }
                });

                setExerciseMap(newExerciseMap);
    
            } catch (error) {
                console.error("Failed to fetch workouts:", error);
            }
        };
        // const workoutsData = res.json;
        fetchWorkouts();           
    }, []);

    // 2) När workouts är laddade → hämta övningar
    useEffect(() => {
        if (workouts.length === 0) return;

        const fetchExercises = async () => {
            // Här “await”ar vi Promise.all så vi får en riktig array
            const exerciseArray = await Promise.all(
                workouts.map((w) => fetchExerciseById(w.exercise_id))
            );

            const newMap: Record<string, Exercise> = {};
            workouts.forEach((w, i) => {
                const ex = exerciseArray[i];
                if (ex) newMap[w.exercise_id] = ex;
            });

            setExerciseMap(newMap);
        };

        fetchExercises();
    }, [workouts]);
    

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
};




