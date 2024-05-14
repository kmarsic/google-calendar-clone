/* eslint-disable react/prop-types */
import { InputTimeStart } from "./InputTimeStart";
import { InputTimeEnd } from "./InputTimeEnd";
import { useRef, useState, useEffect, useContext } from "react";
import { RepeatDropdown } from "./RepeatDropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { TimeFrame } from "./TimeFrame";
import { EventChangeContext, EventDataContext } from "../../formContext";

export const InputTime = () => {
    const [repeat, setRepeat] = useState("Does not repeat");
    const [dropdown, setDropdown] = useState(false);

    const dispatchReducer = useContext(EventChangeContext);
    const formData = useContext(EventDataContext);
    const time = formData.allDay;

    const dropdownRef = useRef(null);

    const handleTimeChange = (value) => {
        dispatchReducer({type: "allDay", payload: value})
    }

    const handleButtonClick = (e) => {
        if (e.target.closest(".repeat-dropdown")) {
            setDropdown(!dropdown);
        }
    };

    const handleClickOutside = (e) => {
        if (!dropdownRef.current.contains(e.target)) {
            setDropdown(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

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
                        <span className="dropdown-container" ref={dropdownRef} onClick={() => setDropdown(!dropdown)}>
                            <span>{repeat}</span>
                            <FontAwesomeIcon icon={faCaretDown} color="var(--text-body)"/>
                            {dropdown ? <RepeatDropdown repeat={repeat} setRepeat={setRepeat} setDropdown={handleButtonClick}/> : null}
                        </span>
                    </div>
            </div>
        </div>
    )
}

