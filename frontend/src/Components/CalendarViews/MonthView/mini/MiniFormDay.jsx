/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { focusDate } from "../../../../redux/features/dateSlicer";
import { useContext } from "react";
import { EventChangeContext, TimeContext } from "../../../Forms/formContext";

export function MiniFormDay({date, iterator, previous, next, isToday}) {
    const formTime = useContext(TimeContext);
    const dispatchReducer = useContext(EventChangeContext);
    const handleDateChange = (time, date) => {
        dispatchReducer({type: time, payload: new Date(date)})
    }
    const parsedDate = Date.parse(date);

    const focus = useSelector(focusDate);
    return (
        <div 
        id={parsedDate}
        name={formTime}
        onClick={() => handleDateChange(formTime, parsedDate)}
        className="mini-box">
            <div className={`${isToday ? "day-index-mini mini-today" : "day-index-mini"} ${parsedDate == focus ? "focused-date" : null} ${previous || next ? "empty" : null}`}><span>{iterator}</span></div>
        </div>
    )
}