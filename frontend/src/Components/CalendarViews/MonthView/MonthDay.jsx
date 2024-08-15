/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { setDate } from "../../../redux/features/dateSlicer";
import { Link } from "react-router-dom";
import { Assignment } from "../../Assignments/Assignment";
import { PlaceholderTask } from "../../Assignments/PlaceholderTask";
import { formData } from "../../../redux/features/formSlicer";

export function MonthDay({date, iterator,isToday, previous, next}) {
    const parsedDate = Date.parse(date);
    const dispatch = useDispatch();
    const task = useSelector(formData);
    return (
        <div 
        id={parsedDate} 
        className={previous || next ? "box empty" : "box"}
        >
          {iterator === 1 ? date.toLocaleString("default", {month:"short"}) + " " : null}
          <Link to='/Day'>
            <span key={"ff" + iterator} onClick={() => dispatch(setDate(parsedDate))} className={`dayIndex ${isToday ? "today" : ""}`}>
                {iterator}
            </span>
          </Link>
          <Assignment date={parsedDate}/>
          {Date.parse(date) === task.startDate ? (<PlaceholderTask task={task}/>) : null}
        </div>
    )
}