export type Workout = {
    id?: string;
    day: string;
    week: string;
    iscompleted: boolean;
    exercise_id: string;
    body_part?: string;
    weight: number;
    set: number;
    rep: number;
    rest: number;
    setvalue: number;
    superset?: boolean;
    created_at?: string;
    user_id?: string;
};

export interface WorkoutData {
    day: string;
    week: string;
    iscompleted: boolean;
    exercise_id: string;
    body_part?: string;
    weight: number;
    set: number;
    rep: number;
    rest: number;
    setvalue: number;
    superset?: boolean;
    [key: string]: unknown;
}