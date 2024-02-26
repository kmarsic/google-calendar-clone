/* eslint-disable react-hooks/exhaustive-deps */
//styles
import './styles/_index.scss';
// components
import { Navigation } from './Components/Nav/Navigation';
import { Sidebar } from './Components/Sidebar/Sidebar';
import { Helmet } from 'react-helmet'
import { SiteRouter } from './SiteRouter';
import { NewTaskForm } from './Components/Forms/NewTaskForm';
//deps
import { currentDate, setDate, setFocusDate } from './redux/features/dateSlicer';
import getData from './redux/features/thunk/getData';
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

function App() {
  const [burger, setBurgerOpen] = useState(false);
  const [clickedElement, setClickedElement] = useState(null);

  const dispatch = useDispatch()

  const date = new Date(useSelector(currentDate))
  const today = new Date().getDate();

  useEffect(() => {
    dispatch(getData());
    }, [dispatch]) 

  const faviconHref = (num) => {
    return `https://calendar.google.com/googlecalendar/images/favicons_2020q4/calendar_${num}.ico`
  }

  const handleClick = (e) => {

    if (e.target.classList.contains('box') || e.target.classList.contains('hours')) {
      console.log(e.target.id)
      dispatch(setFocusDate(e.target.id));
      setClickedElement({
        id: e.target.id,
        data: e,
      })
      return;
  }}
  useEffect(() => {
    document.body.addEventListener('click', handleClick);
  }, []);

  return (
  <>
    <Helmet>
      <title>Google Calendar - {date.toLocaleString("default", {month: "long", year: 'numeric' })}</title>
      <link rel="icon" type="image/x-icon" href={faviconHref(today)}></link>
    </Helmet>
    <Navigation burger={burger} setBurger={setBurgerOpen} setElement={setClickedElement}/>
    <AnimatePresence>
      <div className='calendar-main'>
        <AnimatePresence>
          {clickedElement && (
            <>
              <NewTaskForm
              clickedElement={clickedElement}
              onClose={() => setClickedElement(null)}/>
              <div className="overlay" onClick={() => setClickedElement(null)}></div>
            </>
          )}
        </AnimatePresence>
        <Sidebar burgerOpen={burger}/>
        <SiteRouter/>
      </div>
    </AnimatePresence>
  </>
  )
}

export default App