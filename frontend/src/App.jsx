import './styles/App.scss';
import { CalendarView } from './Components/CalendarView';
import { Navigation } from './Components/Nav/Navigation';
import { TaskSidebar } from './Components/TaskSidebar';
import { currentDate, currentDay } from './redux/features/dateSlicer';
import getData from './redux/features/thunk/getData';
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet'

function App() {
  const selectedDate = new Date(useSelector(currentDate));
  const [burger, setBurgerOpen] = useState(false);
  const dispatch = useDispatch();

  const today = useSelector(currentDay, shallowEqual)

  const [clickedItem, setClickedItem] = useState({
    id: parseInt(null),
    x: null,
    y: null,
    date: parseInt(null),
    refresh: false
  });

  const handleItemClick = (e) => {
    if(!e.target.classList.contains("box")) return

    if(clickedItem.refresh === false) {
      setClickedItem({
        ...clickedItem,
        id:null,
        refresh:true
      })
      return
    }

    const offsetX = () => {
      if (e.clientX > 497) {
        return (e.target.offsetLeft - 360)
      } 
      return (e.target.offsetLeft + 280)
    }

     const offsetY = () => {
       if (e.clientY <= 257 ) {
        return 114
       } else if (e.clientY > 720 ) {
        return 435
       } else return 275
      
     }
    setClickedItem({
      id: e.target.id,
      x: offsetX(),
      y: offsetY(),
      date: new Date(parseInt(e.target.id)),
      refresh: false
    });
  }

  useEffect(() => {
    dispatch(getData());
    }, []) 

  const faviconHref = num => {
    return `./src/images/favi/calendar_${num}.ico`}

  return (
    <>
    <Helmet>
      <title>Calendar - {today.todayString}</title>
      <link rel="icon" type="image/x-icon" href={faviconHref(today.dayIndex)}></link>
    </Helmet>
      <Navigation date={selectedDate} burger={burger} setBurger={setBurgerOpen} day={today.dayIndex} handleItemClick={handleItemClick}></Navigation>
      <div className='calendar-main'>
        <TaskSidebar burgerOpen={burger}/>
        <CalendarView selectedDate={selectedDate} handleItemClick={handleItemClick} clickedItem={clickedItem} ></CalendarView>
      </div>
    </>
  )
}

export default App
