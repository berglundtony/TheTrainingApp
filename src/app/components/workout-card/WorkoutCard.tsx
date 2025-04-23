"use client";
import { Exercise } from "@/lib/interfaces";
import { Workout } from "@/lib/supabase/types";
import { useImageUrl } from "../use-image/useImage";
import { supabase } from "@/lib/supabase/supaBaseClient";
import styles from "./workoutcard.module.css";
import Image from "next/image";

type WorkoutCardProps = {
    workout: Workout;
    exercise: Exercise;
    index: number;
    onDelete: (exercise_id: string) => void;
};

export default function WorkoutCard({ workout, exercise, index, onDelete }:
    WorkoutCardProps) {
    const imageUrl = useImageUrl(exercise);

    const deleteTraining = async (exercise_id: string) => {
        const { error } = await supabase
            .from("workouts")
            .delete()
            .eq("exercise_id", exercise_id);

        if (error) {
            console.error("Kunde inte ta bort övningen:", error.message);
        } else {
            onDelete(exercise_id);
        }
    };

    return (
        <div className={styles.container} key={workout.id ?? `${workout.exercise_id}-${workout.day}-${workout.week}`}>
            <div className={styles.grid}>
                <ul className={styles.card}>
                    <li className={styles.exercise}>
                        <div className={styles.exerciseWrapper}>
                            <h2 className={styles.exerciseNumber}>Exercise {index + 1}</h2>
                            <h3 className={styles.headerWeekAndDay}> {workout.week}, {workout.day}</h3>
                            <h3 className={styles.superset}>{workout.superset ? 'Superset 1' : 'Superset 2'}</h3>
                        </div>
                        <div className={styles.nameAndTargetWrapper}>
                            <p>{exercise ? capitalize(exercise.name) : "No Exercise"}</p>
                            <div className={styles.targetMuscleWrapper}>
                                <h4 className={styles.headerTargetMuscle}>Target muscles:</h4>
                                <ul className={styles.targetMuscles}>
                                    {exercise?.targetMuscles?.length ? (
                                        exercise.targetMuscles.map((muscle, index) => (
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
                                <span>{exercise?.bodyParts?.length ? exercise.bodyParts.map(muscle => muscle.toUpperCase()).join(", ") : "No body parts found."}</span>
                            </div>
                            <div className={styles.secondaryRowWrapper}>
                                <div className={styles.secondaryWrapper}>
                                    <h2 className={styles.middletext}>Secondary muscles:</h2>
                                    <ul className={styles.secondaryMuscles}>
                                        {exercise?.secondaryMuscles?.length ? (
                                            exercise.secondaryMuscles.map((muscle, index) => (
                                                <li key={index}>{muscle}</li>
                                            ))
                                        ) : (
                                            <li>No secondary muscles found.</li>
                                        )}
                                    </ul>
                                </div>
                            </div>
                            <div className={styles.equipmentWrapper}>
                                <h2 className={styles.middletext}>Equipments:</h2>
                                <ul className={styles.equipment}>
                                    {exercise?.equipments?.length ? (
                                        exercise.equipments.map((eq, index) => (
                                            <li key={index}>{eq}</li>
                                        ))
                                    ) : (
                                        <li>No equipments found.</li>
                                    )}
                                </ul>
                            </div>
                        </div>
                        <div className={styles.setsAndRepsWrapper}>
                            <div className={styles.inlineGroup}>
                                <h2 className={styles.middletext}>Sets:</h2>
                                <span className={styles.set}>{workout.set}</span>
                                <h2 className={styles.middletext}>Reps:</h2>
                                <span className={styles.rep}>{workout.rep}</span>
                            </div>
                            <div className={styles.checkboxGrid}>
                                <span className={styles.settext}>Set:</span>
                                {Array.from({ length: workout.set }, (_, setIndex) => (
                                    <div key={setIndex} className={styles.setRow}>
                                            <label key={setIndex} className={styles.checkboxLabel}>
                                                <input
                                                    type="checkbox"
                                                    name={`set-${setIndex}`}
                                                    value={`set-${setIndex}`}
                                                    onChange={(e) => {
                                                        // Hantera checkbox-värdet här, t.ex. spara till state
                                                    }}
                                                />
                                            </label>
                                    </div>
                            ))}
                        </div>
                    </div>
                    <div className={styles.restWeightWrapper}>
                        <h2 className={styles.middletext}>Rest:</h2>
                        <span className={styles.rest}>{workout.rest}</span><span className={styles.secText}>sec</span>
                        <h2 className={styles.middletext}>Weight:</h2>
                        <span className={styles.weight}>{workout.weight}</span>
                    </div>
                    <div className={styles.instructionWrapper}>
                        <h2>Instructions:</h2>
                        <ul className={styles.instructions}>
                            {exercise?.instructions?.length ? (
                                exercise.instructions.map((instruction, index) => {
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
                                })
                            ) : (
                                <li>No instructions found.</li>
                            )}
                        </ul>
                    </div>
                    <div className={styles.imageWrapper}>
                        <Image
                            alt={exercise.name}
                            src={imageUrl}
                            width={100}
                            height={100}
                            className={styles.exercise_image}
                        />
                    </div>
                    <div className={styles.buttonWrapper}>
                        <button className={styles.deleteButton} onClick={() => deleteTraining(workout.exercise_id)}>
                            Delete
                        </button>
                    </div>
                </li>
            </ul>

        </div>
        </div >
    );
}

function capitalize(arg: string) {
    return arg.charAt(0).toUpperCase() + arg.slice(1);
}