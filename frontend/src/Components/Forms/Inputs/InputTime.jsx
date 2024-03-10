/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { MiniCalendarForm } from "../../CalendarViews/MonthView/mini/MiniCalendarForm";
import { EventDataContext } from "../formContext";

export const FocusContext = createContext(null);

export function InputTimeStart() {
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
                style={{ width: formData.startTime.length + 1 + "ch"}}
                data-type="time"
                value={formData.startTime}
                name="startTime"
                data-name="startTime"
                onFocus={() => setCalendarvisible(true)}/>
        <FocusContext.Provider value={setCalendarvisible}>{calendarVisible ? <MiniCalendarForm/> : null}</FocusContext.Provider>
        </span>
    )

}

export function InputTimeEnd() {
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
                style={{width: formData.endTime.length + 1 + "ch"}}
                value={formData.endTime}
                name="endTime"
                data-name="endTime"
                onFocus={() => setCalendarvisible(true)}/>
        <FocusContext.Provider value={setCalendarvisible}>{calendarVisible ? <MiniCalendarForm/> : null}</FocusContext.Provider>
        </span>
    )
}