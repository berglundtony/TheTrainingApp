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
};

export interface ExerciseDropDown {
    exerciseId: string;
    name: string;
}
    
export interface BodyPart {
    name: string;
}

export interface BodyPartResponse{
    success: boolean;
    data: BodyPart[];
}

export interface TransitionOptions {
    shallow?: boolean;
    locale?: string | false;
    scroll?: boolean;
}
export interface Day {
    id: string;
    name: string;
}
export interface Week {
    id: string;
    name: string;
}

export interface WeekDayDropDownProps {
    selectedWeek: string;
    selectedDay: string;
    onChangeWeek: (val: string) => void;
    onChangeDay: (val: string) => void;
}
