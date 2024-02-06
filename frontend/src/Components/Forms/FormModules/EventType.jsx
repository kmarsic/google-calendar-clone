/* eslint-disable react/prop-types */
export function EventType({setFormType}) {
    return (
        <div className="event-type">
            <button id="event" onClick={(e) => {e.preventDefault(); setFormType(true)}}>
                <span>Event</span>
            </button>

            <button id="task" onClick={(e) => {e.preventDefault();setFormType(false)}}>    
                <span>Task</span>
            </button>
            
            <button style={{ display: "none" }}></button>
        </div>
    )
}