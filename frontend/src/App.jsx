/* eslint-disable react-hooks/exhaustive-deps */
//styles
import './styles/_index.scss';
// components
import { Navigation } from './Components/Nav/Navigation';
import { Sidebar } from './Components/Sidebar/Sidebar';
import { Helmet } from 'react-helmet'
import { SiteRouter } from './SiteRouter';
//funcs
import { currentDate } from './redux/features/dateSlicer';
import getData from './redux/features/thunk/getData';
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react';



function App() {
  const [burger, setBurgerOpen] = useState(false);
  const dispatch = useDispatch()

  const date = new Date(useSelector(currentDate))
  const today = new Date().getDate();

  useEffect(() => {
    dispatch(getData());
    }, [dispatch]) 

  const faviconHref = (num) => {
    return `https://calendar.google.com/googlecalendar/images/favicons_2020q4/calendar_${num}.ico`
  }
  return (
  <>
    <Helmet>
      <title>Google Calendar - {date.toLocaleString("default", {month: "long", year: 'numeric' })}</title>
      <link rel="icon" type="image/x-icon" href={faviconHref(today)}></link>
    </Helmet>
    <Navigation today={today} burger={burger} setBurger={setBurgerOpen}/>
    <div className='calendar-main'>
      <Sidebar burgerOpen={burger}/>
      <SiteRouter/>
    </div>
  </>
  )
}

export default App
