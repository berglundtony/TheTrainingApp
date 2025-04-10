// "use server";

// import { createServerClient } from "@/lib/supabase/server";


// export async function saveSelection(week: string, day: string): Promise<boolean> {
//     const supabase = createServerClient();

//     // Hämta användaren som är inloggad


//     const { data: { user }, error: userError } = await supabase.auth.getUser();
//     if (!user || userError) {
//         console.error("User not authenticated or error", userError);
//         return false;
//     }

//     // Spara till t.ex. en tabell "workout_selection"
//     const { error } = await supabase.from('workout_selection').insert({
//         user_id: user.id,
//         week,
//         day,
//         created_at: new Date().toISOString()
//     });

//     if (error) {
//         console.error("Failed to insert selection:", error);
//         return false;
//     }

//     return true;
// }