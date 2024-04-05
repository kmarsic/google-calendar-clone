import { useDispatch, useSelector } from "react-redux";
import { MiniDay } from "../MonthView/mini/MiniDay";
import { currentDate, setView, switchView } from "../../../redux/features/dateSlicer";
import { motion } from "framer-motion";
import { calendarVariant } from "../../../Fncs/framerVariants";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export function YearView() {
    const mainDate = new Date(useSelector(currentDate));
    const switches = useSelector(switchView);
    const dispatch = useDispatch();
    const location = useLocation();

    console.log(location.pathname)

    useEffect(() => {
      dispatch(setView(location.pathname.substring(1)))
    }, [])

    const currDate = new Date();
    const currentMonth = currDate.getMonth();
    const currentYear = currDate.getFullYear();
    const findMonthDays = (y, m) => {
    return new Date(y, m + 1, 0).getDate();
    };

    const findFirstDay = (y,m) => {
    return new Date(y, m, 1).getDay();
    }

    const showMiniCalendarMonth = (month) => {
        const year = mainDate.getFullYear();
        const monthDays = findMonthDays(year, month);
        const firstDay = findFirstDay(year, month);
        const allDays  = [];
        let count = 0;

        //last month
        for (let i = 0; i < firstDay; i++) {
            const prevMonth = month - 1;
            const prevMonthDays = findMonthDays(year, prevMonth);
            const day = prevMonthDays - i
            const date = new Date(year, prevMonth, day);
            count = count + 1;
        
            allDays.unshift(
              <MiniDay
              key={"pm"+i}
              date={date} 
              iterator={day}
              previous={true}/>
        );
    }   
    


    //show days of current month
    for (let j = 1; j <= monthDays; j++) {

      const date = new Date(year, month, j);
      const isToday = 
      j === new Date().getDate() && 
      month === new Date().getMonth() && 
      year === new Date().getFullYear();
      count = count + 1;

      allDays.push(
        <MiniDay
        key={"cm"+ j}
        iterator={j}
        date={date}
        isToday={isToday}/>
      )
    }

    //show days of next month
    for (let i = 1; i <= 14; i++) {
      const date = new Date(year, month + 1, i);
      if (count >= 42) return allDays;
      count = count + 1;

      allDays.push(
        <MiniDay
        key={"nm"+i}
        date={date}
        iterator={i}
        next={true}
        />
      )
    }
    return allDays
  }

  const showWeekDays = () => {
    let weekDays = ["S", "M", "T","W", "T", "F", "S"];
    const list = [];
    for (let i = 0; i <=6; i++) {
      list.push(
        <div key = {`day-${i}`} className='mini-box mwd'><p className={"p" + (i + 1)}>{weekDays[i]}</p></div>
      )
    }

    return list
  }

  const showYear = () => {
    const year = [];
    const currYear = mainDate.getFullYear();

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    for (let i = 0; i < 12; i++) {
      const date = new Date(currYear, i);
      const dateMonth = date.getMonth();
      const dateYear = date.getFullYear();
        year.push(
        <div key={"yd" + i} style={{display: "grid"}}>
          <div className={(dateYear < currentYear) || (dateMonth < currentMonth && dateYear == currentYear) ? "year-month prevm" : "year-month"}>{months[i]}</div>
          <div className="mini-calendar-grid-year">
              {showWeekDays()}
              {showMiniCalendarMonth(i)}
          </div>
        </div>
        )
    }
    return year;
  }

  return (
    <motion.div 
    className="year-grid"
    key={mainDate}
    variants={calendarVariant}
    initial={switches == "prev" ? "hidden" : "hiddenNext"}
    animate={"visible"}
    exit={"exit"}
    >
      {showYear()}
    </motion.div>

  )
}