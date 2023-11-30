/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { MiniView } from '../MonthView/mini/MiniView';

export const Sidebar = ({burgerOpen}) => {

    return (
        <div className={burgerOpen ? 'open sidebar' : 'closed sidebar'}>
            <div style={{height: "65px"}}></div>
            <MiniView/>
        </div>
    )
}