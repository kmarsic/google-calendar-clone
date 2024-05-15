import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { NotificationDropdown } from "./NotificationDropdown";
import { NotificationModal } from "./NotificationModal";

export function InputNotification() {
    const [dropdown, setDropdown] = useState(false);
    const [notification, setNotification] = useState("30 minutes before");
    const [modal, setModal] = useState(false);
    const dropdownRef = useRef(null);

    const handleModal = () => {
        setModal(false);
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

    return (
        <div className="input-shell">
            <div>
                        <span className="dropdown-container" ref={dropdownRef} onClick={() => setDropdown(!dropdown)}>
                            <span>{notification}</span>
                            <FontAwesomeIcon icon={faCaretDown} color="var(--text-body)"/>
                            {dropdown ? <NotificationDropdown setModal={setModal} notification={notification} setNotification={setNotification} setDropdown={handleButtonClick}/> : null}
                        </span>
            </div>
        {modal ? createPortal(<NotificationModal onClose={handleModal}/>, document.body) : null}
        </div>
    )
}