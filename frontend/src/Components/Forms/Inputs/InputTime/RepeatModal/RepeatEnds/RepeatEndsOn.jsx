import { useEffect, useRef, useState } from "react";
import { TimeContext } from "../../../../formContext";
import { MiniCalendarForm } from "../../../../../CalendarViews/MonthView/mini/MiniCalendarForm";
import { inputTimeFormatShort } from "../../../../../../Fncs/Form/timeFormat";
import { useSelector } from "react-redux";
import { formData } from "../../../../../../redux/features/formSlicer";

export function RepeatEndsOn({active}) {
    const ref = useRef(null);
    const form = useSelector(formData);
    const [calendarVisible, setCalendarvisible] = useState(false);
    const handleClickOutside = (e) => {
        if (!ref.current.contains(e.target)) {
            setCalendarvisible(false);
        }
    }

    const handleClick = () => {
        active === "On" ? setCalendarvisible(true) : null
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown",handleClickOutside)
        }
    }, [])

    return (
        <div 
        className={active === "On" ? "repeat-option" : "repeat-option disabled"}
        onClick={() => handleClick()}
        >
            <span className="bottom-border-animate" ref={ref}>
            <input
                className="repeat-number padding"
                readOnly
                style={{ width: inputTimeFormatShort(form.startDate).length - 1 + "ch", backgroundColor: "inherit"}}
                data-type="time"
                value={inputTimeFormatShort(form.startDate)}
                name="startDate"
                data-name="startDate"/>
            <TimeContext.Provider value="startDate">
                {calendarVisible ? <MiniCalendarForm/> : null}
            </TimeContext.Provider>
        </span>
        </div>
    )

}