"use server";

import { supabase } from "@/lib/supabase/supaBaseClient";
// import { Exercise } from "./interfaces";


export async function fetchWorkouts() {
    const { data, error } = await supabase.from('workouts').select('*');

    if (error) {
        console.error('Fel vid hämtning:', error.message);
        return [];
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