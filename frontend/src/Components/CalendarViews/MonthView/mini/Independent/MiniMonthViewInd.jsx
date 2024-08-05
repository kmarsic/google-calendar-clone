/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux';
import { MiniFormDayInd } from './MiniFormDayInd';
import { miniDate } from '../../../../../redux/features/dateSlicer';


export function MiniMonthViewInd({reducer}) {
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
    let count = 0;

    //last month
    for (let i = 0; i < firstDay; i++) {
      const prevMonth = month - 1;
      const prevMonthDays = findMonthDays(year, prevMonth);
      const day = prevMonthDays - i
      const date = new Date(year, prevMonth, day);
      const isToday =
      date.getDate() === new Date().getDate() && 
      date.getMonth() === new Date().getMonth() && 
      year === new Date().getFullYear();
      count = count + 1;
    
      allDays.unshift(
        <MiniFormDayInd
        key={"pm"+i}
        date={date} 
        iterator={day}
        previous={true}
        isToday={isToday}
        reducer={reducer}/>
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
        <MiniFormDayInd
        key={"cm"+ j}
        iterator={j}
        date={date}
        isToday={isToday}
        reducer={reducer}/>
      )
    }

    //show days of next month
    for (let i = 1; i <= 14; i++) {
      const date = new Date(year, month + 1, i, 0,0,0,0);
      const isToday =
      date.getDate() === new Date().getDate() && 
      date.getMonth() === new Date().getMonth() && 
      year === new Date().getFullYear();
      if (count >= 42) return allDays;
      count = count + 1;

      allDays.push(
        <MiniFormDayInd
        key={"nm"+i}
        date={date}
        iterator={i}
        next={true}
        isToday={isToday}
        reducer={reducer}
        />
      )
    }
    return allDays
  }

  const showWeekDays = () => {
    let weekDays = ["S", "M", "T","W", "T", "F", "S"];
    let longDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const list = [];
    for (let i = 0; i <=6; i++) {
      list.push(
        <div key = {`day-${i}`} className='mini-box mwd'>
          <span>{weekDays[i]}</span>
          <span className='box-hover'>{longDays[i]}</span>
        </div>
      )
    }

    return list
  }

  return (
    <>
      <div className="mini-calendar-grid">
        {showWeekDays()}
        {showMiniCalendarMonth()}
      </div>
    </>

  )
}
