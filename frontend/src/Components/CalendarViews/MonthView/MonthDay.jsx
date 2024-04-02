/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { Assignment } from "./../../Forms/Assignment"
import { setDate, setView } from "../../../redux/features/dateSlicer";
import { Link } from "react-router-dom";

export function MonthDay({date, iterator,isToday, previous, next}) {
    const parsedDate = Date.parse(date);
    const dispatch = useDispatch();

    return (
        <div 
        id={parsedDate} 
        className={previous || next ? "box empty" : "box"}
        >
          {previous ? 
          (<Link to='/Day'><span onClick={() => {dispatch(setDate(parsedDate)); dispatch(setView("Day"))}} className='dayIndex'>{iterator}</span></Link>) : 
          iterator === 1 ? 
          (
            <> 
              {isToday ? null : date.toLocaleString("default", {month:"short"}) + " "}
              <Link to='/Day'>
                <span key={"ff" + iterator} onClick={() => {dispatch(setDate(parsedDate)); dispatch(setView("Day"))}} className={`dayIndex ${isToday ? "today" : ""}`}>
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
          <Assignment date={parsedDate}/>
        </div>
    )
}