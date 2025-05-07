"use server";

import { supabase } from "@/lib/supabase/supaBaseClient";
import { Workout } from "./supabase/types";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
// import { Exercise } from "./interfaces";


export async function fetchWorkouts() {
    const { data, error } = await supabase.from('workouts').select('*');

    if (error) {
        console.error('Fel vid hämtning:', error.message);
        return [];
    }

    return data;
}

export async function saveWorkout(data: Partial<Workout>) {
  
    const supabase = createServerActionClient({cookies});

    const { data: { user } } = await supabase.auth.getUser();
    console.log(user?.id); 

    if (!user) {
        throw new Error("User is not authenticated");
    }
    const { error } = await supabase
        .from('workouts')
        .insert({
            ...data,
            user_id: user.id,
          
            created_at: new Date().toISOString(),
        });

    if (error) {
        console.error('Fel vid sparning:', error);
        throw error;
    }
    return { success: true };
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