/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from 'react-redux';
import { setToday } from '../../../redux/features/dateSlicer';
import { Day } from '../Day';
import { miniDate } from '../../../redux/features/dateSlicer';


export function MiniMonthView() {
  const dispatch = useDispatch();
  const selectedDate = new Date(useSelector(miniDate));

  const findMonthDays = (y, m) => {
    return new Date(y, m + 1, 0).getDate();
  };

  const findFirstDay = (y,m) => {
    return new Date(y, m, 1).getDay();
  }

  const showMiniCalendarMonth = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const monthDays = findMonthDays(year, month);
    const firstDay = findFirstDay(year, month);

    const allDays  = [];

    //last month
    for (let i = 0; i < firstDay; i++) {
      const prevMonth = month - 1;
      const date = new Date(year, prevMonth, i);
      const prevMonthDays = findMonthDays(year, prevMonth);
      const day = prevMonthDays - i;
    
      allDays.unshift(
        <Day
        key={"pm"+i}
        date={date} 
        iterator={i}
        day={day}/>
      );
    }
    


    //show days of current month
    for (let j = 1; j <= monthDays; j++) {

      const date = new Date(year, month, j);
      const isToday = 
      j === new Date().getDate() && 
      month === new Date().getMonth() && 
      year === new Date().getFullYear();

      if (isToday) {
        const today = {
          dayIndex: j,
          todayString: date.toLocaleString("default", {weekday: 'long' ,month: "long", day: 'numeric', year: 'numeric' })
        }
        dispatch(setToday(today));
      }

      allDays.push(
        <Day
        key={"cm"+ j}
        iterator={j}
        date={date}
        isToday={isToday}/>
      )
    }

    //show days of next month
    for (let i = 1; i < 7; i++) {
      const date = new Date(year, month + 1, i);
      if (date.getDay() === 0) return allDays;
      allDays.push(
        <Day
        key={"nm"+i}
        date={date}
        iterator={i}
        />
      )
    }
    return allDays
  }

  const showWeekDays = () => {
    let weekDays = ["SUN", "MON", "TUE","WED", "THU", "FRI", "SAT"];
    const list = [];
    for (let i = 0; i <=6; i++) {
      list.push(
        <div key = {`day-${i}`} className='weekDay'>{weekDays[i]}</div>
      )
    }

    return list
  }

  return (
      <div className="mini-calendar-grid">
        {showWeekDays()}
        {showMiniCalendarMonth()}
      </div>

  )
}
