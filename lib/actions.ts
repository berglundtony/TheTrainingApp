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