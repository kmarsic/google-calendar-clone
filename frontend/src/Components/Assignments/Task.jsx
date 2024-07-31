import { useRef, useState } from "react";
import { AssignmentContextMenu } from "./AssignmentContextMenu.jsx";
import { calcEditPosition, calcModalPosition } from "../../Fncs/indexFncs";
import { AssignmentModal } from "./AssignmentModal";
import { AssignmentEditPage } from "./AssignmentEditPage/AssignmentEditPage.jsx";

export function Task({ task }) {
    const [contextModal, setContextModal] = useState(false);
    const [previewModal, setPreviewModal] = useState(false);
    const [editPage, setEditPage] = useState(false);
    const [modalPosition, setModalPosition] = useState({top: 0, left: 0});
    const editRef = useRef(null)

    const handleEditModal = () => {
        if (previewModal) return;
        setContextModal(!contextModal);
    }

    return (
        <>
        <div
        onContextMenu={(e) => {e.preventDefault();calcEditPosition(e, setModalPosition, editRef);handleEditModal()}}
        onClick={() => setPreviewModal(!previewModal)}
        className="assignment"
        ref={editRef}
        style={{ backgroundColor: task.color }}
        >
        <p>{task.title}</p>
        </div>
        {contextModal && <AssignmentContextMenu task={task} modalPosition={modalPosition} setEditModal={setContextModal}/>}
        {previewModal && <AssignmentModal task={task} container={editRef} setPreviewModal={setPreviewModal} setEditPage={setEditPage}/>}
        {editPage && (<AssignmentEditPage data={task}/>)}
        </>
    );
}
