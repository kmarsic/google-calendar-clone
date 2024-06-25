import { clickVariant } from "../../Fncs/framerVariants";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { useState, useRef, useEffect } from "react";
import { ViewDropdown } from "./ViewDropdown";
import { useSelector } from "react-redux";
import { currentView } from "../../redux/features/dateSlicer";

export function NavView() {
    const dropdownRef = useRef(null);
    const view = useSelector(currentView);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    const handleButtonClick = (e) => {
        if (e.target.closest(".view-dropdown-container")) {
            setIsDropdownVisible(!isDropdownVisible);
        }
    };

    const handleClickOutside = (e) => {
        if (!dropdownRef.current.contains(e.target)) {
            setIsDropdownVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="menu-right">
            <div className="menu-item">
                <FontAwesomeIcon icon={faSearch} size="xl" />
            </div>
            <motion.div
                onClick={(e) => handleButtonClick(e)}
                className="view-dropdown-container"
                ref={dropdownRef}
                variants={clickVariant}
                whileTap={"one"}
            >
                <span>{view}</span>
                    <AnimatePresence>
                        {isDropdownVisible && <ViewDropdown/>}
                    </AnimatePresence>
                <FontAwesomeIcon icon={faCaretDown} size="2xs" />
            </motion.div>
        </div>
    );
}
