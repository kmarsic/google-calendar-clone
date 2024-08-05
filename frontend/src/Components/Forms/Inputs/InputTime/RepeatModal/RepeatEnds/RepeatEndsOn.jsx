import { useContext, useEffect, useRef, useState } from "react";
import { inputTimeFormatShort } from "../../../../../../Fncs/Form/timeFormat";
import { useSelector } from "react-redux";
import { formData } from "../../../../../../redux/features/formSlicer";
import { MiniCalendarInd } from "../../../../../CalendarViews/MonthView/mini/Independent/MiniCalendarInd";
import { ChangeRepeatDataContext, RepeatDataContext } from "../InputRepeat";

export function RepeatEndsOn({active}) {
    const ref = useRef(null);
    const form = useSelector(formData);

    const dataContext = useContext(RepeatDataContext);
    const setDataContext = useContext(ChangeRepeatDataContext);

    const [calendarVisible, setCalendarvisible] = useState(false);
    const handleClickOutside = (e) => {
        if (!ref.current.contains(e.target)) {
            setCalendarvisible(false);
        }
    }

    const handleClick = () => {
        active === "On" ? setCalendarvisible(true) : null
    }

    const handleDateChange = (date) => {
        setDataContext({type: "date", payload: date})
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
                style={{ width: inputTimeFormatShort(dataContext.repeatEnds.date).length + "ch", backgroundColor: "inherit"}}
                data-type="time"
                value={inputTimeFormatShort(dataContext.repeatEnds.date)}
                name="startDate"
                data-name="startDate"/>
            {calendarVisible ? <MiniCalendarInd date={form.startDate} reducer={handleDateChange}/> : null}
        </span>
        </div>
    )

}