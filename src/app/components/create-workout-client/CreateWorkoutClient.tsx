"use client"

import { useEffect, useState } from "react";
import WeekDayDropDown from "../week-day-dropdown/WeekDayDropDown";

// import { saveSelection } from "@/lib/actions";

export default function CreateWorkoutClient() {
    const [selectedWeek, setSelectedWeek] = useState("none");
    const [selectedDay, setSelectedDay] = useState("none");
    const [hasSaved, setHasSaved] = useState(false);


useEffect(() => {
    // if (selectedWeek !== "none" && selectedDay !== "none" && !hasSaved) {
    //     saveSelection(selectedWeek, selectedDay).then((ok: boolean) => {
    //         if (ok) {
    //         console.log("Saved automatically!");
    //         setHasSaved(true);
    //         }
    //     });
    // }
}, [selectedWeek, selectedDay, hasSaved]);

return (
    <WeekDayDropDown
        selectedWeek={selectedWeek}
        selectedDay={selectedDay}
        onChangeWeek={(val: string) => {
            setSelectedWeek(val);
            setHasSaved(false);
        }}
        onChangeDay={(val: string) => {
            setSelectedDay(val);
            setHasSaved(false);
        }}
    />
)
}