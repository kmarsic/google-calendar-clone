/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { MiniViewEmbed } from "../../CalendarViews/MonthView/mini/MiniViewEmbed";
import { FormDataContext } from "../formContext";

export function InputTimeStart({inputWidth}) {
    const formData = useContext(FormDataContext);
    const [calendarVisible, setCalendarvisible] = useState(false);
    return (
        <span className="bottom-border-animate">
            <input
                className="text-input"
                autoFocus
                data-type="time"
                style={{width: inputWidth + "px"}}
                value={formData.startTime}
                name="startTime"
                data-name="startTime"
                onFocus={() => setCalendarvisible(true)}
                onBlur={() => setCalendarvisible(false)}/>
        {calendarVisible ? <MiniViewEmbed form={true} embed={true}/> : null}
        </span>
    )

}

export function InputTimeEnd({inputWidth}) {
    const [calendarVisible, setCalendarvisible] = useState(false);
    const formData = useContext(FormDataContext);
    return (
        <span className="bottom-border-animate">
            <input
                className="text-input"
                autoFocus
                data-type="time"
                style={{width: inputWidth + "px"}}
                value={formData.endTime}
                name="endTime"
                data-name="endTime"
                onFocus={() => setCalendarvisible(true)}
                onBlur={() => setCalendarvisible(false)}/>
        {calendarVisible ? <MiniViewEmbed form={true} embed={true}/> : null}
        </span>
    )
}