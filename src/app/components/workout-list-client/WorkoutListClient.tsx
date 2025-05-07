"use client";

import { useState } from "react";
import { Workout } from "@/lib/supabase/types";
import { Exercise } from "@/lib/interfaces";
import WorkoutCard from "../workout-card/WorkoutCard";
import styles from "./workout_list_Client.module.css";

type Props = {
    workouts: Workout[];
    exerciseMap: Record<string, Exercise>;
};

export default function WorkoutListClient({ workouts, exerciseMap }: Props) {
    const [deletedWorkoutIds, setDeletedWorkoutIds] = useState<string[]>([]);

    const visibleWorkouts = workouts.filter(w => !deletedWorkoutIds.includes(w.exercise_id));

    return (
        <>
            <div className={styles.container}>
                <div className={styles.workoutWrapper}>
                    <h1 className={styles.title}>WORKOUT TRAINING</h1>
                </div>
            </div>

            {visibleWorkouts.map((w, i) =>
                exerciseMap[w.exercise_id] ? (
                    <WorkoutCard
                        key={w.id}
                        workout={w}
                        exercise={exerciseMap[w.exercise_id]}
                        index={i}
                        onDelete={(id) => setDeletedWorkoutIds(prev => [...prev, id])}
                    />
                ) : null
            )}

            {visibleWorkouts.length === 0 && (
                <div className={styles.emptyState}>
                    <p>No workouts found.</p>
                </div>
            )}
        </>
    );
}