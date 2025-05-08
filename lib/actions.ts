"use server";

// import { supabase } from "@/lib/supabase/supaBaseClient";
import { WorkoutData } from "./supabase/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { SupabaseClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import type { Workout } from "@/lib/supabase/types";
// import { Exercise } from "./interfaces";


interface User {
    id: string;
    [key: string]: any; // For additional optional fields
}

export async function fetchWorkouts(): Promise<Workout[]> {
    const supabase = createServerComponentClient({ cookies });

    const {
        data: { session },
        error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError) {
        console.error('Kunde inte hämta session:', sessionError.message);
        return [];
    }

    const user_id = session?.user?.id;
    if (!user_id) {
        console.error('Ingen användare inloggad');
        return [];
    }

    const { data, error } = await supabase.from('workouts').select('*').eq('user_id', user_id);

    if (error) {
        console.error('Fel vid hämtning:', error.message);
        return [];
    }

    return data as Workout[]
}


export const saveWorkout = async (
    workoutData: WorkoutData,
    accessToken: string) => {
    
    const supabase = createServerComponentClient({ cookies });
    // const { error: sessionError } = await supabase.auth.setSession({ access_token: accessToken, refresh_token: '' });
    const { data: session, error } = await supabase.auth.getSession();
    if (error || !session) {
        throw new Error('Session not found');
    }

    console.log('Access Token:', accessToken);

    const user = session;

    if (!user) {
        throw new Error('User is not authenticated');
    }

    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError || !userData) {
        console.error('User error:', userError);
        throw new Error('User is not authenticated');
    }

    await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: '', // Fyll i om du använder refresh token också
    });

    const { error: insertError } = await supabase.from('workouts').insert([
        {
            ...workoutData,
            user_id: user.session?.user.id,
        },
    ]);

    if (insertError) {
        console.error('Insert error:', insertError);
        throw new Error('Failed to save workout: ' + insertError.message);
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

export async function deleteExercise(
    exercise_id: number,
    supabase: SupabaseClient
): Promise<any> {
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

function getAccessTokenFromAuth() {
    throw new Error("Function not implemented.");
}
