import { BodyPart, Exercise } from "@/lib/interfaces";

// https://exercisedb-api.vercel.app/api/v1/exercises?offset=0&limit=10


export const fetchExercises = async (): Promise<Exercise[]> => {
    const url = 'https://exercisedb.p.rapidapi.com/exercises?limit=10&offset=10';
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'fffba84357msh7ca93fb57ea422ep14d282jsn1adc2f95fc89',
            'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
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
    const url = 'https://exercisedb.p.rapidapi.com/exercises/bodyPartList';
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'fffba84357msh7ca93fb57ea422ep14d282jsn1adc2f95fc89',
            'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
        }
    };
    try {
        const response = await fetch(url, options);
        if (!response.ok) throw new Error(`HTTP error! Status: ${(response).status}`);
        const data: string[] = await response.json();
        cachedBodyParts = data.map((bodypart, index) => ({
            id: index.toString(), 
            name: typeof bodypart === "string" ? bodypart.charAt(0).toUpperCase() + bodypart.slice(1) : "Unknown",
        }));
        return cachedBodyParts;
    } catch (error) {
        console.error("Error fetching body parts:", error);
        return [];
    }
}


export async function fetchExerciseByBodyPart(bodyPart: string): Promise<Exercise[]> {
    if (!bodyPart || bodyPart === "none") {
        console.warn("fetchExerciseByBodyPart: Ogiltigt bodyPart", bodyPart);
        return [];
    }
    const url = `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${encodeURIComponent(bodyPart)}?limit=10&offset=0`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'fffba84357msh7ca93fb57ea422ep14d282jsn1adc2f95fc89',
            'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result: Exercise[] = await response.json();
        console.log(result);
        return result;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function fetchExerciseByName(name: string): Promise<Exercise> {
    if (!name || name === "none") {
        console.warn("fetchExerciseByName: Ogiltigt namn", name);
        return {} as Exercise; // Returnera en tom Exercise-objekt istället för en tom sträng
    }
    const url = `https://exercisedb.p.rapidapi.com/exercises/name/${encodeURIComponent(name)}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'fffba84357msh7ca93fb57ea422ep14d282jsn1adc2f95fc89',
            'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result: Exercise[] = await response.json();
        console.log("resultat:" + result);
        return result.length > 0 ? result[0] : {} as Exercise; // Returnera första objektet eller tomt objekt om inget hittades
    } catch (error) {
        console.error(error);
        return {} as Exercise; 
    }
}

