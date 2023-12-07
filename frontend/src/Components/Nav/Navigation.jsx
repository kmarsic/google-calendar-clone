/* eslint-disable react/prop-types */
import { DarkToggle } from './DarkToggle';
import { Hamburger } from './Hamburger';
import { useDispatch, useSelector } from 'react-redux';
import { previousMonth, nextMonth, currentDate, miniDate, currentView, previousWeek, previousDay, nextDay, nextWeek, setDate, nextYear, prevYear } from '../../redux/features/dateSlicer';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faSearch,faAngleLeft, faAngleRight, faCaretDown} from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect, useRef } from 'react';
import { MiniView } from '../CalendarViews/MonthView/mini/MiniView';
import { ViewDropdown } from '../ViewDropdown';


export const Navigation = ({ burger, setBurger, today}) => {
  const view = useSelector(currentView);
  const date = new Date(useSelector(currentDate));
  const minDate = new Date(useSelector(miniDate));
  const [isCalVisible, setIsCalVisible] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const calendarRef = useRef(null);

  const dispatch = useDispatch();
  const imgref = () => `https://ssl.gstatic.com/calendar/images/dynamiclogo_2020q4/calendar_${today}_2x.png`

  const handleClickOutside = (e) => {
    if (calendarRef.current && !calendarRef.current.contains(e.target)) {
      setIsCalVisible(false);
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, []);

  const handleButtonClick = (e) => {
    if (e.target.closest(".current-date")) {
      setIsCalVisible(true);
    } else if (e.target.closest(".view-dropdown")) {
      setIsDropdownVisible(!isDropdownVisible);
    }
  }

  const handleViewChange = (view, time) => {
    if (time == "prev") {
      switch(view) {
        case "Year":
          dispatch(prevYear());
          break;
        case "Month":
          dispatch(previousMonth());
          break;
        case "Week":
          dispatch(previousWeek());
          break;
        case "Day":
          dispatch(previousDay());
          break;
      }
    } else if (time == "next") {
      switch(view) {
        case "Year":
          dispatch(nextYear());
          break;
        case "Month":
          dispatch(nextMonth());
          break;
        case "Week":
          dispatch(nextWeek());
          break;
        case "Day":
          dispatch(nextDay());
          break;
      }
    }
  }
    return (
        <div className="calendar-header">
          <div className='burger-title'>
            <Hamburger burger={burger} setBurger={setBurger}></Hamburger>
            <img src={imgref()} width={"40px"} height={"40px"} loading='lazy' alt={today}/>
            <p id='title'>Calendar</p>
          </div>
          <div className='header-menu'>
            <div className='menu-left'>
              <div className="date-switch">
                <div onClick={() => dispatch(setDate(Date.parse(new Date())))} className='btn-header'>
                    <span>Today</span>
                </div>
                <div className="switches">
                  <div className="menu-item" onClick={() => handleViewChange(view, "prev")}>
                      <FontAwesomeIcon icon={faAngleLeft} style={{color : "#3c4043"}} size='xl'></FontAwesomeIcon>
                  </div>
                  <div className="menu-item" onClick={() => handleViewChange(view, "next")}>
                      <FontAwesomeIcon icon={faAngleRight} style={{color: "#3c4043"}} size='xl'></FontAwesomeIcon>
                  </div>
                </div>
              </div>
              <div className='current-date' ref={calendarRef}  onClick={handleButtonClick}  >
                  {date.toLocaleString("default", {
                    month: "long",
                    year: "numeric",
                  })}
                <FontAwesomeIcon icon={faCaretDown} size='2xs' style={{color: "rgba(0, 0, 0, 0.4)"}}/>
                {isCalVisible ? 
                  <MiniView embed={true} date={minDate}/> : null}
              </div>
            </div>
            <div className='menu-right'>
              <div className='menu-item'>
                <FontAwesomeIcon icon={faSearch} size='xl'/>
              </div>
              <div onClick={(e) => handleButtonClick(e)} className='view-dropdown'>
                  <div>{view}</div>
                  <FontAwesomeIcon icon={faCaretDown} size='2xs'/>
                  {isDropdownVisible ? <ViewDropdown/> : null}
              </div>
            </div>
          </div>
          <DarkToggle></DarkToggle>
        </div>
    )
}