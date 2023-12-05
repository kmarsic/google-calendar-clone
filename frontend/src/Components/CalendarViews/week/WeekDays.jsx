/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setDate } from "../../../redux/features/dateSlicer";
export function WeekDays({date,day,today}) {
    const dispatch = useDispatch();
    return (
        <div className="week-day">
            <div className="week-day-name">{day}</div>
            <Link to='/day'>
                <div onClick={() => dispatch(setDate(Date.parse(date)))} id={Date.parse(date)}className={today ? "week-day-index week-today" : "week-day-index"}>
                    <span>{date.getDate()}</span>
                </div>
            </Link>
        </div>
    )
}