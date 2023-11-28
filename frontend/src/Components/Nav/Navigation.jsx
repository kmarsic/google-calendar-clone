/* eslint-disable react/prop-types */
import './../../styles/_index.scss';
import { DarkToggle } from './DarkToggle';
import { Hamburger } from './Hamburger';
import { useDispatch, useSelector } from 'react-redux';
import { previousMonth, nextMonth, currentDate } from '../../redux/features/dateSlicer';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faSearch,faAngleLeft, faAngleRight} from '@fortawesome/free-solid-svg-icons';


export const Navigation = ({ burger, setBurger, today}) => {
  const date = new Date(useSelector(currentDate));
  const dispatch = useDispatch();
  const imgref = () => `./src/images/title/calendar_${today}_2x.png`
    return (
        <div className="calendar-header">
          <div className='burger-title'>
            <Hamburger burger={burger} setBurger={setBurger}></Hamburger>
            <img src={imgref()} width={"40px"} loading='lazy'/>
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
              <div className='btn-header'>
                MONTH
              </div>
            </div>
          </div>
          <DarkToggle></DarkToggle>
        </div>
    )
}