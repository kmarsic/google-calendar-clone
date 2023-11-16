/* eslint-disable react/prop-types */
import './../styles/_index.scss';
import { DarkToggle } from './DarkToggle';
import { Hamburger } from './Hamburger';
import { useDispatch } from 'react-redux';
import { previousMonth, nextMonth } from '../redux/features/dateSlicer';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faSearch,faAngleLeft, faAngleRight, faGear} from '@fortawesome/free-solid-svg-icons';
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons';

export const Navigation = ({date, burger, setBurger, day}) => {
  const dispatch = useDispatch();
  const imgref = () => `./src/images/title/calendar_${day}_2x.png`
    return (
        <div className="calendar-header">
          <div className='burger-title'>
            <Hamburger burger={burger} setBurger={setBurger}></Hamburger>
            <img src={imgref()} width={"40px"}/>
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
              <div className='current-date'>
                <span>
                  {date.toLocaleString("default", {
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
            <div className='menu-right'>
              <div className='menu-item'>
                <FontAwesomeIcon icon={faSearch} size='xl'></FontAwesomeIcon>
              </div>
              <div className='menu-item'>
                <FontAwesomeIcon icon={faCircleQuestion} size='xl'></FontAwesomeIcon>
              </div>
              <div className='menu-item'>
              <FontAwesomeIcon icon={faGear} size='xl'></FontAwesomeIcon>
              </div>
              <div className='btn-header'>
                VIEW DROPDOWN
              </div>
            </div>
          </div>
          <DarkToggle></DarkToggle>
        </div>
    )
}