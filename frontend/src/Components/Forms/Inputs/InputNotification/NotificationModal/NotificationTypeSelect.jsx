import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { TypeDropdown } from "./TypeDropdown";

export function NotificationTypeSelect({setState, state}) {
    const [visible, setVisible] = useState(false);

    const dropdownRef = useRef(null);

    const handleClickOutside = (e) => { if(!dropdownRef.current.contains(e.target)) setVisible(false) }

    useEffect(() => {
        document.addEventListener("mouseup", handleClickOutside);

        return () => {
            document.removeEventListener("mouseup", handleClickOutside);
        };
    }, []);

    const list = ["Email", "Notification"];
    return(
        <>
        <div ref={dropdownRef} className="notification-modal-option">
            <div className="div-flex padding" style={{gap: "1rem"}} onClick={() => setVisible(!visible)} >
                <div>{state.type}</div>
                {visible ? <FontAwesomeIcon icon={faCaretUp} color="var(--text-body)"/> : <FontAwesomeIcon icon={faCaretDown} color="var(--text-body)"/>}
            </div>
            <span>{visible ? <TypeDropdown setVisible={setVisible} list={list} variable="type" setState={setState}/> : null}</span>
        </div>
        </>
    )
}