import { BodyPart, Exercise, ExerciseResponse } from "@/lib/interfaces";

// https://exercisedb-api.vercel.app/api/v1/exercises?offset=0&limit=10
const MAIN_URL ="https://exercisedb-api.vercel.app/api/v1"


export const fetchExercises = async (): Promise<Exercise[]> => {
    const url = `${MAIN_URL}/exercises`;
    const options = {
        method: 'GET',
        headers: {
            Accept: '*/*'
        }
    };
    try {
        const res = await fetch(url, options);

        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const responseData = await res.json();
        console.log("Fetched data:", responseData); // ✅ Debugga API-svaret

        return responseData;
    } catch (error) {
        console.error("Error fetching exercises:", error);
        return []; 
    }
};

let cachedBodyParts: BodyPart[] | null = null;

export async function fetchBodyParts(): Promise<BodyPart[]> {
    if (cachedBodyParts) {
        console.log('Returning cached body parts');
        return cachedBodyParts;
    }
    const url = `${MAIN_URL}/bodyparts`;
    const options = {
        method: 'GET',
        headers: {
            Accept: '*/*'
        }
    };
    try {
        const response = await fetch(url, options);
        if (!response.ok) throw new Error(`HTTP error! Status: ${(response).status}`);
        const data: string[] = await response.json();
        cachedBodyParts = data.map((bodypart) => ({
            name: typeof bodypart === "string" ? bodypart.charAt(0).toUpperCase() + bodypart.slice(1) : "Unknown",
        }));
        return cachedBodyParts;
    } catch (error) {
        console.error("Error fetching body parts:", error);
        return [];
    }
}


export async function fetchExerciseByBodyPart(name: string): Promise<ExerciseResponse> {
    if (!name || name === "none") {
        console.warn("fetchExerciseByBodyPart: Ogiltigt bodyPart", name);
        return {
            success: false,
            data: {
                previousPage: null,
                nextPage: null,
                totalPages: 0,
                totalExercises: 0,
                currentPage: 0,
                exercises: []
            }
        };
    }
    const url = `${MAIN_URL}/bodyparts/${encodeURIComponent(name)}/exercises}`;
        const options = {
            method: 'GET',
            headers: {
                Accept: '*/*'
            }
        };
    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result: Exercise[] = await response.json();
        console.log(result);
        return {
            success: true,
            data: {
                previousPage: null,
                nextPage: null,
                totalPages: 1,
                totalExercises: result.length,
                currentPage: 1,
                exercises: result
            }
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            data: {
                previousPage: null,
                nextPage: null,
                totalPages: 0,
                totalExercises: 0,
                currentPage: 0,
                exercises: []
            }
        };
    }
}

export async function fetchExerciseById(exerciseId: string): Promise<ExerciseResponse> {
    if (!exerciseId || exerciseId === "none") {
        console.warn("fetchExerciseByName: Ogiltigt namn", exerciseId);
        return {} as ExerciseResponse; // Returnera en tom Exercise-objekt istället för en tom sträng
    }
    const url = `${MAIN_URL}/exercises/${encodeURIComponent(exerciseId)}`;
    const options = {
        method: 'GET',
        headers: {
            Accept: '*/*'
        }
    };
    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result: ExerciseResponse = await response.json();
        console.log("resultat:" + result);
        return {
            success: true,
            data: result.data
        }
    } catch (error) {
        console.error(error);
        return {
            success: false,
            data: {
                previousPage: null,
                nextPage: null,
                totalPages: 0,
                totalExercises: 0,
                currentPage: 0,
                exercises: []
            }
        } as ExerciseResponse;
    }
}

