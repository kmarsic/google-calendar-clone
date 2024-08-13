import { MonthDay } from "./MonthDay";
import { findFirstDay } from "../../../Fncs/findFirstDay";
import { findMonthDays } from "../../../Fncs/findMonthDays";
import { gridRule } from "../../../Fncs/gridRule";
import { useSelector } from "react-redux";
import { currentDate } from "../../../redux/features/dateSlicer";

export const ShowCalendarMonth = () => {
    const mainDate = new Date(useSelector(currentDate));
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
                            gridRule(mainDate) ? 6 : 5
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
                gridTemplateRows: `repeat(${gridRule(mainDate) ? 6 : 5},1fr)`,
            }}
        >
            {allDays.map((key) => key)}
        </div>
    );
    return Container;
};