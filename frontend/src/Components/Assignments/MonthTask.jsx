import { useRef, useState } from "react";
import { AssignmentContextMenu } from "./AssignmentContextMenu.jsx.jsx";
import { calcEditPosition } from "../../Fncs/indexFncs.js";
import { AssignmentModal } from "./AssignmentModal.jsx";
import { AssignmentEditPage } from "./AssignmentEditPage/AssignmentEditPage.jsx";
import checkmark from "./../../styles/icons/checkmark.png";
import checkmarkDark from "./../../styles/icons/checkmark-dark.png";

export function MonthTask({ task }) {

    const [contextModal, setContextModal] = useState(false);
    const [previewModal, setPreviewModal] = useState(false);
    const [editPage, setEditPage] = useState(false);
    const [modalPosition, setModalPosition] = useState({top: 0, left: 0});
    const editRef = useRef(null)

    const handleEditModal = () => {
        if (previewModal) return;
        setContextModal(!contextModal);
    }

    const defaultStyle = {
        backgroundColor: task.allDay ? task.color : "transparent",
        color: task.allDay ? "white" : "black",
        left: 4,
    }

    const time = new Date(task.startTime);

    return (
        <>
        <div
        onContextMenu={(e) => {e.preventDefault();calcEditPosition(e, setModalPosition, editRef);handleEditModal()}}
        onClick={() => setPreviewModal(!previewModal)}
        className="assignment"
        ref={editRef}
        style={defaultStyle}
        >
        <span style={{backgroundColor: task.color}} className={task.allDay ? null : "assignment-allDay"}></span>
        {task.allDay ? null : time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        {task.type === "form-event" ? null : task.allDay ? (<img src={checkmark} style={{width: "12px"}}/>) : (<img src={checkmarkDark} style={{width: "12px"}}/>)}
        <span>{task.title}</span>
        </div>
        {contextModal && <AssignmentContextMenu task={task} modalPosition={modalPosition} setEditModal={setContextModal}/>}
        {previewModal && <AssignmentModal task={task} container={editRef} setPreviewModal={setPreviewModal} setEditPage={setEditPage}/>}
        {editPage && (<AssignmentEditPage data={task}/>)}
        </>
    );
}
