import { createClient } from '@supabase/supabase-js';
import { Workout } from '@/lib/supabase/types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase URL och/eller nyckel saknas i miljövariablerna');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function saveWorkout(workout: Omit<Workout, 'id' | 'created_at'>) {
    const { data, error } = await supabase
        .from('workouts')
        .insert([
            {
                ...workout,
                created_at: new Date().toISOString(),
            },
        ]);

    if (error) {
        console.error('Fel vid sparning:', error);
        throw error;
    }

    return data;
}