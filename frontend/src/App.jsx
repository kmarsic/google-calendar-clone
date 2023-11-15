import './styles/_index.scss';
import { MonthCalendar } from './Components/MonthCalendar';
import { Navigation } from './Components/Navigation';
import { TaskSidebar } from './Components/Tasks/TaskSidebar';
import { setNewDate, currentDate } from './redux/features/dateSlicer';
import getData from './redux/features/thunk/getData';
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react';

function App() {
  const selectedDate = new Date(useSelector(currentDate));
  const [render, setRender] = useState(true);
  const [burger, setBurgerOpen] = useState(false);
  const dispatch = useDispatch();

  const handleRender = () => setRender(!render)
  
  useEffect(() => {
    dispatch(getData());
    }, [render])  
  return (
    <>
      <Navigation date={selectedDate} burger={burger} setBurger={setBurgerOpen}></Navigation>
      <div className='calendar-main'>
        <TaskSidebar burgerOpen={burger}/>
        <MonthCalendar handleDateClick={setNewDate} selectedDate={selectedDate} getRender={handleRender}></MonthCalendar>
      </div>
    </>
  )
}

export default App
