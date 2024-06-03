import { motion } from 'framer-motion';
import { useContext, useEffect, useState } from 'react';
import { EventDataContext, NotificationChangeContext, NotificationContext } from '../../formContext';
import { createPortal } from 'react-dom';

export function NotificationDropdown({ container, setDropdown, format, setNotification, currentNotification }) {
    const dispatchReducer = useContext(NotificationChangeContext);
    const notification = useContext(NotificationContext);
    const formData = useContext(EventDataContext);

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
        }))
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
        { unit: "days", duration: "0", time: formData.startDate + 60000 * 60 * 9 },
        { unit: "days", duration: "1", time: formData.startDate + 60000 * 60 * 9 },
        { unit: "days", duration: "2", time: formData.startDate + 60000 * 60 * 9 },
        { unit: "weeks", duration: "1", time: formData.startDate + 60000 * 60 * 9 },
        { unit: notification.unit, duration: notification.duration, time: notification.time, visible: notification.visible },
        "Custom..."
    ]);

    const mappedList = () => {
        if (formData.allDay) {
            return allDayOptions;
        } else return options;
    }

    function setArrayOrder() {
        const list = mappedList();
        const baseMinuteUnit = 60000;
        let multiplierA = 1;
        let multiplierB = 1;
        list.sort((a,b) => {
            switch(a.unit) {
                case "minutes": multiplierA = 1;
                break;
                case "hours": multiplierA = 60;
                break;
                case "days": multiplierA = 60*24;
                break;
                case "weeks": multiplierA = 60*24*7;
                break;
            }
            switch(b.unit) {
                case "minutes": multiplierB = 1;
                break;
                case "hours": multiplierB = 60;
                break;
                case "days": multiplierB = 60*24;
                break;
                case "weeks": multiplierB = 60*24*7;
                break;
            }

            const sizeA = multiplierA * baseMinuteUnit * a.duration + a.time;
            const sizeB = multiplierB * baseMinuteUnit * b.duration + b.time;
            return sizeA - sizeB;
        });
        return list
    }

    useEffect(() => {
        
    }, [])

    return createPortal(
        <motion.ul 
        className="dropdown notification-dropdown"
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
                                setDropdown(e); 
                                option === "Custom..." ? dispatchReducer({type: "modal", payload: true}) : dispatchReducer({type: "modal", payload: false})}} 
                            className={format(currentNotification) === format(option) ? "dropdown-highlight" : null}>
                            {option === "Custom..." ? "Custom..." : format(option)}
                    </li>
                )
            }
            
            )}
        </motion.ul>, document.body
    )
}