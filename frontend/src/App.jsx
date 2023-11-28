import './styles/_index.scss';
import { MonthView } from './Components/MonthView/MonthView';
import { Navigation } from './Components/Nav/Navigation';
import { TaskSidebar } from './Components/Sidebar/TaskSidebar';
import { currentDate } from './redux/features/dateSlicer';
import getData from './redux/features/thunk/getData';
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet'

function App() {
  const [burger, setBurgerOpen] = useState(false);
  const dispatch = useDispatch();

  const date = new Date(useSelector(currentDate))
  const today = new Date().getDate();

  useEffect(() => {
    dispatch(getData());
    }, []) 

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
      <TaskSidebar burgerOpen={burger}/>
      <MonthView/>
    </div>
  </>
  )
}

export default App
