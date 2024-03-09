/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
//components
import { Hamburger } from './Hamburger';
import { MiniViewEmbed } from '../CalendarViews/MonthView/mini/MiniViewEmbed';
import { ViewDropdown } from '../ViewDropdown';
import { AnimatePresence } from 'framer-motion';
//redux
import { useDispatch, useSelector } from 'react-redux';
import { previousMonth, nextMonth, currentDate, currentView, previousWeek, previousDay, nextDay, nextWeek, setDate, nextYear, prevYear, setSwitch} from '../../redux/features/dateSlicer';
import { useState, useEffect, useRef } from 'react';
//helpers
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faSearch,faAngleLeft, faAngleRight, faCaretDown} from '@fortawesome/free-solid-svg-icons';
import { titleTimeFormat } from '../../Fncs/timeFormat';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { clickVariant } from '../../Fncs/framerVariants';


export const Navigation = ({ burger, setBurger, setElement}) => {
  const view = useSelector(currentView);
  const date = new Date(useSelector(currentDate));
  const today = new Date().getDate();

  const [isCalVisible, setIsCalVisible] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  
  const calendarRef = useRef(null);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const imgref = () => `https://ssl.gstatic.com/calendar/images/dynamiclogo_2020q4/calendar_${today}_2x.png`

  const handleButtonClick = (e) => {
    if (e.target.closest(".current-date")) {
      if (burger) return;
      setIsCalVisible(true);
    } else if (e.target.closest(".view-dropdown")) {
      setIsDropdownVisible(!isDropdownVisible);
    }
  }
  
  const handleClickOutside = (e) => {
    if (!calendarRef.current.contains(e.target)) {
      setIsCalVisible(false);
    }

    if (!dropdownRef.current.contains(e.target)) {
      setIsDropdownVisible(false);
    }
  }

  //event listener for modals
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, []);

  // sync route with current view
  useEffect(() => {
    navigate(`/${view}`)
  }, [view]);

  const handleViewChange = (view, time) => {
    dispatch(setSwitch(time))
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
        <div className="calendar-header" onClick={() => setElement()}>
          <div className='burger-title'>
            <Hamburger burger={burger} setBurger={setBurger}></Hamburger>
            <img src={imgref()} width={"40px"} height={"40px"} loading='lazy' alt={today}/>
            <p id='title'>Calendar</p>
          </div>
          <div className='header-menu'>
            <div className='menu-left'>
              <div className="date-switch">
                <motion.div
                 onClick={() => dispatch(setDate(Date.parse(new Date())))} className='btn-header'
                 variants={clickVariant}
                 initial={{backgroundSize: "10px"}}
                 whileTap={"click"}
                 whileHover={"hover"}
                 >
                    <span>Today</span>
                </motion.div>
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
                  {titleTimeFormat(view, date)}
                {burger ? null : <FontAwesomeIcon icon={faCaretDown} size='2xs' style={{color: "rgba(0, 0, 0, 0.4)"}}/>}
                {isCalVisible ? 
                  <MiniViewEmbed embed={true}/> : null}
              </div>
            </div>
            <div className='menu-right'>
              <div className='menu-item'>
                <FontAwesomeIcon icon={faSearch} size='xl'/>
              </div>
              <motion.div 
              onClick={(e) => handleButtonClick(e)} 
              className='view-dropdown' 
              ref={dropdownRef}
              variants={clickVariant}
              whileTap={"one"}
              > 
                  <div>
                  {view}
                  <AnimatePresence>{isDropdownVisible && (<ViewDropdown/>)}</AnimatePresence>
                  </div>
                  <FontAwesomeIcon icon={faCaretDown} size='2xs'/>
              </motion.div>
            </div>
          </div>
        </div>
    )
}