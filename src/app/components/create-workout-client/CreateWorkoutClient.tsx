"use client"

import WeekDayDropDown from "../week-day-dropdown/WeekDayDropDown";
import React from "react";


export default function CreateWorkoutClient({
    selectedWeek,
    selectedDay,
    setSelectedWeek,
    setSelectedDay,
}: {
    selectedWeek: string,
    selectedDay: string,
    setSelectedWeek: (val: string) => void,
    setSelectedDay: (val: string) => void,
}){


    // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => { }
    //     e.preventDefault();

    //     console.log("Submit-funktionen körs");
    //     const form = e.currentTarget;
    //     const formData = new FormData(form);

    //     const day = formData.get("day") as string;
    //     const week = formData.get("week") as string;

    //     if (day === "none" || week === "none") {
    //         alert("Välj både vecka och dag innan du sparar.");
    //         return;
    //     }

    //     console.log({
    //         day,
    //         week,
    //     });

    //     const { data, error } = await supabase
    //         .from("workouts")
    //         .insert<FormData[]>([{       
    //             day,
    //             week,
    //             exercise_id: "placeholder", // uppdatera senare
    //             body_part: "placeholder",
    //             weight: 0, // uppdatera senare
    //             set: 0,
    //             rep: 0,
    //             rest: 0,
    //         }]);
        
    //     if (error) {
    //         console.error("Fel vid insättning:", error);
    //     } else {
    //         console.log("Sparat!", data);
    //         // setHasSaved(true);
    //     }
    // };

    return (
        <WeekDayDropDown
            selectedWeek={selectedWeek}
            selectedDay={selectedDay}
            onChangeWeek={setSelectedWeek}
            onChangeDay={setSelectedDay}
        />
    );
}