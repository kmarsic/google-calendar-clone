/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { Assignment } from "./../../Forms/Assignment"
import { NewTaskForm } from "./../../Forms/NewTaskForm"
import { allTasks } from "../../../redux/features/taskSlicer";
import { clicked, handleBoxClick } from "../../../redux/features/clickedSlicer";
import { setDate, setView } from "../../../redux/features/dateSlicer";
import { Link } from "react-router-dom";

export function MonthDay({date, iterator,isToday, previous, next}) {
    const parsedDate = Date.parse(date);
    const assignments = useSelector(allTasks);
    const clickedItem = useSelector(clicked);
    const dispatch = useDispatch();
    return (
        <div 
        id={parsedDate} 
        onClick={(e) => dispatch(handleBoxClick(e))} 
        className={previous || next ? "box empty" : "box"}
        >
          {previous ? 
          (<Link to='/Day'><span onClick={() => {dispatch(setDate(parsedDate)); dispatch(setView("Day"))}} className='dayIndex'>{iterator}</span></Link>) : 
          iterator === 1 ? 
          (
            <> 
              {isToday ? null : date.toLocaleString("default", {month:"short"}) + " "}
              <Link to='/Day'>
                <span onClick={() => {dispatch(setDate(parsedDate)); dispatch(setView("Day"))}} className={`dayIndex ${isToday ? "today" : ""}`}>
                  {iterator}
                </span>
              </Link>
            </>
          ) : 
            <Link to='/Day'>
              <span onClick={() => {dispatch(setDate(parsedDate)); dispatch(setView("Day"))}} className={`dayIndex ${isToday ? "today" : ""}`}>
                {iterator}
              </span>
            </Link>
            }
          {clickedItem.id == parsedDate ? 
          <Assignment key={1} title="???"/> : 
          null} 
          {clickedItem.id == parsedDate ? <NewTaskForm clickedItem={clickedItem}/>: null}
          {assignments.map(task => {
            if(task.name == parsedDate) {
                return <Assignment key={task.title + task.id} title={task.title} task={task} color={task.color}/>
            }
          })}
        </div>
    )
}