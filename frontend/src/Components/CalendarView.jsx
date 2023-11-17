/* eslint-disable react/prop-types */
import './../styles/calendarView.scss';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setToday } from '../redux/features/dateSlicer';
import { PreviousMonthDay } from './Days/PreviousMonthDay';
import { CurrentMonthDay } from './Days/CurrentMonthDay';
import { NextMonthDay } from './Days/NextMonthDay';
import { currentDate } from '../redux/features/dateSlicer';
import { allTasks } from '../redux/features/taskSlicer';
import getData from '../redux/features/thunk/getData';

export function CalendarView() {
  const dispatch = useDispatch();
  const selectedDate = new Date(useSelector(currentDate));
  const assignments = useSelector(allTasks)

  const [clickedItem, setClickedItem] = useState({
    id: parseInt(null),
    x: null,
    y: null
  });

  const handleItemClick = (e) => {
    if(!e.target.classList.contains("box")) return

    const offsetX = () => {
      if (e.clientX > 497) {
        return (e.target.offsetLeft - 460)
      } 
      return (e.target.offsetLeft + 280)
    }

     const offsetY = () => {
       if (e.clientY <= 257 ) {
        return 114
       } else if (e.clientY > 791 ) {
        return 360
       } else return 270
      
     }
    setClickedItem({
      id: e.target.id,
      x: offsetX(),
      y: offsetY()
    });
  }


  const [render, setRender] = useState(false);

  const handleRender = () => {
    setRender(!render);
  }

  useEffect(() => {
    dispatch(getData())
  }, render)

  const findMonthDays = (y, m) => {
    return new Date(y, m + 1, 0).getDate();
  };

  const findFirstDay = (y,m) => {
    return new Date(y, m, 1).getDay();
  }

  const gridRule = () => {
    const month = selectedDate.getMonth();
    const year = selectedDate.getFullYear();
     if (findFirstDay(year,month) >= 4 && findMonthDays(year,month) > 30 ) {
        return true
     }
     return false
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
      const date = new Date(year, prevMonth, i);
      const prevMonthDays = findMonthDays(year, prevMonth);
      const day = prevMonthDays - i;
    
      allDays.unshift(
        <PreviousMonthDay
        assignments={assignments}
        key={"pm"+i}
        date={date} 
        clickedItem={clickedItem}
        handleClick={handleItemClick}
        iterator={i}
        day={day}
        render={handleRender}/>
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
        <CurrentMonthDay
        assignments={assignments}
        key={"cm"+ j}
        iterator={j}
        handleClick={handleItemClick}
        date={date}
        clickedItem={clickedItem}
        isToday={isToday}
        render={handleRender}/>
      )
    }

    //show days of next month
    for (let i = 1; i < 7; i++) {
      const date = new Date(year, month + 1, i);
      if (date.getDay() === 0) return allDays;
      allDays.push(
        <NextMonthDay
        assignments={assignments}
        key={"nm"+i}
        date={date}
        handleClick={handleItemClick}
        clickedItem={clickedItem}
        iterator={i}
        render={handleRender}
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
      <div className="calendar-body">

      <div className="calendar-grid" style={{gridTemplateRows: `15px repeat(${gridRule() ? 6 : 5},1fr)`}}>
        {showWeekDays()}
        {showCalendarMonth()}
      </div>
      </div>

  )
}
