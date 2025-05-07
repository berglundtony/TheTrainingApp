// import { supabase } from './supaBaseClient';
// import { Workout } from './types';

// export async function saveWorkout(workout: Workout) {
//     const { data, error } = await supabase
//         .from('workouts') 
//         .insert([workout]);

//     if (error) {
//         console.error('Fel vid sparning:', error.message);
//         throw error;
//     }
    
//     return data;
// }