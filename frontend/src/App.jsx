/* eslint-disable react-hooks/exhaustive-deps */
import './styles/_index.scss';
import { MonthView } from './Components/CalendarViews/MonthView/MonthView';
import { Navigation } from './Components/Nav/Navigation';
import { Sidebar } from './Components/Sidebar/Sidebar';
import { currentDate } from './redux/features/dateSlicer';
import getData from './redux/features/thunk/getData';
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet'
import { Route, Routes } from 'react-router-dom';
import { WeekView } from './Components/CalendarViews/week/WeekView';
import { DayView } from './Components/CalendarViews/day/DayView';
import { YearView } from './Components/CalendarViews/Year/YearView';

function App() {
  const [burger, setBurgerOpen] = useState(false);
  const dispatch = useDispatch();

  const date = new Date(useSelector(currentDate))
  const today = new Date().getDate();

  useEffect(() => {
    dispatch(getData());
    }, [dispatch]) 

  const faviconHref = num => {
    return `./src/images/favi/calendar_${num}.ico`}

  return (
  <>
    <Helmet>
      <title>Google Calendar - {date.toLocaleString("default", {month: "long", year: 'numeric' })}</title>
      <link rel="icon" type="image/x-icon" href={faviconHref(today)}></link>
    </Helmet>
    <Navigation today={today} burger={burger} setBurger={setBurgerOpen}/>
    <div className='calendar-main'>
      <Sidebar burgerOpen={burger}/>
      <Routes>
        <Route path='/' element={<MonthView/>}></Route>
        <Route path='/month' element={<MonthView/>}></Route>
        <Route path='/week' element={<WeekView/>}></Route> 
        <Route path='/day' element={<DayView/>}></Route>
        <Route path='/year' element={<YearView/>}></Route>
      </Routes>
    </div>
  </>
  )
}

export default App
