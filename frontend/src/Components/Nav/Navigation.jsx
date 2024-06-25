/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Hamburger } from './Hamburger';
import { NavDateControl } from './NavDateControl';
import { NavView } from './NavView';

export const Navigation = ({ burger, setBurger}) => {

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