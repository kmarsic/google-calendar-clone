/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { focusDate, setDate, setFocusDate } from "../../../../redux/features/dateSlicer";
import { useContext } from "react";
import { EventChangeContext, TimeContext, FocusContext } from "../../../Forms/formContext";

export function MiniFormDay({date, iterator, previous, next, isToday}) {
    const focus = useSelector(focusDate);
    const dispatch = useDispatch();

    const formTime = useContext(TimeContext);
    const dispatchReducer = useContext(EventChangeContext);
    const resetFocus = useContext(FocusContext);

    const handleDateChange = (time, date) => {
        dispatchReducer({type: time, payload: date})
    }


    const parsedDate = Date.parse(date);
    return (
        <div 
        id={parsedDate}
        name={formTime}
        onClick={() => {handleDateChange(formTime, date); dispatch(setFocusDate(parsedDate)); dispatch(setDate(parsedDate)); resetFocus(false) }}
        className="mini-box">
            <div className={`${isToday ? "day-index-mini mini-today" : "day-index-mini"} ${parsedDate == focus ? "focused-date" : null} ${previous || next ? "empty" : null}`}><span>{iterator}</span></div>
        </div>
    )
}