import { useContext, useEffect, useRef, useState } from "react";
import { MiniCalendarForm } from "../../../CalendarViews/MonthView/mini/MiniCalendarForm";
import { EventDataContext, TimeContext, FocusContext } from "../../formContext";
import { inputTimeFormat } from "../../../../Fncs/timeFormat";

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
                className="text-input input-time"
                autoFocus
                readOnly
                style={{ width: inputTimeFormat(formData.startDate).length + 1 + "ch"}}
                data-type="time"
                value={inputTimeFormat(formData.startDate)}
                name="startDate"
                data-name="startDate"
                onFocus={() => setCalendarvisible(true)}/>
        <FocusContext.Provider value={setCalendarvisible}>
            <TimeContext.Provider value="startDate">
                {calendarVisible ? <MiniCalendarForm/> : null}
            </TimeContext.Provider>
        </FocusContext.Provider>
        </span>
    )

}