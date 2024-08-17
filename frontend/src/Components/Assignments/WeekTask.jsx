import { useDispatch } from "react-redux";
import { updateTaskTimeOnDrag } from "../../redux/features/taskSlicer.js";
import { calcEditPosition, hourTimeFormat } from "../../Fncs/indexFncs.js";
import { useState } from "react";
import { AssignmentContextMenu } from "./AssignmentContextMenu.jsx.jsx";
import { AssignmentModal } from "./AssignmentModal.jsx";
import { useDraggable } from "@dnd-kit/core";
import checkmark from "./../../styles/icons/checkmark.png"


export function WeekTask({task}) {
    const dispatch = useDispatch();

    const [editModalPosition, setEditModalPosition] = useState({top: 0, left: 0});
    const [editModal, setEditModal] = useState(false);

    const [previewModal, setPreviewModal] = useState(false);

    const [height, setHeight] = useState(determineHeight( task.startTime, task.endTime));

    const {node, attributes, listeners, setNodeRef, transform} = useDraggable({
        id: task.uuid,
        data:task
    })
    const defaultStyle = {
        backgroundColor: task.color,
        color: "white",
        top: timePosition(task.startTime) ,
        left: 4, 
        height: height
    }
    const style = transform ? { ...defaultStyle, transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`} : defaultStyle;

    const handleEditModal = () => {
        if (previewModal) return;
        setEditModal(!editModal);
    }

    function positionToTime(startTime, id, increment) {
        const newStartTime = startTime + increment;
        console.log(new Date(startTime), new Date(newStartTime))
        dispatch(updateTaskTimeOnDrag([id, newStartTime]));
    }

    return (
        <>
        <div 
        className="week-assignment" 
        id={task.uuid}
        ref={setNodeRef}
        onContextMenu={(e) => {e.preventDefault();calcEditPosition(e, setEditModalPosition, node);handleEditModal()}}
        onClick={() => {
            if (editModal) return;
            else setPreviewModal(!previewModal)
        }}
        style={style}
        {...listeners}
        {...attributes}
        >
                {task.type === "form-event" ? null : <img src={checkmark} style={{width: "12px"}}/>}
                <span>{task.title}</span>
                {task.type === "form-event" ? 
                <span>{hourTimeFormat(new Date(task.startTime))} - {hourTimeFormat(new Date(task.endTime))}</span> : 
                <span>{hourTimeFormat(new Date(task.startTime))}</span>}
        </div>
        {editModal && <AssignmentContextMenu task={task} modalPosition={editModalPosition} setEditModal={setEditModal}/>}
        {previewModal && <AssignmentModal task={task} container={node} setPreviewModal={setPreviewModal}/>}
        </>
    )
}

function timePosition( startTime ) {
    const time = new Date(startTime);
    const hours = time.getHours();
    const minutes = time.getMinutes() / 60;
    const pixelOffset = 2;
    const pixels = (hours * 48) + (minutes * 48) + pixelOffset;
    return pixels
}


function determineHeight( startTime, endTime) {
    const hours = 60000;
    const increment = 15;
    const margin = (endTime - startTime) / hours / increment;
    const height = 10 * margin + margin * 2 - 2;
    return height;
}