"use client";
import { useEffect, useState } from "react";
import { fetchWorkouts } from "@/lib/actions";
import { JSX } from "react";
import styles from "./showthetrainingprogram.module.css";
import { supabase } from "@/lib/supabase/supaBaseClient";
import Image from "next/image";
import { Workout } from "@/lib/supabase/types";
import { fetchExerciseById } from "src/app/actions";
import { Exercise } from "@/lib/interfaces";
import { UseImageUrl } from "../use-image/useImage";

export default function ShowTheTrainingProgram(): JSX.Element {
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [exerciseMap, setExerciseMap] = useState<Record<string, Exercise>>({});

    function getImageUrl(exercise: Exercise | undefined): string {
        return UseImageUrl(exercise);
    }

    useEffect(() => {
        const loadWorkouts = async () => {
            const result = await fetchWorkouts();
            setWorkouts(result);
        };
        loadWorkouts();
    }, []);

    useEffect(() => {
        if (workouts.length === 0) return;

        const loadExercises = async () => {
            const exercisesArray = await Promise.all(workouts.map(w => fetchExerciseById(w.exercise_id)));
            const exerciseObj = Object.fromEntries(
                workouts
                    .map((w, i) => [w.exercise_id, exercisesArray[i]])
                    .filter(([, exercise]) => exercise !== null) as [string, Exercise][]
            );

            // const exerciseObj: Record<string, Exercise> = {};
            // exercisesArray.forEach((exercise, index) => {
            //     if (exercise) {
            //         exerciseObj[workouts[index].exercise_id] = exercise;
            //     }
            // });

            setExerciseMap(exerciseObj);
        };

        loadExercises();
    }, []);

    const deleteTraining = async (exercise_id: string) => {
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
    console.log("ExerciseMap:", exerciseMap);
    console.log("Workouts:", workouts);

    return (
        <>
            <div className={styles.workoutWrapper}>
                <h1 className={styles.title}>WORKOUT TRAINING</h1>
            </div>
            {workouts.map((w) => {
                const ex = exerciseMap[w.exercise_id];
                return (

                    <div className={styles.container} key={w.id ?? `${w.exercise_id}-${w.day}-${w.week}`}>
                        <div className={styles.grid}>
                            <ul className={styles.card}>
                                <li className={styles.exercise}>
                                    <strong>{w.week},{w.day}</strong><br />
                                    <div className={styles.nameAndTargetWrapper}>
                                        <p>{ex ? capitalize(ex.name) : "No Exercise"}</p>
                                        <div className={styles.targetMuscleWrapper}>
                                            <h4 className={styles.headerTargetMuscle}>Target muscles:</h4>
                                            <ul className={styles.targetMuscles}>
                                                {ex?.targetMuscles?.length ? (
                                                    ex.targetMuscles.map((muscle, index) => (
                                                        <li key={index}>{capitalize(muscle)}</li>
                                                    ))
                                                ) : (
                                                    <li>No target muscles found.</li>
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                    <div className={styles.informationWrapper}>
                                        <div className={styles.bodypartWrapper}>
                                            <h2 className={styles.middletext}>Bodypart:</h2>
                                            <span>{ex?.bodyParts?.length ? ex.bodyParts.map(muscle => muscle.toUpperCase()).join(", ") : "No body parts found."}</span>
                                            {/* {ex.bodyParts.map(muscle => muscle.toUpperCase()).join(", ")} */}
                                        </div>
                                        <div className={styles.secondaryWrapper}>
                                            <h2 className={styles.middletext}>Secondary muscles:</h2>
                                            <ul className={styles.secondaryMuscles}>
                                                {ex?.secondaryMuscles?.length ? (
                                                    ex.secondaryMuscles.map((muscle, index) => (
                                                        <li key={index}>{muscle}</li>
                                                    ))
                                                ) : (
                                                    <li>No secondary muscles found.</li>
                                                )}
                                            </ul>
                                        </div>
                                        <div className={styles.secondaryWrapper}>
                                            <h2 className={styles.middletext}>Equipments:</h2>
                                            <ul className={styles.secondaryMuscles}>
                                                {ex?.secondaryMuscles?.length ? (
                                                    ex.equipments.map((muscle, index) => (
                                                        <li key={index}>{muscle}</li>
                                                    ))
                                                ) : (
                                                    <li>No secondary muscles found.</li>
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                    {/* <div className={styles.instructionWrapper}>
                                        <h2>Instructions:</h2> */}
                                    {/* <ul className={styles.instructions}>
                                            {ex?.instructions.map((instruction, index) => {
                                                const match = instruction.match(/^(Step:\d+)\s(.+)$/);
                                                return (
                                                    <li key={index}>
                                                        {match ? (
                                                            <>
                                                                <strong>{match[1]}</strong> {match[2]}
                                                            </>
                                                        ) : (
                                                            instruction
                                                        )}
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div> */}
                                    {/* <div className={styles.imageWrapper}>
                                        <Image
                                            src={ex?.image_url || "/default-image.png"} // Fallback image if URL is not available
                                            // src={getImageUrl(ex)}
                                            alt={ex?.name || "Exercise Image"}
                                            width={100}
                                            height={100}
                                            className={styles.exercise_image}
                                        />
                                    </div> */}

                                    Bodypart: {w.body_part ?? 'Okänd'}<br />
                                    Weight: {w.weight} kg<br />
                                    Set: {w.set}, Reps: {w.rep}, Rest: {w.rest} sek<br />
                                    Superset: {w.superset ? 'Superset1' : 'Superset2'}
                                    <button className={styles.button} onClick={() => deleteTraining(w.exercise_id)}>Delete</button>
                                    <hr />
                                </li>
                            </ul>
                        </div>
                    </div>
                );
            })}
        </>
    );
}

function capitalize(arg: string) {
    return arg.charAt(0).toUpperCase() + arg.slice(1);
}

