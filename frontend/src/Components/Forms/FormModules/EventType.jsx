/* eslint-disable react/prop-types */
import { useContext } from "react";
import { EventForm } from "./EventForm";
import { TaskForm } from "./TaskForm";
import { EventChangeContext, EventDataContext } from "../formContext";

export function EventType() {
    const formData = useContext(EventDataContext);
    const dispatchReducer = useContext(EventChangeContext);
    const handleEventTypeChange = (typ) => {
        dispatchReducer({type: "type", payload: typ})
    }

    return (
    <>
        <div className="event-type">
            <button id="event" value="event" onClick={(e) => {e.preventDefault(); handleEventTypeChange("event")}}>
                <span>Event</span>
            </button>
            <button id="task" onClick={(e) => {e.preventDefault();handleEventTypeChange("task")}}>    
                <span>Task</span>
            </button>            
            <button style={{ display: "none" }}></button>
        </div>
        {formData.type === "event" ? <EventForm/> : <TaskForm/>}
    </>
        

    )
}