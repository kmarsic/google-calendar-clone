import { useRef, useState } from "react";
import { AssignmentEdit } from "./AssignmentEdit";
import { calcEditPosition, calcModalPosition } from "../../Fncs/indexFncs";
import { AssignmentModal } from "./AssignmentModal";

export function Task({ task }) {
    const [editModal, setEditModal] = useState(false);
    const [previewModal, setPreviewModal] = useState(false);
    const [modalPosition, setModalPosition] = useState({top: 0, left: 0});
    const editRef = useRef(null)

    const handleEditModal = () => {
        setEditModal(true);
    }
    console.log(previewModal)

    return (
        <>
        <div
        onContextMenu={(e) => {e.preventDefault();calcEditPosition(e, setModalPosition, editRef);handleEditModal()}}
        onMouseDown={() => setPreviewModal(!previewModal)}
        className="assignment"
        ref={editRef}
        style={{ backgroundColor: task.color }}
        >
        <p>{task.title}</p>
        {editModal && <AssignmentEdit task={task} modalPosition={modalPosition} setEditModal={setEditModal}/>}
        </div>
        {previewModal && <AssignmentModal task={task} container={editRef} setPreviewModal={setPreviewModal}/>}
        </>
    );
}
