/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { MiniViewEmbed } from "../CalendarViews/MonthView/mini/MiniViewEmbed"

export const Sidebar = ({burgerOpen}) => {

    return (
        <div className={burgerOpen ? 'open sidebar' : 'closed sidebar'}>
            <div style={{height: "65px"}}></div>
            <MiniViewEmbed/>
        </div>
    )
}