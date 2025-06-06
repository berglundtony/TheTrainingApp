"use client";

import { Exercise, ExerciseDropDown } from "@/lib/interfaces";
import { useState } from "react";
import { FaChevronDown, FaChevronLeft } from "react-icons/fa";
import WorkoutFormWrapper from "../workout-form-wrapper/WorkoutFormWrapper";
import ShowExerciseResultById from "../show-exercise-result-by-id/ShowExerciseResultById";
import ShowTheTrainingProgram from "../show-the-training-program/ShowTheTrainingProgram";
import styles from "./workoutAccordionClient.module.css";
import Logout from "../logout/Logout";


type Props = {
    access_token: string;
    allExercises: ExerciseDropDown[];
    filteredExercises: ExerciseDropDown[];
    selectedExercise: Exercise | null;
    exerciseId: string;
};

export default function WorkoutAccordionClient({
    access_token,
    allExercises,
    filteredExercises,
    selectedExercise,
    exerciseId,
}: Props) {
    {
        const [activeTab, setActiveTab] = useState<'create' | 'program'>('program');
        return (
            <div className={styles.wrapper}>
                <aside className={styles.sidebar}>
                    <button
                        className={`${styles.tabButton} ${activeTab === 'create' ? styles.active : ''}`}
                        onClick={() => setActiveTab('create')}
                    >
                        <span>{activeTab === 'create' ? <FaChevronLeft /> : <FaChevronDown />}</span> Create
                    </button>
                    <button
                        className={`${styles.tabButton} ${activeTab === 'program' ? styles.active : ''}`}
                        onClick={() => setActiveTab('program')}
                    >
                        <span>{activeTab === 'program' ? <FaChevronLeft /> : <FaChevronDown />}</span> Training
                    </button>
                </aside>

                <main className={styles.mainContent}>
                    <div className={styles.btnWrapper}>
                        <Logout />

                        {activeTab === 'create' && (
                            <>
                                <WorkoutFormWrapper
                                    access_token={access_token}
                                    allExercises={allExercises}
                                    filteredExercises={filteredExercises}
                                    selected={exerciseId}
                                />
                                <ShowExerciseResultById exercise={selectedExercise || undefined} />
                            </>
                        )}
                        {activeTab === 'program' && <ShowTheTrainingProgram />}
                    </div>
                </main>
            </div>
        );
    }
}