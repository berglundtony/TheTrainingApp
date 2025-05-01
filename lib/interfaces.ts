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
        exercises: Exercise[];
    };
};

export interface SingleExerciseResponse {
    success: boolean;
    data: Exercise;
}

export interface ExerciseDropDown {
    exerciseId: string;
    name: string;
    bodyParts: string[];
}
    
export interface BodyPart {
    name: string;
}

export interface BodyPartResponse{
    success: boolean;
    data: BodyPart[];
}

export interface Props {
    allExercises: ExerciseDropDown[];
    filteredExercises: ExerciseDropDown[];
    selected: string;
}

export interface PageProps {
    searchParams?: {
        [key: string]: string | string[] | undefined;
    };
};

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

export interface Set {
    id: string;
    amount: number;
}
export interface Rep {
    id: string;
    amount: number;
}
export interface Rest {
    id: string;
    amount: number;
}

export interface WeekDayDropDownProps {
    selectedWeek: string;
    selectedDay: string;
    onChangeWeek: (val: string) => void;
    onChangeDay: (val: string) => void;
}

export interface SetRepRestDropDownProps {
    selectedSet: number;
    selectedRep: number;
    selectedRest: number;
    onChangeSet: (val: number) => void;
    onChangeRep: (val: number) => void;
    onChangeRest: (val: number) => void;
}

export interface SlideshowProps {
    images: string[];
    duration?: number;
}

export interface LoginProps{
    onLoginSuccess: () => void;
}
