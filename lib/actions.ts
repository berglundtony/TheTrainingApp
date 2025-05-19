"use server";

import { createClient } from '@/src/app/utils/supabase/server'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import type { Workout, WorkoutData } from "@/lib/supabase/types";


export async function fetchWorkouts(): Promise<Workout[]> {
    const supabase = await createClient();

    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
        console.error("Ingen giltig användare", userError);
        return [];
    }

    const user_id = user.id;

    const { data, error: fetchError } = await supabase.from('workouts').select('*').eq('user_id', user_id);

    if (fetchError) {
        console.error('Fel vid hämtning:', fetchError.message);
        return [];
    }

    return data as Workout[]
}


export const saveWorkout = async (
    workoutData: WorkoutData,
    accessToken: string): Promise<{ success: true }> => {
    // Skapa en "ad-hoc"-Supabase-klient som skickar med vårt access token
    const supabase = createSupabaseClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            global: {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            },
        }
    )


    console.log('Access Token:', accessToken);

    const { error: insertError } = await supabase
        .from('workouts')
        .insert([{ ...workoutData }])


    if (insertError) {
        console.error('Insert error:', insertError)
        throw new Error('Failed to save workout: ' + insertError.message)
    }

    return { success: true };
};




