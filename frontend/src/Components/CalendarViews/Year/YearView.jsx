import { useSelector } from "react-redux";
import { MiniDay } from "../MonthView/mini/MiniDay";
import { miniDate } from "../../../redux/features/dateSlicer";

export function YearView() {
    const selectedDate = new Date(useSelector(miniDate));
    const month = selectedDate.getMonth();
    const findMonthDays = (y, m) => {
    return new Date(y, m + 1, 0).getDate();
    };

    const findFirstDay = (y,m) => {
    return new Date(y, m, 1).getDay();
    }

    const showMiniCalendarMonth = (month) => {
        const year = selectedDate.getFullYear();
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
    console.log(count);
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
    for (let i = 0; i < 12; i++) {
        year.push(
        <div className="mini-calendar-grid">
            {showWeekDays()}
            {showMiniCalendarMonth(month + i)}
      </div>
        )
    }
    return year;
  }

  return (
    <div className="year-grid">
      {showYear()}
    </div>

  )
}