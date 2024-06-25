/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { clickVariant } from "../../Fncs/framerVariants";
import { useDispatch, useSelector } from "react-redux";
import { currentDate, currentView, handleViewChange, setDate } from "../../redux/features/dateSlicer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { titleTimeFormat } from "../../Fncs/Form/timeFormat";
import { useRef, useState, useEffect } from "react";
import { MiniViewEmbed } from "../CalendarViews/MonthView/mini/MiniViewEmbed";

export function NavDateControl({ burger }) {
    const view = useSelector(currentView);
    const date = new Date(useSelector(currentDate));
    
    const dispatch = useDispatch();
    const calendarRef = useRef(null);

    const [isCalVisible, setIsCalVisible] = useState(false);

    const handleButtonClick = (e) => {
        if (e.target.closest(".current-date")) {
            if (burger) return;
            setIsCalVisible(true);
        }
    };

    const handleClickOutside = (e) => {
        if (!calendarRef.current.contains(e.target)) {
            setIsCalVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="menu-left">
            <div className="date-switch">
                <motion.div
                    onClick={() => dispatch(setDate(Date.parse(new Date())))}
                    className="btn-header"
                    variants={clickVariant}
                    initial={{ backgroundSize: "10px" }}
                    whileTap={"click"}
                    whileHover={"hover"}
                >
                    <span>Today</span>
                </motion.div>
                <div className="switches">
                    <div
                        className="menu-item btn-effect"
                        onClick={() => dispatch(handleViewChange("prev"))}
                    >
                        <FontAwesomeIcon
                            icon={faAngleLeft}
                            style={{ color: "#3c4043" }}
                            size="xl"
                        ></FontAwesomeIcon>
                    </div>
                    <div
                        className="menu-item btn-effect"
                        onClick={() => dispatch(handleViewChange("next"))}
                    >
                        <FontAwesomeIcon
                            icon={faAngleRight}
                            style={{ color: "#3c4043" }}
                            size="xl"
                        ></FontAwesomeIcon>
                    </div>
                </div>
            </div>
            <div
                        className="current-date"
                        ref={calendarRef}
                        onClick={handleButtonClick}
                    >
                        {titleTimeFormat(view, date)}
                        {burger ? null : (
                            <FontAwesomeIcon
                                icon={faCaretDown}
                                size="2xs"
                                style={{ color: "rgba(0, 0, 0, 0.4)" }}
                            />
                        )}
                        {isCalVisible ? <MiniViewEmbed embed={true} /> : null}
                    </div>
        </div>
    );
}
