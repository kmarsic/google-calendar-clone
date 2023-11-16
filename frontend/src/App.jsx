import './styles/_index.scss';
import { MonthCalendar } from './Components/MonthCalendar';
import { Navigation } from './Components/Navigation';
import { TaskSidebar } from './Components/Tasks/TaskSidebar';
import { currentDate, currentDay } from './redux/features/dateSlicer';
import getData from './redux/features/thunk/getData';
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet'

function App() {
  const selectedDate = new Date(useSelector(currentDate));
  const [render, setRender] = useState(true);
  const [burger, setBurgerOpen] = useState(false);
  const dispatch = useDispatch();

  const today = useSelector(currentDay, shallowEqual)

  const handleRender = () => setRender(!render)

  useEffect(() => {
    dispatch(getData());
    }, []) 

  const faviconHref = num => {
    return `./src/images/date-${num}.png`}

  return (
    <>
    <Helmet>
      <title>Calendar - {today.todayString}</title>
      <link rel="icon" type="image/x-icon" href={faviconHref(today.dayIndex)}></link>
    </Helmet>
      <Navigation date={selectedDate} burger={burger} setBurger={setBurgerOpen} imgref={faviconHref(today.dayIndex)}></Navigation>
      <div className='calendar-main'>
        <TaskSidebar burgerOpen={burger}/>
        <MonthCalendar selectedDate={selectedDate} getRender={handleRender}></MonthCalendar>
      </div>
    </>
  )
}

export default App
