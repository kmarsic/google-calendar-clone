import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPen, faEnvelope, faEllipsisVertical, faXmark, faCalendar, faCalendarDay, faTrash } from "@fortawesome/free-solid-svg-icons";
import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { removeTask } from "../../redux/features/taskSlicer";
import removeData from "../../redux/features/thunk/removeData";
import { inputTimeFormat } from "../../Fncs/Form/timeFormat";

export function AssignmentModal({ setPreviewModal, container, task }) {
    const dispatch = useDispatch();
    const modalRef = useRef(null);
    
    const position = container.current.getBoundingClientRect();

    const handleClickOutside = (e) => {
        if (!modalRef.current.contains(e.target)) {
          setPreviewModal(false);
        }
      };
    
      const handleSubmit = (task) => {
        dispatch(removeData(task));
        dispatch(removeTask(task.uuid));
      };
    
      useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
    
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, []);
    return createPortal(
        <motion.div
        ref={modalRef}
        className="assignment-modal"
        style={{top: position.top, right: position.right}}
        >
            <div className="assignment-modal-nav">
                <FontAwesomeIcon color="var(--text-body)" className="btn-round" size="lg" icon={faPen}/>
                <FontAwesomeIcon color="var(--text-body)" className="btn-round" size="lg" icon={faTrashCan} onClick={() => handleSubmit(task)}/>
                <FontAwesomeIcon color="var(--text-body)" className="btn-round" size="lg" icon={faEnvelope}/>
                <div onClick={() => setPreviewModal(false)}>
                    <FontAwesomeIcon icon={faXmark} size="xl" className="btn-round"/>
                </div>
            </div>
            <div className="assignment-modal-body">
                <div className="assignment-modal-color" style={{backgroundColor: task.color}}></div>
                <div>
                    <h2 style={{fontWeight: "normal"}}>{task.title}</h2>
                    <div>{inputTimeFormat(task.startTime)}</div>
                </div>
                <FontAwesomeIcon color="var(--text-body)" size="xl" icon={faCalendarDay}/>
                <div>Kristijan Maršić</div>
            </div>
        </motion.div>, document.body
    )
}