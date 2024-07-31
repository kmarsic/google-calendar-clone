import { useContext, useEffect, useRef, useState } from "react";
import { MiniCalendarForm } from "../../../CalendarViews/MonthView/mini/MiniCalendarForm";
import { EventDataContext, TimeContext, FocusContext } from "../../formContext";
import { inputTimeFormat } from "../../../../Fncs/Form/timeFormat";
import { useSelector } from "react-redux";
import { formData } from "../../../../redux/features/formSlicer";

export function InputTimeEnd() {
    const ref = useRef(null);
    const form = useSelector(formData);

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
        <>
        <span>&#8212;</span>
        <span className="bottom-border-animate" ref={ref}>
            <input
                className="text-input input-time"
                readOnly
                data-type="time"
                style={{width: inputTimeFormat(form.endDate).length + 1 + "ch"}}
                value={inputTimeFormat(form.endDate)}
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