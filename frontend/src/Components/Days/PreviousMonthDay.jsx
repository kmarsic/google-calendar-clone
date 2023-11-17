/* eslint-disable react/prop-types */
import { Assignment } from "../Tasks/Assignment";
import { NewTaskForm } from "../Tasks/NewTaskForm";
import './../../styles/monthBox.scss'

export function PreviousMonthDay({date,clickedItem, handleClick,day, assignments,render}) {
    const parsedDate = Date.parse(date)
    return (
        <div
            id={parseInt(parsedDate)}
            onClick={(e) => handleClick(e)}
            className='box empty'
        >
          <span className='dayIndex'>{day}</span>
          {clickedItem.id ==  parsedDate ? <Assignment key={1} name={parsedDate} title="???"/>: null} 
          {clickedItem.id == parsedDate ? <NewTaskForm clickedItem={clickedItem} render={render}/>: null} 
          {assignments.map(user => {
            if(user.name == parsedDate) {
                return <Assignment key={user.title + user.id} title={user.title} id={user}/>
            }
          })}
        </div>
    )
}