import { useContext, useEffect, useRef, useState } from "react";
import { MiniCalendarForm } from "../../../CalendarViews/MonthView/mini/MiniCalendarForm";
import { EventDataContext, TimeContext, FocusContext } from "../../formContext";
import { inputTimeFormat } from "../../../../Fncs/timeFormat";

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
                className="text-input input-time"
                readOnly
                data-type="time"
                style={{width: inputTimeFormat(formData.endTime).length + 1 + "ch"}}
                value={inputTimeFormat(formData.endTime)}
                name="endTime"
                data-name="endTime"
                onFocus={() => setCalendarvisible(true)}/>
        <FocusContext.Provider value={setCalendarvisible}>
            <TimeContext.Provider value="endTime">
                {calendarVisible ? <MiniCalendarForm/> : null}
            </TimeContext.Provider>
        </FocusContext.Provider>
        </span>
    )
}