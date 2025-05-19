"use server";

// import { supabase } from "@/lib/supabase/supaBaseClient";
import { WorkoutData } from "./supabase/types";
import { createClient } from '@/src/app/utils/supabase/server'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server';
import type { Workout } from "@/lib/supabase/types";
// import { Exercise } from "./interfaces";


interface User {
    id: string;
    [key: string]: any; // For additional optional fields
}

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

// export async function saveWorkout(data: Partial<Workout>) {

//     const supabase = createServerActionClient({cookies});

//     const { data: { user } } = await supabase.auth.getUser();
//     console.log(user?.id); 

//     if (!user) {
//         throw new Error("User is not authenticated");
//     }
//     const { error } = await supabase
//         .from('workouts')
//         .insert({
//             ...data,
//             user_id: user.id,

//             created_at: new Date().toISOString(),
//         });

//     if (error) {
//         console.error('Fel vid sparning:', error);
//         throw error;
//     }
//     return { success: true };
// }


