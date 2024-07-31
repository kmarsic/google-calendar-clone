/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { currentDate, setDate, setFocusDate, switchView } from "../../../redux/features/dateSlicer";
import { motion } from "framer-motion";
import { calendarVariant } from "../../../Fncs/framerVariants";
import { useEffect, useRef, useState } from "react";
import { ShowCalendarMonth } from "./ShowCalendarMonth";

export function MonthView() {
    const mainDate = new Date(useSelector(currentDate));
    const switches = useSelector(switchView);
    const dispatch = useDispatch();

    const [key, setKey] = useState(mainDate.getMonth());
    const [animationOver, setAnimationOver] = useState(false);
    const scrollTimeoutRef = useRef(null);
    const listenerRef = useRef(null);

    const handleKeyChange = () => {
        if (mainDate.getMonth() != key) {
            setKey(mainDate.getMonth());
        } 
    };

    //Throttle the view change on consecutive scroll inputs
    const handleViewChangeOnScroll = (e) => {
        if (scrollTimeoutRef.current !== null) {
            clearTimeout(scrollTimeoutRef.current);
        }

        scrollTimeoutRef.current = setTimeout(() => {
            if (animationOver) {
                const newDate = new Date(mainDate);
                if (e.deltaY > 0) {
                    newDate.setMonth(newDate.getMonth() + 1);
                } else if (e.deltaY < 0) {
                    newDate.setMonth(newDate.getMonth() - 1);
                }
                dispatch(setDate(Date.parse(newDate)));
                dispatch(setFocusDate(Date.parse(newDate)));
            }
        }, 10);
    };

    useEffect(() => {
        listenerRef.current.addEventListener("wheel", handleViewChangeOnScroll);
    },[mainDate])

    useEffect(() => {
        handleKeyChange();
    }, [mainDate]);

    const showWeekDays = () => {
        let weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
        const list = [];
        for (let i = 0; i <= 6; i++) {
            list.push(
                <div key={`day-${i}`} className="weekDay">
                    {weekDays[i]}
                </div>
            );
        }

        return list;
    };

    return (
        <motion.div
            className="calendar-grid"
            key={key}
            ref={listenerRef}
            variants={calendarVariant}
            initial={switches == "prev" ? "hidden" : "hiddenNext"}
            animate={"visible"}
            onAnimationStart={() => setAnimationOver(false)}
            onAnimationComplete={() => setAnimationOver(true)}
            onAnimationEnd={() => console.log("end")}
            exit={"exit"}
        >
            <div className="weekDay-container">{showWeekDays()}</div>
            <ShowCalendarMonth date={mainDate}/>
        </motion.div>
    );
}