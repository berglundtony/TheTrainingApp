export type Workout = {
    id?: string;
    day: string;
    week: string;
    exercise_id: string;
    body_part?: string;
    weight: number;
    set: number;
    rep: number;
    rest: number;
    superset?: boolean;
    created_at?: string;
};