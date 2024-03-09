/* eslint-disable react/prop-types */
import { useContext, useEffect, useRef, useState } from "react";
import { MiniCalendarForm } from "../../CalendarViews/MonthView/mini/MiniCalendarForm";
import { EventDataContext } from "../formContext";

export function InputTimeStart({inputWidth}) {
    const ref = useRef(null);
    const formData = useContext(EventDataContext);
    const [calendarVisible, setCalendarvisible] = useState(false);

    const handleClickOutside = (e) => {
        if (!ref.current.contains(e.target)) {
            setCalendarvisible(false);
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown",handleClickOutside)
        }
    }, [])
    return (
        <span className="bottom-border-animate" ref={ref}>
            <input
                className="text-input"
                autoFocus
                data-type="time"
                style={{width: inputWidth + "px"}}
                value={formData.startTime}
                name="startTime"
                data-name="startTime"
                onFocus={() => setCalendarvisible(true)}/>
        {calendarVisible ? <MiniCalendarForm/> : null}
        </span>
    )

}

export function InputTimeEnd({inputWidth}) {
    const ref = useRef(null);
    const [calendarVisible, setCalendarvisible] = useState(false);
    const formData = useContext(EventDataContext);

    const handleClickOutside = (e) => {
        if (!ref.current.contains(e.target)) {
            setCalendarvisible(false);
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown",handleClickOutside)
        }
    }, [])
    return (
        <span className="bottom-border-animate" ref={ref}>
            <input
                className="text-input"
                autoFocus
                data-type="time"
                style={{width: inputWidth + "px"}}
                value={formData.endTime}
                name="endTime"
                data-name="endTime"
                onFocus={() => setCalendarvisible(true)}/>
        {calendarVisible ? <MiniCalendarForm/> : null}
        </span>
    )
}