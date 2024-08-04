import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { TypeDropdown } from "./TypeDropdown";
import { useSelector } from "react-redux";
import { formData } from "../../../../../redux/features/formSlicer";

export function NotificationUnitSelect({setState, state}) {
    const [visible, setVisible] = useState(false);
    const form = useSelector(formData);
    const notificationUnit = state.unit;

    const dropdownRef = useRef(null);

    const handleClickOutside = (e) => { if(!dropdownRef.current.contains(e.target)) setVisible(false) }

    useEffect(() => {
        document.addEventListener("mouseup", handleClickOutside);

        return () => {
            document.removeEventListener("mouseup", handleClickOutside);
        };
    }, []);

    const list = () => {
        const duration = form.allDay;
        if (duration) {
            return ["days", "weeks"];
        } else {
            return ["minutes", "hours", "days", "weeks"];
        }
    }

    return(
        <>
        <div ref={dropdownRef} className="notification-modal-option">
            <div className="div-flex padding" style={{gap: "1rem"}} onClick={() => setVisible(!visible)} >
                <div>{notificationUnit}</div>
                {visible ? <FontAwesomeIcon icon={faCaretUp} color="var(--text-body)"/> : <FontAwesomeIcon icon={faCaretDown} color="var(--text-body)"/>}
            </div>
            <span>{visible ? <TypeDropdown setVisible={setVisible} list={list()} setState={setState} variable="unit"/> : null}</span>
        </div>
        </>
    )
}