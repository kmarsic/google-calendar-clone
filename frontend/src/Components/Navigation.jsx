/* eslint-disable react/prop-types */
import './../styles/_index.scss';
import { DarkToggle } from './DarkToggle';
import { Hamburger } from './Hamburger';
import { useDispatch } from 'react-redux';
import { previousMonth, nextMonth } from '../redux/features/dateSlicer';

export const Navigation = ({date, burger, setBurger}) => {
  const dispatch = useDispatch();
    return (
        <div className="calendar-header">
          <Hamburger burger={burger} setBurger={setBurger}></Hamburger>
          <div className='date-switch'>
            <button onClick={() => dispatch(previousMonth())}> &#60; </button>
            <h2>
              {date.toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </h2>
            <button onClick={() => dispatch(nextMonth())}> &gt; </button>
          </div>
          <DarkToggle></DarkToggle>
        </div>
    )
}