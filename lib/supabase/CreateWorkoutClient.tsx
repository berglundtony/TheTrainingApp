'use client';

import { useState } from 'react';
import { saveWorkout } from '@/lib/supabase/workoutApi';

export default function CreateWorkoutClient() {
    const [isSaving, setIsSaving] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSaving(true);
        // const form = e.currentTarget;
        // const formData = new FormData(form);

        // Konvertera värden till rätt typ
        // const weight = Number(formData.get("weight"));
        // const set = Number(formData.get("set"));
        // const rep = Number(formData.get("rep"));
        // const rest = Number(formData.get("rest"));
        // const day = formData.get("day") as string;
        // const week = formData.get("week") as string;
        // const exercise_id = formData.get("exercise_id") as string;
        // const body_part = formData.get("body_part") as string;
        // const setvalue = formData.get("setvalue") as string;
        // const iscompleted = formData.get("iscompleted") === "true";
        // const superset = formData.get("superset") === "true";
        // const created_at = new Date().toISOString();

        try {
            const newWorkout = {
                day: 'Monday',
                week: 'Week 1',
                exercise_id: 'U6G2gk9',
                body_part: 'Back',
                weight: 20,
                set: 3,
                rep: 12,
                rest: 60,
                setvalue: 0,
                iscompleted: false,
                superset: false,
                created_at: new Date().toISOString(),
            };

            const response = await saveWorkout(newWorkout);
            console.log('Sparat:', response);
        } catch (error) {
            console.error('Kunde inte spara passet:', error);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    const form = e.currentTarget.closest('form');
                    if (form) handleSubmit(new Event('submit', { bubbles: true, cancelable: true }) as unknown as React.FormEvent<HTMLFormElement>);
                }}
                disabled={isSaving}
            >
                {isSaving ? 'Sparar...' : 'Spara pass'}
            </button>
        </div>
    );
}