import { useContext, useEffect, useRef, useState } from "react";
import { NotificationContext } from "../../../formContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { TypeDropdown } from "./TypeDropdown";

export function NotificationTypeSelect() {
    const [visible, setVisible] = useState(false);
    const context = useContext(NotificationContext);
    const notificationType = context.type;

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
                <div>{notificationType}</div>
                {visible ? <FontAwesomeIcon icon={faCaretUp} color="var(--text-body)"/> : <FontAwesomeIcon icon={faCaretDown} color="var(--text-body)"/>}
            </div>
            <span>{visible ? <TypeDropdown setVisible={setVisible} list={list} variable="type"/> : null}</span>
        </div>
        </>
    )
}