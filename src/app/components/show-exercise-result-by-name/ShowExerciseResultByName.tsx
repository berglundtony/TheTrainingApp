"use client"
import { Exercise } from "@/lib/interfaces";
import styles from "./showexercise.module.css";
import Image from "next/image";

export default function ShowExerciseResultByName({ exercise }: { exercise: Exercise | undefined }) {
    if (!exercise) return null;
    return exercise === undefined ? <p>Choose exercise to see details here.</p> :
        <div className={styles.grid}>
            <h1>{exercise.name}</h1> 
            <h2>Target muscle: {exercise.target}</h2>
            <h3>Bodypart: {exercise.bodyPart}</h3>
            <ul>
            {
                <li key={exercise.id}>
              
                    <Image src={exercise.gifUrl} height={100} width={100} alt={exercise.name} className={styles.exercise_image}></Image>
                    <h3>Secondary muscels: {exercise.secondaryMuscles.join(", ")}</h3>
                    <h3>Equipment: {exercise.equipment}</h3>
                    <ul>
                        {exercise.instructions.map((step, index) => (
                            <li key={index}>{step}</li>
                        ))}
                    </ul>
                </li>
            }
            </ul>
        </div>

}
