import { motion } from 'framer-motion';
import { useContext, useState } from 'react';
import { EventDataContext, NotificationChangeContext, NotificationContext } from '../../formContext';
import { createPortal } from 'react-dom';

export function NotificationDropdown({ container, setDropdown, format }) {
    const dispatchReducer = useContext(NotificationChangeContext);
    const notification = useContext(NotificationContext);
    const formData = useContext(EventDataContext);

    const position = container.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const distance = viewportHeight - position.top;
    console.log(position, distance)


    const handleDropdownPosition = () => {
        const viewportHeight = window.innerHeight;
        const topDistance = viewportHeight - position.top;
        const bottomDistance = viewportHeight - position.bottom;
        if (position.top > 500) return topDistance
        else return bottomDistance
    }

    const handleNotificationChange = (option) => {
        if(option === "Custom...") return;

        dispatchReducer({type: "unit", payload: option.unit});
        dispatchReducer({type: "duration", payload: option.duration});
        if (option.time) {
            dispatchReducer({type: "time", payload: option.time});
        } else return;
    }

    const [options, setOptions] = useState([
        { unit: "minutes", duration: "5"},
        { unit: "minutes", duration: "10" },
        { unit: "minutes", duration: "15" },
        { unit: "minutes", duration: "30" },
        { unit: "hours", duration: "1" },
        { unit: "days", duration: "1" },
        { unit: notification.unit, duration: notification.duration, visible: notification.visible },
        "Custom..."
    ]);

    const [allDayOptions, setAllDayOptions] = useState([
        { unit: "days", duration: "0", time: notification.time },
        { unit: "days", duration: "1", time: notification.time },
        { unit: "days", duration: "2", time: notification.time },
        { unit: "weeks", duration: "1", time: notification.time },
        { unit: notification.unit, duration: notification.duration, time: notification.time, visible: notification.visible },
        "Custom..."
    ]);

    const mappedList = () => {
        if (formData.allDay) {
            return allDayOptions;
        } else return options;
    }

    return createPortal(
        <motion.ul 
        className="dropdown notification-dropdown"
        style={{originX:0 , originY: position.Y, bottom: handleDropdownPosition(), left: position.left}}
        initial={{opacity: 0, scale: 0.8}}
        animate={{opacity: 1, scale: 1}}
        transition={{duration: 0.1}}
        exit={{opacity: 0}}
        >
            {mappedList().map((option, index) => {
                if (option.visible === false) {
                    return
                } else return (
                    <li 
                            key={index} 
                            onClick={(e) => {
                                handleNotificationChange(option);
                                setDropdown(e); 
                                option === "Custom..." ? dispatchReducer({type: "modal", payload: true}) : dispatchReducer({type: "modal", payload: false})}} 
                            className={format(notification) === format(option) ? "dropdown-highlight" : null}>
                            {option === "Custom..." ? "Custom..." : format(option)}
                    </li>
                )
            }
            
            )}
        </motion.ul>, document.body
    )
}