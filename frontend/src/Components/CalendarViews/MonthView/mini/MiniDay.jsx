/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { currentDate, currentView, focusDate, setDate, setFocusDate } from "../../../../redux/features/dateSlicer";

export function MiniDay({date, iterator, previous, next, isToday}) {
    const parsedDate = Date.parse(date);
    const dispatch = useDispatch()
    const mainDate = new Date(useSelector(currentDate));
    const focus = useSelector(focusDate);
    const view = useSelector(currentView);

    const handleDateChange = (view, date) => {
        const newDate = new Date(date);
        const weekRangeStart = mainDate.getDate() - mainDate.getDay();
         switch (view) {
            case 'Year' :
                if (newDate.getFullYear() != mainDate.getFullYear()) {
                    dispatch(setDate(date));
                    dispatch(setFocusDate(date));
                } else dispatch(setFocusDate(date))
                break;
            case 'Month': 
                if (newDate.getMonth() != mainDate.getMonth()) {
                    dispatch(setDate(date));
                    dispatch(setFocusDate(date));
                } else dispatch(setFocusDate(date))
                break;
            case 'Week':
                if (newDate.getDate() < weekRangeStart || newDate.getDate() > weekRangeStart + 6) {
                    dispatch(setDate(date));
                    dispatch(setFocusDate(date));
                } else dispatch(setFocusDate(date))
                break;
            case 'Day': 
                if (newDate.getDate() != mainDate.getDate()) {
                    dispatch(setDate(date));
                    dispatch(setFocusDate(date));
                } else dispatch(setFocusDate(date))
                break;
         }
    }
    return (
        <div 
        id={parsedDate}
        onClick={() => handleDateChange(view, parsedDate)}
        className="mini-box">
            <div className={`${isToday ? "day-index-mini mini-today" : "day-index-mini"} ${parsedDate == focus ? "focused-date" : null} ${previous || next ? "empty" : null}`}><span>{iterator}</span></div>
        </div>
    )
}