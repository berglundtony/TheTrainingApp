"use client";

import { useState } from "react";
import CreateWorkoutClient from "../create-workout-client/CreateWorkoutClient";
import BodyPartExerciseClient from "../body-part-exercise-client/BodyPartExerciseClient";
import WorkoutSettingsClient from "../workout-settings-client/WorkoutSettingsClient";
import { saveWorkout } from "@/lib/supabase/workoutApi";
import { ExerciseDropDown } from "@/lib/interfaces";

export default function WorkoutFormWrapper({ allExercises, filteredExercises, selected }:
    {
        allExercises: ExerciseDropDown[],
        filteredExercises: ExerciseDropDown[],
        selected: string;
    }) {
    
    const [selectedWeek, setSelectedWeek] = useState("none");
    const [selectedDay, setSelectedDay] = useState("none");
    const [exerciseId, setExerciseId] = useState("");
    const [bodypart, setBodyPart] = useState("");
    const [formValues, setFormValues] = useState({
        weight: 0,
        set: 0,
        rep: 0,
        rest: 0,
    });

    // const selectedExercise = allExercises.find(ex => ex.id === exerciseId);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const workout = {
            day: selectedDay,
            week: selectedWeek,
            exercise_id: exerciseId,
            body_part: bodypart,
            weight: Number(formValues.weight),
            set: Number(formValues.set),
            rep: Number(formValues.rep),
            rest: Number(formValues.rest),
        };

        try {
            const data = await saveWorkout(workout);
            console.log("Passet sparades!", data);
        } catch (err) {
            console.error("Fel vid sparning", err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CreateWorkoutClient
                selectedWeek={selectedWeek}
                selectedDay={selectedDay}
                setSelectedWeek={setSelectedWeek}
                setSelectedDay={setSelectedDay} />
            <BodyPartExerciseClient
                allExercises={allExercises}
                filteredExercises={filteredExercises}
                selected={selected}
                onChangeExercise={setExerciseId}
                setBodyPart={setBodyPart}
            />
            <WorkoutSettingsClient
                values={formValues}
                onChange={setFormValues}
            />
            <button type="submit">Spara pass</button>
        </form>
    );
}