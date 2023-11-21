/* eslint-disable react/prop-types */
import { Assignment } from "../Forms/Assignment";
import { NewTaskForm } from "../Forms/NewTaskForm";

export function NextMonthDay({date, handleClick, clickedItem, iterator, assignments, render}) {
    const parsedDate = Date.parse(date)

    return (
        <div
            key={parsedDate}
            id={parsedDate}
            onClick={(e) => handleClick(e)}
            className='box empty'
        >
          {iterator === 1 ? 
          date.toLocaleString("default", {month:"short"}) + " " : ""}
          <span className='dayIndex'>{iterator}</span>
          {clickedItem.id == parsedDate ? <Assignment key={1} name={parsedDate} title="???"/>: null} 
          {clickedItem.id == parsedDate ? <NewTaskForm clickedItem={clickedItem} id={parsedDate} render={render}/>: null}
          {assignments.map(user => {
            if(user.name == parsedDate) {
                return <Assignment key={user.title + user.id} title={user.title} id={user} color={user.color}/>
            }
          })}
          
        </div>
    )
}