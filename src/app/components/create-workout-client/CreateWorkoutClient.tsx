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

    return (
        <WeekDayDropDown
            selectedWeek={selectedWeek}
            selectedDay={selectedDay}
            onChangeWeek={setSelectedWeek}
            onChangeDay={setSelectedDay}
        />
    );
}