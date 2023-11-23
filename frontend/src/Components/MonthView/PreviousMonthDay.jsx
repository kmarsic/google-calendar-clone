/* eslint-disable react/prop-types */
import { Assignment } from "../Forms/Assignment";
import { NewTaskForm } from "../Forms/NewTaskForm";

export function PreviousMonthDay({date,clickedItem, handleClick,day, assignments,render}) {
    const parsedDate = Date.parse(date)
    return (
        <div
            id={parsedDate}
            onClick={(e) => handleClick(e)}
            className='box empty'
        >
          <span className='dayIndex'>{day}</span>
          {clickedItem.id ==  parsedDate ? <Assignment key={1} id={parsedDate} title="???"/>: null} 
          {clickedItem.id == parsedDate ? <NewTaskForm clickedItem={clickedItem} render={render}/>: null} 
          {assignments.map(task => {
            if(task.name == parsedDate) {
                return <Assignment key={task.title + task.id} title={task.title} id={task} color={task.color}/>
            }
          })}
        </div>
    )
}