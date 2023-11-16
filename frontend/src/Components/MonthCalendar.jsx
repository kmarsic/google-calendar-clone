/* eslint-disable react/prop-types */
import './../styles/monthCalendar.scss';
import { useState } from 'react';
import { NewTaskForm } from './Tasks/NewTaskForm';
import { useDispatch } from 'react-redux';
import { setToday } from '../redux/features/dateSlicer';

export function MonthCalendar({selectedDate, getRender}) {

  const [clickedItem, setClickedItem] = useState(null);
  const dispatch = useDispatch();

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

    //last month
    for (let i = 0; i < firstDay; i++) {
      const prevMonth = month - 1;
      const prevMonthDays = findMonthDays(year, prevMonth);
      const day = prevMonthDays - i;
      const parsedDate = Date.parse(new Date(year, prevMonth, day));
    
      allDays.unshift(
        <div key={`emp-${i}`} 
             onClick={() => handleItemClick(parsedDate)}
             className='box empty'
        >
          {clickedItem === parsedDate ? <NewTaskForm render={getRender}/> : null} 
          <span className='dayIndex'>{day}</span>
        </div>
      );
    }
    


    //show days of current month
    for (let j = 1; j <= monthDays; j++) {

      const date = new Date(year, month, j);
      const parsedDate = Date.parse(date)
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
        <div
          key = {`j-${j}`}
          id = {`j-${j}`}
          className='box'
          onClick = {
            () => {
              handleItemClick(parsedDate);
              }
          }>
            {clickedItem === parsedDate ? <NewTaskForm render={getRender}/> : null}
            {j === 1 ? (
              <> 
                {date.toLocaleString("default", {month:"short"}) + " "}
                <span className={`dayIndex ${isToday ? "today" : ""}`}>{j}</span>
              </>) : 
              <span className={`dayIndex ${isToday ? "today" : ""}`}>{j}</span>
            }
          </div>
      )
    }

    //show days of next month
    for (let i = 1; i < 7; i++) {
      const date = new Date(year, month + 1, i);
      const parsedDate = Date.parse(date)
      if (date.getDay() === 0) return allDays;
      allDays.push(
        <div key={`emn-${i}`} 
             onClick={() => handleItemClick(parsedDate)}
             className='box empty'
        >
          {clickedItem === parsedDate ? <NewTaskForm render={getRender}/> : null}
          {i === 1 ? date.toLocaleString("default", {month:"short"}) + " " : ""}
          <span className='dayIndex'>{i}</span>
        </div>
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
      <div className="calendar-body">

      <div className="calendar-grid">
        {showWeekDays()}
        {showCalendarMonth()}
      </div>
      </div>

  )
}
