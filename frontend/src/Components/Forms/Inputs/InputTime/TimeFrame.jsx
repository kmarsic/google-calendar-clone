import { useContext, useRef, useState, useEffect } from "react"
import { EventChangeContext, EventDataContext } from "../../formContext";
import { TimeFrameDropdown } from "./TimeFrameDropdown";
import { quarterRound } from "../../../../Fncs/Form/quarterRound";
import { hourTimeFormat } from "../../../../Fncs/Form/timeFormat";
import { useDispatch, useSelector } from "react-redux";
import { formData, handleFormInputs } from "../../../../redux/features/formSlicer";

export function TimeFrame() {
    return (
        <>
        <StartTimeFrame/>
        <EndTimeFrame/>
        </>
    )
}

export function StartTimeFrame() {
    const form = useSelector(formData)
    const dispatch = useDispatch();

    const handleChange = (type, payload) => {
        dispatch(handleFormInputs([type,payload]))
    }

    const [visible, setVisible] = useState(false);
    const dropdownRef = useRef(null);

    const time = new Date(form.startTime);
    const date = new Date(form.startDate)
    
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
            <input style={{width: "10ch", textAlign: "center"}} className="text-input" onClick={() => setVisible(true)} value={hourTimeFormat(time)}/>
            <span ref={dropdownRef}>{visible ? <TimeFrameDropdown time="startTime" setVisible={setVisible} times={times} reducer={handleChange}/> : null}</span>
        </span>
    )
}

export function EndTimeFrame() {
    const form = useSelector(formData)
    const dispatch = useDispatch();

    const handleChange = (type, payload) => {
        dispatch(handleFormInputs([type,payload]))
    }

    const [visible, setVisible] = useState(false);
    const dropdownRef = useRef(null);
    console.log()
    const startTime = new Date(form.startTime);
    const endTime = new Date(form.endTime);
    const roundedMinutes = quarterRound(startTime.getMinutes());

    const times = [];

    for (let i = 0; i < 24; i++) {
        for (let j = 0; j <= 3; j++) {
            const newDate = new Date(startTime.getFullYear(), startTime.getMonth(), startTime.getDate(), startTime.getHours() + i, roundedMinutes + j*15)
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
        <input style={{width: "10ch", textAlign: "center"}} className="text-input" onClick={() => setVisible(true)} value={hourTimeFormat(endTime)}/>
            <span ref={dropdownRef}>{visible ? <TimeFrameDropdown time="endTime" setVisible={setVisible} times={times} reducer={handleChange}/> : null}</span>
        </span>
        </>
    )
}
