export interface Exercise {
    exerciseId: string;
    name: string;
    gifUrl: string;
    instructions: string[];
    targetMuscles: string[];
    bodyParts: string[];
    equipments: string[];
    secondaryMuscles: string[];
}

export interface ExerciseResponse {
    success: boolean;
    data: {
        previousPage: string | null;
        nextPage: string | null;
        totalPages: number;
        totalExercises: number;
        currentPage: number;
        exercises: Exercise[]; 
    };
}