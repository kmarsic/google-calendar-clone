/* eslint-disable react/prop-types */
import { EventForm } from "./EventForm";
import { TaskForm } from "./TaskForm";
import { useDispatch, useSelector } from "react-redux";
import { formData, handleFormInputs } from "../../../redux/features/formSlicer";

export function EventType() {
    const form = useSelector(formData)
    const dispatch = useDispatch();
    const handleEventTypeChange = (type) => {
        dispatch(handleFormInputs({type: "type", payload: type}))
    }

    return (
    <>
        <div className="event-type">
            <button id="event" value="event" onClick={(e) => {e.preventDefault(); handleEventTypeChange("form-event")}}>
                <span>Event</span>
            </button>
            <button id="task" onClick={(e) => {e.preventDefault(); handleEventTypeChange("form-task")}}>    
                <span>Task</span>
            </button>            
            <button style={{ display: "none" }}></button>
        </div>
        {form.type === "form-task" ? <TaskForm/> : <EventForm/>}
    </>
        

    )
}