/* eslint-disable react/prop-types */
import { InputTimeStart } from "./InputTimeStart";
import { InputTimeEnd } from "./InputTimeEnd";
import { useRef, useState, useEffect } from "react";
import { RepeatDropdown } from "./RepeatDropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { TimeFrame } from "./TimeFrame";

export const InputTime = ({activeTime}) => {
    const [repeat, setRepeat] = useState("Does not repeat");
    const [dropdown, setDropdown] = useState(false);
    const [allDay, setAllDay] = useState(activeTime);

    const dropdownRef = useRef(null);

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
        if (allDay === true) {
            checkbox.checked = true;
        } else checkbox.checked = false;
    }, [allDay])

        return (
        <div className="input-shell">
            <div>
                    <div className="div-flex">
                            <InputTimeStart/>
                            {allDay ? <InputTimeEnd/> : <TimeFrame/>}
                    </div>
                    <div>
                        <div className="all-day">
                            <input type="checkbox" id="time-checkbox" onChange={() => setAllDay(!allDay)}/>
                            <span>All Day</span>
                        </div>
                        <span className="repeat-dropdown-container" ref={dropdownRef} onClick={() => setDropdown(!dropdown)}>
                            <span>{repeat}</span>
                            <FontAwesomeIcon icon={faCaretDown} color="var(--text-body)"/>
                            {dropdown ? <RepeatDropdown repeat={repeat} setRepeat={setRepeat} setDropdown={handleButtonClick}/> : null}
                        </span>
                    </div>
            </div>
        </div>
    )
}

