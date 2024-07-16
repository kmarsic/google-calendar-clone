import { useEffect, useRef, useState } from "react";
import { motion } from 'framer-motion';
import { createPortal } from "react-dom";

export function RepeatDropdown({container, setDropdown, list, setCustomModal, currentOption, setCurrentOption}) {

    const dropdownRef = useRef(null);
    const position = container.current.getBoundingClientRect();
    const calendarMain = document.querySelector(".calendar-main").getBoundingClientRect();

    const [modalPosition, setModalPosition] = useState({
        top: 0,
        left: position.left,
        bottom: 0,
        originY: "bottom"
    })

    useEffect(() => {
        handleDropdownPositionTop();
    }, [])

    const handleDropdownPositionTop = () => {
        const topDistance = calendarMain.bottom - position.top;
        if (position.top > 500) {
            setModalPosition({
                ...modalPosition,
                bottom: topDistance,
                top: null,
                originY: "bottom"
            })
        }
        else {
            setModalPosition({
                ...modalPosition,
                top: position.bottom,
                bottom: null,
                originY: "top"
            })
        }
    } 

    const handleClickOutside = (e) => !container.current.contains(e.target) && !dropdownRef.current.contains(e.target) && setDropdown(false);

    const handleClick = (e,option) => {
        if (option === "Custom...") {
            setCustomModal(true);
        }
        console.log(option)
        setCurrentOption(option);
        setDropdown(e);
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return createPortal(
        <motion.ul 
        className="dropdown repeat-dropdown"
        ref={dropdownRef}
        style={{originX: "left", originY: modalPosition.originY , width: 250, top: modalPosition.top, bottom: modalPosition.bottom, left: modalPosition.left}}
        initial={{opacity: 0, scale: 0.8}}
        animate={{opacity: 1, scale: 1}}
        transition={{duration: 0.1}}
        exit={{opacity: 0}}
        >
            {list.map((option, index) => 
            <li key={index} onClick={(e) => {handleClick(e,option)}}  className={currentOption === option ? "dropdown-highlight" : null}>{option}</li>
            )}
        </motion.ul>, document.body
    ) 
}