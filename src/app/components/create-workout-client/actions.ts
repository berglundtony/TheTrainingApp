// "use server";

// import { createServerClient } from "@/lib/supabase/server";

// export async function saveSelection(week: string, day: string) {
//     const supabase = createServerClient();

//     const { data, error } = await supabase
//         .from("workouts") // Justera till rätt tabellnamn
//         .insert([{ week, day }]);

//     if (error) {
//         console.error("Failed to save selection:", error);
//         throw new Error("Could not save selection");
//     }

//     return data;
// }