"use client"
import { Exercise } from "@/lib/interfaces";
import styles from "./showexercise.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ShowExerciseResultById({ exercise }: { exercise: Exercise | undefined }) {
    const fallbackImage = '/placeholder-image.jpg';
    const [imgSrc, setImgSrc] = useState<string>(fallbackImage);

    useEffect(() => {
        if (!exercise?.gifUrl) return;

        const filename = exercise.gifUrl.trim().split("/").pop();
        const localPath = `/${filename}`;

        fetch(localPath, { method: "HEAD" })
            .then((res) => {
                if (res.ok) {
                    setImgSrc(localPath);
                } else {
                    setImgSrc(fallbackImage);
                }
            })
            .catch(() => {
                setImgSrc(fallbackImage);
            });
    }, [exercise]);

    if (!exercise) {
        console.log("Exercise is undefined");
        return null;
    }
    console.log('exercise.imageUrl:', exercise.gifUrl);
    return exercise === undefined ? <p>Choose exercise to see details here.</p> :

        <div className={styles.grid}>
            <h1>{exercise.name.charAt(0).toUpperCase() + exercise.name.slice(1)}</h1>
            <h2>{exercise.targetMuscles.map(muscle => muscle.toUpperCase())}</h2>
            <div className={styles.informationWrapper}>
                <div className={styles.bodypartWrapper}>
                    <h3>Bodypart:</h3>
                    <span>{exercise.bodyParts}</span>
                </div>
                <div className={styles.secondaryWrapper}>
                    <h3>Secondary muscles:</h3>
                    <ul className={styles.secondaryMuscles}>
                        {exercise.secondaryMuscles.map((muscle, index) => (
                            <li key={index}>{muscle}</li>
                        ))}
                    </ul>
                </div>
                <div className={styles.equipmentWrapper}>
                    <h3>Equipment:</h3>
                    <span>{exercise.equipments}</span>
                </div>
            </div>
            <Image
                src={imgSrc}
                alt={exercise.name}
                width={100}
                height={100}
                className={styles.exercise_image}
            />
            <div className={styles.instructionWrapper}>
                <h2>Instructions:</h2>
                <ul className={styles.instructions}>
                    {exercise.instructions.map((instruction, index) => {
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
            </div>
        </div>
}

