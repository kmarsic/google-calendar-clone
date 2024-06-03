import { useContext, useEffect, useRef, useState } from "react";
import { EventDataContext, NotificationContext } from "../../../formContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { hourTimeFormat } from "../../../../../Fncs/Form/timeFormat";
import { TimeFrameDropdown } from "../../InputTime/TimeFrameDropdown";

export function NotificationTimeSelect({dispatchReducer, state}) {
    const [visible, setVisible] = useState(false);

    const formData = useContext(EventDataContext);

    const date = new Date(formData.startDate);
    const time = new Date(state.time)

    const dropdownRef = useRef(null);

    const handleClickOutside = (e) => { if(!dropdownRef.current.contains(e.target)) setVisible(false) }

    useEffect(() => {
        document.addEventListener("mouseup", handleClickOutside);

        return () => {
            document.removeEventListener("mouseup", handleClickOutside);
        };
    }, []);

    const times = [];
    for (let i = 0; i < 24; i++) {
        for (let j = 0; j <= 3; j++) {
            const newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), i, j*15)
            times.push(newDate)
        }
    }

    return(
        <>
        <div className="modal-option">before at</div>
        <div ref={dropdownRef} className="notification-modal-option">
            <div className="div-flex padding" style={{gap: "1rem"}} onClick={() => setVisible(!visible)} >
                <div>{hourTimeFormat(time)}</div>
                {visible ? <FontAwesomeIcon icon={faCaretUp} color="var(--text-body)"/> : <FontAwesomeIcon icon={faCaretDown} color="var(--text-body)"/>}
            </div>
            <span>{visible ? <TimeFrameDropdown times={times} setVisible={setVisible} time={"time"} reducer={dispatchReducer}/> : null}</span>
        </div>
        </>
    )
}
