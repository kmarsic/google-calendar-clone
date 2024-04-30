import { useContext, useRef, useState, useEffect } from "react"
import { EventChangeContext, EventDataContext } from "../../formContext";
import { TimeFrameDropdown } from "./TimeFrameDropdown";
import { quarterRound } from "../../../../Fncs/Form/quarterRound";
import { hourTimeFormat } from "../../../../Fncs/Form/timeFormat";

export function TimeFrame() {
    return (
        <>
        <StartTimeFrame/>
        <EndTimeFrame/>
        </>
    )
}

export function StartTimeFrame() {
    const formData = useContext(EventDataContext);
    const [visible, setVisible] = useState(false);
    const dropdownRef = useRef(null);

    const time = new Date(formData.startTime);
    const roundedMinutes = quarterRound(time.getMinutes());

    const date = new Date(formData.startDate)
    const times = [];
    for (let i = 0; i < 24; i++) {
        for (let j = 0; j <= 3; j++) {
            const newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), i, j*15)
            times.push(newDate)
        }
    }

    const handleClickOutside = (e) => { if(!dropdownRef.current.contains(e.target)) setVisible(false) }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <span className="bottom-border-animate">
            <span className="text-input" onClick={() => setVisible(true)}>{hourTimeFormat(time)}</span>
            <span ref={dropdownRef}>{visible ? <TimeFrameDropdown time="startTime" setVisible={setVisible} times={times}/> : null}</span>
        </span>
    )
}

export function EndTimeFrame() {
    const formData = useContext(EventDataContext);
    const [visible, setVisible] = useState(false);
    const dropdownRef = useRef(null);

    const time = new Date(formData.endTime);
    const roundedMinutes = quarterRound(time.getMinutes());

    const times = [];
    const date = new Date(formData.startDate);

    for (let i = 0; i < 24; i++) {
        for (let j = 0; j <= 3; j++) {
            const newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.getHours() + i, roundedMinutes + j*15)
            times.push(newDate)
        }
    }

    const handleClickOutside = (e) => { if(!dropdownRef.current.contains(e.target)) setVisible(false) }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <>
        <span>&#8212;</span>
        <span className="bottom-border-animate">
            <span className="text-input" onClick={() => setVisible(true)}>{hourTimeFormat(time)}</span>
            <span ref={dropdownRef}>{visible ? <TimeFrameDropdown time="endTime" setVisible={setVisible} times={times}/> : null}</span>
        </span>
        </>
    )
}
