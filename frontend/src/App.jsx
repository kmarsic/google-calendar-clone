import './styles/_index.scss';
import { MonthCalendar } from './Components/MonthCalendar';
import { Navigation } from './Components/Navigation';
import { TaskSidebar } from './Components/Tasks/TaskSidebar';
import { setNewDate, currentDate } from './redux/features/dateSlicer';
import { useSelector } from 'react-redux'
import { useState  } from 'react';

function App() {
  const selectedDate = new Date(useSelector(currentDate));
  const [burger, setBurgerOpen] = useState(false);



  return (
    <div>
      <Navigation date={selectedDate} burger={burger} setBurger={setBurgerOpen}></Navigation>
      <div className='calendar-main'>
        <TaskSidebar burgerOpen={burger}/>
        <MonthCalendar handleDateClick={setNewDate} selectedDate={selectedDate}></MonthCalendar>
      </div>
    </div>
  )
}

export default App
