/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useSelector, useDispatch } from 'react-redux';
import { MiniMonthView } from '../MonthView/mini/MiniMonthView';
import { miniDate } from '../../redux/features/dateSlicer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { previousMonthMini, nextMonthMini } from '../../redux/features/dateSlicer';

export const Sidebar = ({burgerOpen}) => {
    const date = new Date(useSelector(miniDate));
    const dispatch = useDispatch();

    return (
        <div className={burgerOpen ? 'open sidebar' : 'closed sidebar'}>
            <div style={{height: "65px"}}></div>
            <div>
                <div className='mini-nav'>
                    <div className='mini-date'>
                    {date.toLocaleString("default", {
                        month: "long",
                        year: "numeric",
                     })}
                    </div>
                    <div className='nav-controls-mini'>
                        <div className="menu-item-mini" onClick={() => dispatch(previousMonthMini())}>
                          <FontAwesomeIcon icon={faAngleLeft} style={{color : "#3c4043"}}></FontAwesomeIcon>
                        </div>
                        <div className="menu-item-mini" onClick={() => dispatch(nextMonthMini())}>
                          <FontAwesomeIcon icon={faAngleRight} style={{color: "#3c4043"}}></FontAwesomeIcon>
                        </div>
                    </div>
                </div>
                <MiniMonthView/>
            </div>
        </div>
    )
}