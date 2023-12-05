import { useSelector } from "react-redux"
import { currentDate } from "../../../redux/features/dateSlicer"
import { WeekDays } from "./WeekDays";
import { DaytimeGrid } from "../DaytimeGrid";

export function WeekView() {
    const mainDate = new Date(useSelector(currentDate))

    const showWeekGrid = () => {
        const grid = [];
        for (let i = 0; i <= 7; i++) {
            grid.push(
                <DaytimeGrid key={"dgr" + i} iterator={i}/>
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

    const navBorderDiv = () => {
        const borders = [];
        for (let i = 0; i <= 6; i++) {
            borders.push(
                <div className="nav-border-div"></div>
            )
        }
        return borders;
    }

    const showTimeFrames = () => {
        const times = [];
        for (let i = 1; i <= 12; i++) {
            times.push(
                <div className="time-frame">
                    <span className="time">{i} AM</span>
                </div>
            )
        }
        for (let i = 1; i <= 11; i++) {
            times.push(
                <div className="time-frame">
                    <span className="time">{i} PM</span>
                </div>
            )
        }
        return times;
    }
    
    return (
        <div className="week-view">
            <div className="week-nav">
                <div className="nav-spacer"></div>
                <div className="nav-grid">
                    {showWeekDays()}
                    {navBorderDiv()}
                </div>
            </div>
            <div className="week-cal-body">
                <div className="time-frames">{showTimeFrames()}</div>
                <div className="week-cal-grid">
                    {showWeekGrid()}
                </div>
            </div>
        </div>
    )
}