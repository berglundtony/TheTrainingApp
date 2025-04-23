import { BodyPart, Exercise, ExerciseDropDown, ExerciseResponse, SingleExerciseResponse} from "@/lib/interfaces";

// https://exercisedb-api.vercel.app/api/v1/exercises?offset=0&limit=10
const MAIN_URL = "https://exercisedb-api.vercel.app/api/v1"

export const fetchExercises = async (): Promise<ExerciseResponse> => {
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
        console.log("Fetched data:", responseData);

        return responseData.data;
    } catch (error) {
        console.error("Error fetching exercises:", error);
        return { 
            success: false, 
            data: {
                exercises: []
            }
        };
    }
};
export async function fetchExerciseForDropDown(): Promise<ExerciseDropDown[]> {

    const url = `${MAIN_URL}/exercises`;
    console.log(url);
    try {
        const response = await fetch(url);
        console.log(`Efter fetch: ${response}`)

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const json = await response.json();
        console.log("Raw response JSON:", json);
        console.log(json);

        return json.data.exercises.map((exercise: { exerciseId?: string; name?: string; bodyParts?: string[] }): ExerciseDropDown => ({
            exerciseId: exercise.exerciseId || "",
            name: exercise.name || "",
            bodyParts: Array.isArray(exercise.bodyParts) ? exercise.bodyParts : (exercise.bodyParts ? [exercise.bodyParts] : []),
        }))
    } catch (error) {
        console.error(error);
        return [];
    }
};

export async function fetchBodyParts(): Promise<BodyPart[]> {
    let bodyParts: BodyPart[];

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
        const json = await response.json();
        const data: { name: string }[] = json.data;
        console.log("HÄR" + " " + data)
        bodyParts = data.map((bodypart) => ({
            name: typeof bodypart.name === "string" ? (bodypart.name).charAt(0).toUpperCase() + (bodypart.name).slice(1) : "Unknown",
        }));
        return bodyParts;
    } catch (error) {
        console.error("Error fetching body parts:", error);
        return [];
    }
    return []; 
}

export async function fetchExerciseByBodyPart(bodyPartName: string): Promise<ExerciseDropDown[]> {
    if (!bodyPartName || bodyPartName === "none") {
        console.warn("fetchExerciseByBodyPart: Ogiltigt bodyPart", bodyPartName);
        return [];
    };
    const url = `${MAIN_URL}/bodyparts/${encodeURIComponent(bodyPartName)}/exercises`;
    const options = {
        method: 'GET',
        headers: {
            Accept: '*/*'
        }
    };
    console.log(url);
    try {
        const response = await fetch(url, options);
        console.log(`Efter fetch: ${response}`)

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // const json = await response.json();
        const json = await response.json();
        console.log("Raw response JSON:", json);
        console.log(json);

        return json.data.exercises.map((exercise: { exerciseId?: string; name?: string; bodyParts?: string[] }): ExerciseDropDown => ({
            exerciseId: exercise.exerciseId || "",
            name: exercise.name || "",
            bodyParts: exercise?.bodyParts || []
        }))
    } catch (error) {
        console.error(error);
        return [];
    }
};

export async function fetchExerciseById(exerciseId: string): Promise<Exercise | null> {
    if (!exerciseId || exerciseId === "none") {
        console.warn("Ogiltigt exerciseId:", exerciseId);
        return null;
    }

    try {
        const url = `${MAIN_URL}/exercises/${encodeURIComponent(exerciseId)}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: { Accept: '*/*' },
        });

        if (!response.ok) {
            console.warn(`Fel vid hämtning av ${exerciseId}: ${response.status}`);
            return null;
        }

        const result: SingleExerciseResponse = await response.json();
        return result.success ? result.data : null;

    } catch (error) {
        console.error("Nätverksfel:", error);
        return null;
    }
}

