/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
//hooks
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
//components,state
import { currentView,} from '../../redux/features/dateSlicer';
import { Hamburger } from './Hamburger';
import { NavDateControl } from './NavDateControl';
import { NavView } from './NavView';

export const Navigation = ({ burger, setBurger}) => {
  const view = useSelector(currentView);
  const navigate = useNavigate();

  // sync route with current view
  useEffect(() => {
    navigate(`/${view}`);
  }, [view]);
  
    return (
        <div className="calendar-header">
          <Hamburger burger={burger} setBurger={setBurger}></Hamburger>
          <div className='header-menu'>
            <NavDateControl/>
            <NavView/>
          </div>
        </div>
    )
}