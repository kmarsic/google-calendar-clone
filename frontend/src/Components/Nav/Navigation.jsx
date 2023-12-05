/* eslint-disable react/prop-types */
import { DarkToggle } from './DarkToggle';
import { Hamburger } from './Hamburger';
import { useDispatch, useSelector } from 'react-redux';
import { previousMonth, nextMonth, currentDate, miniDate } from '../../redux/features/dateSlicer';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faSearch,faAngleLeft, faAngleRight, faCaretDown} from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect, useRef } from 'react';
import { MiniView } from '../MonthView/mini/MiniView';
import { Link } from 'react-router-dom';


export const Navigation = ({ burger, setBurger, today}) => {
  const date = new Date(useSelector(currentDate));
  const minDate = new Date(useSelector(miniDate));
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  const dispatch = useDispatch();
  const imgref = () => `./src/images/title/calendar_${today}_2x.png`

  const handleClickOutside = (e) => {
    if (containerRef.current && !containerRef.current.contains(e.target)) {
      setIsVisible(false);
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, []);

  const handleButtonClick = () => {
    setIsVisible(true);
  }
    return (
        <div className="calendar-header">
          <div className='burger-title'>
            <Hamburger burger={burger} setBurger={setBurger}></Hamburger>
            <img src={imgref()} width={"40px"} loading='lazy' alt={today}/>
            <p id='title'>Calendar</p>
          </div>
          <div className='header-menu'>
            <div className='menu-left'>
              <div className="date-switch">
                <div className='btn-header'>
                    <span>Today</span>
                </div>
                <div className="switches">
                  <div className="menu-item" onClick={() => dispatch(previousMonth())}>
                      <FontAwesomeIcon icon={faAngleLeft} style={{color : "#3c4043"}} size='xl'></FontAwesomeIcon>
                  </div>
                  <div className="menu-item" onClick={() => dispatch(nextMonth())}>
                      <FontAwesomeIcon icon={faAngleRight} style={{color: "#3c4043"}} size='xl'></FontAwesomeIcon>
                  </div>
                </div>
              </div>
              <div className='current-date' ref={containerRef}  onClick={handleButtonClick}  >
                <span>
                  {date.toLocaleString("default", {
                    month: "long",
                    year: "numeric",
                  })}
                </span>
                <FontAwesomeIcon icon={faCaretDown} size='2xs' style={{color: "rgba(0, 0, 0, 0.4)"}}/>
                {isVisible ? 
                  <MiniView embed={true} date={minDate}/> : null}
              </div>
            </div>
            <div className='menu-right'>
              <div className='menu-item'>
                <FontAwesomeIcon icon={faSearch} size='xl'/>
              </div>
              <ul>
                <li><Link to={"/week"}>Week</Link></li>
                <li><Link to={"/month"}>Month</Link></li>
              </ul>
            </div>
          </div>
          <DarkToggle></DarkToggle>
        </div>
    )
}