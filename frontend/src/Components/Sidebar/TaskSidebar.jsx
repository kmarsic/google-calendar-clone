/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { MiniMonthView } from './../MonthView/mini/MiniMonthView';

export const TaskSidebar = ({burgerOpen}) => {
    return (
        <div className={burgerOpen ? 'open sidebar' : 'closed sidebar'}>
            {/* <MiniMonthView/> */}
        </div>
    )
}