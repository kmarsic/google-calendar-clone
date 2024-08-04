import { motion } from 'framer-motion';
import { useContext, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useSelector } from 'react-redux';
import { formData } from '../../../../redux/features/formSlicer';
import { NotificationChangeContext } from '../../formContext';

export function NotificationDropdown({ container, format, setNotification, currentNotification, list }) {
    const form = useSelector(formData);
    const dispatchReducer = useContext(NotificationChangeContext);
    const dropdownRef = useRef(null);

    const position = container.current.getBoundingClientRect();
    const calendarMain = document.querySelector(".calendar-main").getBoundingClientRect();

    const handleDropdownPositionTop = () => {
        const bottomDistance = position.bottom - calendarMain.top + 65;
        if (position.top > 500) return null
        else return bottomDistance
    } 

    const handleDropdownPositionBottom = () => {
        const topDistance = calendarMain.bottom - position.top;
        if (position.top > 500) return topDistance
        else return null
    }

    const handleNotificationChange = (option) => {
        if(option === "Custom...") return;
        setNotification((prev) => ({
            ...prev,
            unit: option.unit,
            duration: option.duration,
            time: option.time,
        }));
    }

    const handleClickOutside = (e) => {
        if (!container.current.contains(e.target) && !dropdownRef.current.contains(e.target)) {
            dispatchReducer({ type: "dropdown", payload: false });
        }
      };
    
      useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
    
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, []);


    function setArrayOrder() {
        const baseMinuteUnit = 60000;
        list.sort((a, b) => {
            if (a === "Custom" || b === "Custom") return;
            const hoursA = new Date(a.time).getHours() * baseMinuteUnit * 60;
            const minutesA = new Date(a.time).getMinutes() * baseMinuteUnit;
            const hoursB = new Date(b.time).getHours() * baseMinuteUnit * 60;
            const minutesB = new Date(b.time).getMinutes() * baseMinuteUnit;
            const multiplierA = getMultiplier(a.unit);
            const multiplierB = getMultiplier(b.unit);
            const sizeA = multiplierA * baseMinuteUnit * a.duration + hoursA + minutesA
            const sizeB = multiplierB * baseMinuteUnit * b.duration + hoursB + minutesB
            return sizeA - sizeB;
        });
        return list;
    }

    return createPortal(
        <motion.ul 
        className="dropdown notification-dropdown"
        ref={dropdownRef}
        style={{originX:0 , originY: position.Y, bottom: handleDropdownPositionBottom(), left: position.left, top: handleDropdownPositionTop()}}
        initial={{opacity: 0, scale: 0.8}}
        animate={{opacity: 1, scale: 1}}
        transition={{duration: 0.1}}
        exit={{opacity: 0}}
        >
            {setArrayOrder().map((option, index) => {
                if (option.visible === false) {
                    return
                } else return (
                    <li 
                            key={index} 
                            onClick={(e) => {
                                handleNotificationChange(option);
                                option === "Custom..." ? dispatchReducer({type: "modal", payload: true}) : dispatchReducer({type: "modal", payload: false});
                                dispatchReducer({ type: "dropdown", payload: false });
                            }} 
                            className={format(currentNotification, form) === format(option, form) ? "dropdown-highlight" : null}>
                            {option === "Custom..." ? "Custom..." : format(option, form)}
                    </li>
                )
            }
            
            )}
        </motion.ul>, document.body
    )
}

function getMultiplier(unit) {
    switch (unit) {
        case "minutes": return 1;
        case "hours": return 60;
        case "days": return 60 * 24;
        case "weeks": return 60 * 24 * 7;
        default: return 1;
    }
}