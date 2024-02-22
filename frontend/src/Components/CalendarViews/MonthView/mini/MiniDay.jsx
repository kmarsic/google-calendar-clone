/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { focusDate, setDate, setFocusDate } from "../../../../redux/features/dateSlicer";

export function MiniDay({date, iterator, previous, next, isToday}) {
    const parsedDate = Date.parse(date);
    const dispatch = useDispatch()
    const focus = useSelector(focusDate);
    return (
        <div 
        id={parsedDate}
        onClick={() => {dispatch(setDate(parsedDate)); dispatch(setFocusDate(parsedDate))}}
        className="mini-box">
            <div className={`${isToday ? "day-index-mini mini-today" : "day-index-mini"} ${parsedDate == focus ? "focused-date" : null} ${previous || next ? "empty" : null}`}><span>{iterator}</span></div>
        </div>
    )
}