"use client";
import styles from './weekdaydropdown.module.css';
import { Day, Week } from "@/lib/interfaces";
import { WeekDayDropDownProps } from "@/lib/interfaces";


export default function WeekDayDropDown({
    selectedWeek,
    selectedDay,
    onChangeWeek,
    onChangeDay,
}: WeekDayDropDownProps) {

    const week: Week[] =
        [
            { id: 'weekone', name: 'Week 1' },
            { id: 'weektwo', name: 'Week 2' },
            { id: 'weekthree', name: 'Week 3' },
            { id: 'weekfour', name: 'Week 4' },
            { id: 'weekfive', name: 'Week 5' },
        ]
    const daysOfWeek: Day[] =
        [
            { id: 'dayone', name: 'Day 1' },
            { id: 'daytwo', name: 'Day 2' },
            { id: 'daytree', name: 'Day 3' },
            { id: 'dayfour', name: 'Day 4' },
            { id: 'dayfive', name: 'Day 5' },
        ];

    return (
        <div className={styles.container}>
            <select value={selectedWeek} onChange={(e) => onChangeWeek(e.target.value)} className={styles.selectWeekDay}>
                <option value="none">- - -Select a week- - -</option>
                {week.map((day) => (
                    <option key={day.id} value={day.id}>
                        {day.name}
                    </option>
                ))}
            </select>
            <select value={selectedDay} onChange={(e) => onChangeDay(e.target.value)} className={styles.selectWeekDay}>
                <option value="none">- - -Select a day- - -</option>
                {daysOfWeek.map((day) => (
                    <option key={day.id} value={day.id}>
                        {day.name}
                    </option>
                ))}
            </select>
        </div>
    );
}
