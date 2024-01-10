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
import { useState, useEffect, useRef } from 'react';
import { NewTaskForm } from './Components/Forms/NewTaskForm';

function App() {
  const [burger, setBurgerOpen] = useState(false);
  const [clickedElement, setClickedElement] = useState({
    id: null,
    width: window.innerWidth,
    height: window.innerHeight,
    cursorX: 0,
    cursorY: 0,
    date: null,
    clicked : false
  });

  const dispatch = useDispatch()

  const date = new Date(useSelector(currentDate))
  const today = new Date().getDate();

  const formRef = useRef(null);

  useEffect(() => {
    dispatch(getData());
    }, [dispatch]) 

  const faviconHref = (num) => {
    return `https://calendar.google.com/googlecalendar/images/favicons_2020q4/calendar_${num}.ico`
  }

  useEffect(() => {
    const handleClick = (e) => {
      if (e.target.classList.contains('box') || e.target.classList.contains('hours')) {
        setClickedElement({
          ...clickedElement,
          id: e.target.id,
          cursorX: e.clientX,
          cursorY: e.clientY,
          date: new Date(parseInt(e.target.id)),
          clicked: true
        })
      }
    }; 
    
    const handleClickOutside = (e) => {
      if (formRef.current && !formRef.current.contains(e.target)) {
        setClickedElement(
          {
            ...clickedElement,
            clicked: false
          }
        );
      }
    } 
    document.body.addEventListener('click', handleClick);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.body.removeEventListener('click', handleClick);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
  <>
    <Helmet>
      <title>Google Calendar - {date.toLocaleString("default", {month: "long", year: 'numeric' })}</title>
      <link rel="icon" type="image/x-icon" href={faviconHref(today)}></link>
    </Helmet>
    <Navigation today={today} burger={burger} setBurger={setBurgerOpen}/>
    <div className='calendar-main'>
      {clickedElement.clicked && (
        <div ref={formRef}>
          <NewTaskForm
          clickedElement={clickedElement}
          onClose={() => setClickedElement({
            ...clickedElement,
            date: null,
            clicked: false
          })}/>
        </div>
      )}
      <Sidebar burgerOpen={burger}/>
      <SiteRouter/>
    </div>
  </>
  )
}

export default App
