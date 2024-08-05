/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { focusDate, setFocusDate } from "../../../../../redux/features/dateSlicer";

export function MiniFormDayInd({date, iterator, previous, next, isToday, reducer}) {
    const focus = useSelector(focusDate);
    const dispatch = useDispatch();

    const parsedDate = Date.parse(date)

    return (
        <div
        onClick={() => {reducer(date); dispatch(setFocusDate(parsedDate))}}
        className="mini-box">
            <div className={`${isToday ? "day-index-mini mini-today" : "day-index-mini"} ${parsedDate == focus ? "focused-date" : ""} ${previous || next ? "empty" : ""}`}><span>{iterator}</span></div>
        </div>
    )
}