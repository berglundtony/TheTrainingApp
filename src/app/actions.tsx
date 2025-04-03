import { Exercise } from "@/lib/interfaces";

export const fetchExercises = async (): Promise<Exercise[]> => {
    try {
        const res = await fetch("https://exercisedb-api.vercel.app/api/v1/exercises?offset=0&limit=10");

        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const responseData = await res.json();
        console.log("Fetched data:", responseData); // ✅ Debugga API-svaret

        if (!responseData.data || !Array.isArray(responseData.data.exercises)) {
            throw new Error("Invalid API response: Missing exercises array");
        }
        return responseData.data.exercises;
    } catch (error) {
        console.error("Error fetching exercises:", error);
        return []; // Returnera en tom array vid fel så appen inte kraschar
    }
};