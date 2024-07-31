import { motion, useInView } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPen, faEnvelope, faXmark, faCalendarDay } from "@fortawesome/free-solid-svg-icons";
import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { removeTask } from "../../redux/features/taskSlicer";
import removeData from "../../redux/features/thunk/removeData";
import { inputTimeFormat } from "../../Fncs/Form/timeFormat";

export function AssignmentModal({ setPreviewModal, container, task, setEditPage }) {
    const dispatch = useDispatch();
    const modalRef = useRef(null);

    const position = container.current.getBoundingClientRect();

    const handleModalLeft = () => {
      if (window.innerWidth < 1000) {
        return window.innerWidth - 550
      } else {
        if (position.left < 460) {
          return position.left + container.current.offsetWidth + 10;
        } else return position.left - 460;
      }
    }

    const handleModalTop = () => {
      const bottom = window.innerHeight - position.top;
      if (bottom < 140) {
        return window.innerHeight - 170
      } else return position.top
    }

    const handleClickOutside = (e) => {
        if (!modalRef.current.contains(e.target) && !container.current.contains(e.target)) {
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
        <>
          <motion.div
        ref={modalRef}
        className="assignment-modal"
        style={{top: handleModalTop(), left: handleModalLeft()}}
        >
            <div className="assignment-modal-nav">
                <FontAwesomeIcon color="var(--text-body)" className="btn-round" icon={faPen} onClick={() => setEditPage(true)}/>
                <FontAwesomeIcon color="var(--text-body)" className="btn-round" icon={faTrashCan} onClick={() => handleSubmit(task)}/>
                <FontAwesomeIcon color="var(--text-body)" className="btn-round" icon={faEnvelope}/>
                <div onClick={() => setPreviewModal(false)}>
                    <FontAwesomeIcon icon={faXmark} className="btn-round"/>
                </div>
            </div>
            <div className="assignment-modal-body">
                <div className="assignment-modal-color" style={{backgroundColor: task.color}}></div>
                <div>
                    <h2 style={{fontWeight: "normal"}}>{task.title}</h2>
                    <div>{inputTimeFormat(task.startTime)}</div>
                </div>
                <FontAwesomeIcon color="var(--text-body)" size="lg" icon={faCalendarDay}/>
                <div>Kristijan Maršić</div>
            </div>
        </motion.div>
        </>, document.body
    )
}