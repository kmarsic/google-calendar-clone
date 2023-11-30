/* eslint-disable react/prop-types */

import { useDispatch } from "react-redux";
import { setDate } from "../../../redux/features/dateSlicer";

export function MiniDay({date, iterator, previous, next, isToday}) {
    const parsedDate = Date.parse(date);
    const dispatch = useDispatch();
    return (
        <div 
        id={parsedDate}
        onClick={() => dispatch(setDate(parsedDate))}
        className={previous || next ? "mini-box empty" : "mini-box"}>
            <div className={isToday ? "day-index-mini mini-today" : "day-index-mini"}><span>{iterator}</span></div>
        </div>
    )
}