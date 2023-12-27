/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setDate, setView } from "../../../redux/features/dateSlicer";
export function WeekDays({date,day}) {
    const dispatch = useDispatch();
    const newDate = new Date(date);
    const todayDate = new Date();
    let isToday = false;
    if (todayDate.getMonth() == newDate.getMonth() && todayDate.getFullYear() == newDate.getFullYear() && todayDate.getDate() == newDate.getDate()){
        isToday = true;
    }
    return (
        <div className="week-day">
            <div className={isToday ? "week-day-name wname-today" : "week-day-name"}>{day}</div>
            <Link to='/Day'>
                <div onClick={() => {dispatch(setDate(Date.parse(date))); dispatch(setView("Day"))}} id={Date.parse(date)} className={isToday ? "week-day-index windex-today" : "week-day-index"}>
                    <span>{date.getDate()}</span>
                </div>
            </Link>
        </div>
    )
}