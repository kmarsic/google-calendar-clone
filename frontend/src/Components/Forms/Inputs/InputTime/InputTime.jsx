/* eslint-disable react/prop-types */
import { InputTimeStart } from "./InputTimeStart";
import { InputTimeEnd } from "./InputTimeEnd";
import { useRef, useState, useEffect, useContext } from "react";
import { RepeatDropdown } from "./RepeatDropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { TimeFrame } from "./TimeFrame";
import { EventChangeContext, EventDataContext } from "../../formContext";
import { RepeatModal } from "./RepeatModal/RepeatModal";

export const InputTime = () => {
    const [repeat, setRepeat] = useState("Does not repeat");
    const [repeatModal, setRepeatModal] = useState(true);
    const [dropdown, setDropdown] = useState(false);
    const dropdownRef = useRef(null);

    const dispatchReducer = useContext(EventChangeContext);
    const formData = useContext(EventDataContext);
    const time = formData.allDay;


    const handleTimeChange = (value) => {
        dispatchReducer({type: "allDay", payload: value})
    }

    useEffect(() => {
        const checkbox = document.getElementById("time-checkbox");
        if (time === true) {
            checkbox.checked = true;
        } else checkbox.checked = false;
    }, [time])

        return (
        <div className="input-shell">
            <div>
                    <div className="div-flex">
                            <InputTimeStart/>
                            {time ? <InputTimeEnd/> : <TimeFrame/>}
                    </div>
                    <div>
                        <div className="all-day">
                            <input type="checkbox" id="time-checkbox" onChange={() => handleTimeChange(!time)}/>
                            <span>All Day</span>
                        </div>
                        <span className="dropdown-container repeat-dropdown-container" ref={dropdownRef} onClick={() => setDropdown(!dropdown)}>
                            <span>{repeat}</span>
                            <FontAwesomeIcon icon={faCaretDown} color="var(--text-body)"/>
                            {dropdown ? <RepeatDropdown repeat={repeat} setRepeat={setRepeat} setDropdown={setDropdown} container={dropdownRef}/> : null}
                        </span>
                    </div>
            </div>
            {repeatModal ? <RepeatModal/> : null}
        </div>
    )
}



