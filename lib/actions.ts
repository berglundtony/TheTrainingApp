"use server";

import { supabase } from "@/lib/supabase/supaBaseClient";
import { Workout } from "./supabase/types";

export async function fetchWorkouts() {
    const { data, error } = await supabase.from('workouts').select('*');

    if (error) {
        console.error('Fel vid hämtning:', error.message);
        return [];
    }

    return data;
}

export async function saveWorkout(workout: Workout) {
    const { data, error } = await supabase
        .from('workouts')
        .insert([workout]);

    if (error) {
        console.error('Fel vid sparning:', error.message);
        throw error;
    }

    return data;
}

export async function deleteExercise(exercise_id: number) {
    const { data, error } = await supabase
        .from('workouts')
        .delete()
        .eq('exercise_id', exercise_id);

    if (error) {
        console.error('Fel vid radering:', error.message);
        return null;
    }

    return data;
}