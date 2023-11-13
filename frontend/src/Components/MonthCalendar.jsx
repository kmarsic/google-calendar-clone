/* eslint-disable react/prop-types */
import './../styles/monthCalendar.scss';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { TaskWindow } from './Tasks/TaskWindow';

export function MonthCalendar({selectedDate, handleDateClick}) {
  
  const dispatch = useDispatch();
  const [clickedItem, setClickedItem] = useState(null);

  function handleItemClick(date) {
    setClickedItem(date);
  }

  const findMonthDays = (y, m) => {
    return new Date(y, m + 1, 0).getDate();
  };

  const findFirstDay = (y,m) => {
    return new Date(y, m, 1).getDay();
  }
  const showCalendarMonth = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const monthDays = findMonthDays(year, month);
    const firstDay = findFirstDay(year, month);

    const allDays  = [];

    //show the days of the previous month before the first day of the current month
    for (let i = 0; i < firstDay; i++) {
      allDays.push(i)
    }
    // iterate over the array and update the values
    let iterations = 0;
    for (let i = allDays.length - 1; i >= 0; i--) {
      const prevMonth = month - 1;
      const prevMonthDays = findMonthDays(year, prevMonth)
      let day = prevMonthDays - i;
      const date = new Date(year, prevMonth, day);
      const parsedDate = Date.parse(date)
      allDays.splice(iterations, 1, <div key = {`emp-${iterations}`} onClick={() => {dispatch(handleDateClick(parsedDate))}} className='box empty'>{day}</div>)
      iterations ++;
    }


    //show days of current month
    for (let j = 1; j <= monthDays; j++) {
      const date = new Date(year, month, j);
      const parsedDate = Date.parse(date)
      const isToday = j === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear();

      allDays.push(
        <div
          key = {`j-${j}`}
          id = {`j-${j}`}
          className={`box ${isToday ? "today" : ""}`}
          onClick = {
            () => {
              dispatch(handleDateClick(parsedDate)); 
              handleItemClick(parsedDate);
              }
              }>
              {clickedItem === parsedDate ? <TaskWindow/> : null}
              {j === 1 ? date.toLocaleString("default", {month:"short"}) + " " + j : j}
          </div>
      )
    }

    //show days of next month
    for (let i = 1; i < 7; i++) {
      const date = new Date(year, month + 1, i);
      const parsedDate = Date.parse(date)
      if (date.getDay() === 0) return allDays;
      allDays.push(
        <div key = {`emn-${i}`} 
          onClick={() => {
            dispatch(handleDateClick(parsedDate))
          }} 
          className='box empty'>
          {i === 1 ? date.toLocaleString("default", {month:"short"}) + " " + i : i}
        </div>
      )
    }
    return allDays
  }

  const showWeekDays = () => {
    let weekDays = ["Sun", "Mon", "Tue","Wed", "Thu", "Fri", "Sat"];
    const list = [];
    for (let i = 0; i <=6; i++) {
      list.push(
        <div key = {`day-${i}`} className='weekDay'>{weekDays[i]}</div>
      )
    }

    return list
  }

  return (
      <div className="calendar-body">

      <div className='dayContainer'>{showWeekDays()}</div>
      {showCalendarMonth()}
      </div>

  )
}
