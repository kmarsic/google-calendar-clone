import { useEffect, useRef, useState } from "react";
import { MiniCalendarForm } from "../../../CalendarViews/MonthView/mini/MiniCalendarForm";
import { TimeContext, FocusContext } from "../../formContext";
import { inputTimeFormat } from "../../../../Fncs/Form/timeFormat";
import { useSelector } from "react-redux";
import { formData } from "../../../../redux/features/formSlicer";

export function InputTimeStart() {
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
        <span className="bottom-border-animate" ref={ref}>
            <input
                className="text-input input-time"
                readOnly
                style={{ width: inputTimeFormat(form.startDate).length + 1 + "ch"}}
                data-type="time"
                value={inputTimeFormat(form.startDate)}
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