import checkmark from "./../../styles/icons/checkmark.png";
import checkmarkDark from "./../../styles/icons/checkmark-dark.png";

export function PlaceholderTask({task}) {
    const defaultStyle = {
        backgroundColor: task.allDay ? task.color : "transparent",
        color: task.allDay ? "white" : "black",
        left: 4,
    }

    const time = new Date(task.startTime);
    return (
        <>
        <div
        className="assignment"
        style={defaultStyle}
        >
        <span style={{backgroundColor: task.color}} className={task.allDay ? null : "assignment-allDay"}></span>
        {task.allDay ? null : time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        {task.type === "form-event" ? null : task.allDay ? (<img src={checkmark} style={{width: "12px"}}/>) : (<img src={checkmarkDark} style={{width: "12px"}}/>)}
        <span>{task.title == "" ? "(No title)" : task.title}</span>
        </div>
        </>
    );
}
