/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { currentDate, setView, switchView } from "../../../redux/features/dateSlicer";
import { MonthDay } from "./MonthDay";
import { motion } from "framer-motion";
import { calendarVariant } from "../../../Fncs/framerVariants";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export function MonthView() {
    const mainDate = new Date(useSelector(currentDate));
    const switches = useSelector(switchView);
    const dispatch = useDispatch();
    const location = useLocation();

    const [key, setKey] = useState(mainDate.getMonth());

    const handleKeyChange = () => {
        if (mainDate.getMonth() != key) {
            setKey(mainDate.getMonth());
        }
    };

    useEffect(() => {
        handleKeyChange();
    }, [mainDate]);

    useEffect(() => {
        dispatch(setView(location.pathname.substring(1)))
    }, [])

    const findMonthDays = (y, m) => {
        return new Date(y, m + 1, 0).getDate();
    };

    const findFirstDay = (y, m) => {
        return new Date(y, m, 1).getDay();
    };

    const gridRule = () => {
        const month = mainDate.getMonth();
        const year = mainDate.getFullYear();
        if (
            findFirstDay(year, month) == 5 &&
            findMonthDays(year, month) == 30
        ) {
            return false;
        } else if (
            findFirstDay(year, month) > 4 &&
            findMonthDays(year, month) >= 30
        ) {
            return true;
        }
        return false;
    };

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

    const showCalendarMonth = () => {
        const year = mainDate.getFullYear();
        const month = mainDate.getMonth();
        const monthDays = findMonthDays(year, month);
        const firstDay = findFirstDay(year, month);
        const allDays = [];
        let count = 0;
        //last month
        for (let i = 0; i < firstDay; i++) {
            const prevMonth = month - 1;
            const prevMonthDays = findMonthDays(year, prevMonth);
            const day = prevMonthDays - i;
            const date = new Date(year, prevMonth, day, 0, 0, 0, 0);
            count = count + 1;
            allDays.unshift(
                <MonthDay
                    key={"pm" + i}
                    date={date}
                    iterator={day}
                    previous={true}
                />
            );
        }
        //show days of current month
        for (let j = 1; j <= monthDays; j++) {
            const date = new Date(year, month, j, 0 , 0, 0, 0);
            const isToday =
                j === new Date().getDate() &&
                month === new Date().getMonth() &&
                year === new Date().getFullYear();
            count = count + 1;
            allDays.push(
                <MonthDay
                    key={"cm" + j}
                    iterator={j}
                    date={date}
                    isToday={isToday}
                />
            );
        }
        //show days of next month
        for (let i = 1; i <= 7; i++) {
            const date = new Date(year, month + 1, i, 0, 0, 0, 0,);
            if (date.getDay() == 0 && count >= 35) {
                const Container = (
                    <div
                        className="month-container"
                        style={{
                            gridTemplateRows: `repeat(${
                                gridRule() ? 6 : 5
                            },1fr)`,
                        }}
                    >
                        {allDays.map((key) => key)}
                    </div>
                );
                return Container;
            }
            count = count + 1;
            allDays.push(
                <MonthDay key={"nm" + i} date={date} iterator={i} next={true} />
            );
        }
        const Container = (
            <div
                className="month-container"
                style={{
                    gridTemplateRows: `repeat(${gridRule() ? 6 : 5},1fr)`,
                }}
            >
                {allDays.map((key) => key)}
            </div>
        );
        return Container;
    };
    return (
        <motion.div
            className="calendar-grid"
            key={key}
            variants={calendarVariant}
            initial={switches == "prev" ? "hidden" : "hiddenNext"}
            animate={"visible"}
            exit={"exit"}
        >
            <div className="weekDay-container">{showWeekDays()}</div>
            {showCalendarMonth()}
        </motion.div>
    );
}
