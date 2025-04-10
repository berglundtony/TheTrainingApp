export interface Exercise {
    id: string;                   
    name: string;                
    bodyPart: string;            
    target: string;              
    secondaryMuscles: string[];   
    equipment: string;          
    gifUrl: string;               
    instructions: string[];       
}

export interface ExerciseResponse {
    totalExercises: number;
        exercises: Exercise[]; 
};

export interface ExerciseDropDown {
    id: string;
    name: string;
}
    
export interface BodyPart {
    id: string;
    name: string;
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
