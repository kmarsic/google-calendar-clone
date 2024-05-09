import { motion } from 'framer-motion';
import { useState } from 'react';

export function NotificationDropdown({ setModal, notification,setNotification, setDropdown }) {
    const [options, setOptions] = useState([
        "5 minutes before",
        "10 minutes before",
        "15 minutes before",
        "30 minutes before",
        "1 hour before",
        "1 day before",
        "Custom..."
    ]);

    return (
        <motion.ul 
        className="dropdown notification-dropdown"
        style={{originX:0 , originY: 0}}
        initial={{opacity: 0, scale: 0.8}}
        animate={{opacity: 1, scale: 1}}
        transition={{duration: 0.1}}
        exit={{opacity: 0}}
        >
            {options.map((option, index) => 
            <li key={index} onClick={(e) => {setNotification(option);setDropdown(e); option === "Custom..." ? setModal(true) : setModal(false) }} className={notification === option ? "dropdown-highlight" : null} >{option}</li>
            )}
        </motion.ul>
    )
}