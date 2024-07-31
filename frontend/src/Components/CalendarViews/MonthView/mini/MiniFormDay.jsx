/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { focusDate, setDate, setFocusDate } from "../../../../redux/features/dateSlicer";
import { useContext } from "react";
import { TimeContext, FocusContext } from "../../../Forms/formContext";
import { handleFormInputs } from "../../../../redux/features/formSlicer";

export function MiniFormDay({date, iterator, previous, next, isToday}) {
    const focus = useSelector(focusDate);
    const dispatch = useDispatch();

    const formTime = useContext(TimeContext);
    const resetFocus = useContext(FocusContext);
    const parsedDate = Date.parse(date);

    const handleDateChange = (time, date) => {
        dispatch(handleFormInputs([time, date]))
    }

    return (
        <div
        name={formTime}
        onClick={() => {handleDateChange(formTime, parsedDate); dispatch(setFocusDate(parsedDate)); dispatch(setDate(parsedDate)); resetFocus(false) }}
        className="mini-box">
            <div className={`${isToday ? "day-index-mini mini-today" : "day-index-mini"} ${parsedDate == focus ? "focused-date" : ""} ${previous || next ? "empty" : ""}`}><span>{iterator}</span></div>
        </div>
    )
}