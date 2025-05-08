
import { SupabaseClient, User } from "@supabase/supabase-js";

interface WorkoutData {
    title: string;
    description?: string;
    date: string;
    duration: number;
    [key: string]: unknown; // For additional optional fields
}

interface User {
    id: string;
    [key: string]: any; // For additional optional fields
}

export const saveWorkout = async (
    workoutData: WorkoutData,
    supabase: SupabaseClient // Pass the Supabase client instance as an argument    

): Promise<any> => {
    const {
        data: { user },
        error: userError,
    }: { data: { user: User | null }; error: Error | null } = await supabase.auth.getUser();

    if (userError || !user) {
        throw new Error("User is not authenticated");
    }

    const { data, error }: { data: any; error: Error | null } = await supabase
        .from("workouts")
        .insert([{ ...workoutData, user_id: user.id }]);

    if (error) throw error;

    return data;
};