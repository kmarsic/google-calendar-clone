import { useSelector } from "react-redux"
import { currentDate } from "../../../redux/features/dateSlicer"
import { WeekDays } from "./WeekDays";
import { DaytimeGrid } from "../DaytimeGrid";

export function WeekView() {
    const mainDate = new Date(useSelector(currentDate))

    const showWeekGrid = () => {
        const grid = [];
        for (let i = 0; i <= 6; i++) {
            grid.push(
                <DaytimeGrid/>
            )
        }
        return grid;
    }

    const showWeekDays = () => {
        const weekDays = [];
        for (let i = 0; i <= 6; i++) {
            const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
            const year = mainDate.getFullYear();
            const currentMonth = mainDate.getMonth();
            const firstDay = (mainDate.getDate() - mainDate.getDay()) + i;
            const isToday = true;
            const currentDate = new Date(year, currentMonth, firstDay)
            weekDays.push(
                <WeekDays
                key={"wv"+i}
                date={currentDate}
                day={dayNames[i]}
                today={isToday}
                />
            )
        }
        return weekDays;
    }
    return (
        <div className="week-view">
            <div className="week-nav">{showWeekDays()}</div>
            <div className="week-cal-body">
                <div className="week-cal-grid">
                    {showWeekGrid()}
                </div>
            </div>
        </div>
    )
}