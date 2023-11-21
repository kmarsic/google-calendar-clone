/* eslint-disable react/prop-types */
import { Assignment } from "../Forms/Assignment"
import { NewTaskForm } from "../Forms/NewTaskForm"

export function CurrentMonthDay({iterator, handleClick, date, clickedItem, isToday, assignments,render}) {
    const parsedDate = Date.parse(date)
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
          {clickedItem.id == parsedDate ? <Assignment key={1} name={parsedDate} title="???"/>: null} 
          {clickedItem.id == parsedDate ? <NewTaskForm clickedItem={clickedItem} render={render}/>: null}
          {assignments.map(user => {
            if(user.name == parsedDate) {
                return <Assignment key={user.title + user.id} title={user.title} id={user} color={user.color}/>
            }
          })}
        </div>
    )
}