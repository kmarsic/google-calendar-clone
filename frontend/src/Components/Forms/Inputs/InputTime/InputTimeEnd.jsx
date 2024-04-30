import { useContext, useEffect, useRef, useState } from "react";
import { MiniCalendarForm } from "../../../CalendarViews/MonthView/mini/MiniCalendarForm";
import { EventDataContext, TimeContext, FocusContext } from "../../formContext";
import { inputTimeFormat } from "../../../../Fncs/Form/timeFormat";

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
        <>
        <span>&#8212;</span>
        <span className="bottom-border-animate" ref={ref}>
            <input
                className="text-input input-time"
                readOnly
                data-type="time"
                style={{width: inputTimeFormat(formData.endDate).length + 1 + "ch"}}
                value={inputTimeFormat(formData.endDate)}
                name="endDate"
                data-name="endDate"
                onFocus={() => setCalendarvisible(true)}/>
        <FocusContext.Provider value={setCalendarvisible}>
            <TimeContext.Provider value="endDate">
                {calendarVisible ? <MiniCalendarForm/> : null}
            </TimeContext.Provider>
        </FocusContext.Provider>
        </span>
        </>
    )
}