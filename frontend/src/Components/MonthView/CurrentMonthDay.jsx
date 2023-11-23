/* eslint-disable react/prop-types */
import { Assignment } from "../Forms/Assignment"
import { NewTaskForm } from "../Forms/NewTaskForm"

export function CurrentMonthDay({iterator, handleClick, date, clickedItem, isToday, assignments,render}) {
    const parsedDate = Date.parse(date);
    return (
        <div
            id={parsedDate}
            onClick={(e) => handleClick(e)}
            className="box"
        >
          {iterator === 1 ? (
              <> 
                {date.toLocaleString("default", {month:"short"}) + " "}
                <span className={`dayIndex ${isToday ? "today" : ""}`}>{iterator}</span>
              </>) : 
              <span className={`dayIndex ${isToday ? "today" : ""}`}>{iterator}</span>

            }
          {clickedItem.id == parsedDate ? <Assignment key={1} title="???"/>: null} 
          {clickedItem.id == parsedDate ? <NewTaskForm clickedItem={clickedItem} render={render}/>: null}
          {assignments.map(task => {
            if(task.name == parsedDate) {
                return <Assignment key={task.title + task.id} title={task.title} task={task} color={task.color}/>
            }
          })}
        </div>
    )
}