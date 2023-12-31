/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux';
import { currentDate } from '../../../redux/features/dateSlicer';
import { MonthDay } from './MonthDay';

export function MonthView() {
  const mainDate = new Date(useSelector(currentDate));

  const findMonthDays = (y, m) => {
    return new Date(y, m + 1, 0).getDate();
  };

  const findFirstDay = (y,m) => {
    return new Date(y, m, 1).getDay();
  }

  const gridRule = () => {
    const month = mainDate.getMonth();
    const year = mainDate.getFullYear();
    if(findFirstDay(year,month) == 5 && findMonthDays(year, month) == 30) {
      return false
    }
     else if (findFirstDay(year,month) > 4 && findMonthDays(year,month) >= 30 ) {
        return true
     }
     return false
  }

  const showCalendarMonth = () => {
    const year = mainDate.getFullYear();
    const month = mainDate.getMonth();
    const monthDays = findMonthDays(year, month);
    const firstDay = findFirstDay(year, month);

    const allDays  = [];
    let count = 0;

    //last month
    for (let i = 0; i < firstDay; i++) {
      const prevMonth = month - 1;
      const prevMonthDays = findMonthDays(year, prevMonth);
      const day = prevMonthDays - i;
      const date = new Date(year, prevMonth, day);
      count = count + 1;
      allDays.unshift(
        <MonthDay
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
        <MonthDay
        key={"cm"+ j}
        iterator={j}
        date={date}
        isToday={isToday}/>
      )
    }

    //show days of next month
    for (let i = 1; i <= 7; i++) {
      const date = new Date(year, month + 1, i);
      if (date.getDay() == 0 && count >= 35) return allDays;
      count = count + 1;
      allDays.push(
        <MonthDay
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
      <div className="calendar-grid" style={{gridTemplateRows: `25px repeat(${gridRule() ? 6 : 5},1fr)`}}>
        {showWeekDays()}
        {showCalendarMonth()}
      </div>

  )
}
