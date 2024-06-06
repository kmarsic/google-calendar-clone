import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { removeTask, setTaskColor } from "../../redux/features/taskSlicer";
import removeData from "../../redux/features/thunk/removeData";


export function AssignmentEdit({
  task,
  modalPosition,
  setEditModal,
}) {
    const dispatch = useDispatch();
  const editRef = useRef(null);

  const handleClickOutside = (e) => {
    if (!editRef.current.contains(e.target)) {
        setEditModal(false);
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
      style={{
        top: `${modalPosition.top}px`,
        left: `${modalPosition.left}px`,
      }}
      ref={editRef}
      className="assignment-edit"
    >
      <div className="delete">
        <FontAwesomeIcon
          icon={faTrashCan}
          color="var(--text-body)"
          onClick={() => {handleSubmit(task); setEditModal(false)}}
          size="lg"
          style={{ cursor: "pointer", marginLeft: "5px" }}
        />
        <span>Delete</span>
        <br className="break"/>
      </div>
      <ColorFormModal assignment={task} setEditModal={setEditModal} />
    </motion.div>,
    document.body
  );
}

export function ColorFormModal({ assignment, setEditModal }) {
    const dispatch = useDispatch();
  const handleColorChange = (e) => {
    dispatch(setTaskColor([assignment, e.target.value]))
    setEditModal(false);
  };
  const COLORS = {
    tomato: "#d50000",
    flamingo: "#e67c73",
    tangerine: "#f4511e",
    banana: "#f6bf26",
    sage: "#33b679",
    basil: "#0b8043",
    peacock: "#039be5",
    blueberry: "#3f51b5",
    grape: "#7986cb",
    lavender: "#8e24aa",
    graphite: "#616161",
  };

  return (
    <motion.div className="color-form-horizontal">
      {Object.entries(COLORS).map(([colorName, colorValue]) => (
        <div key={colorName}>
          {assignment.color == colorValue ? (
            <svg
              id="color-check"
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
            >
              <path
                fill="#FFF"
                d="m 0.154 8.092 c 0 0 2.304 2.594 2.764 3.6536 l 1.98 0 c 0.83 -2.534 4.054 -8.582 6.8184 -10.702 c 0.572 -0.736 -0.866 -1.04 -2.027 -0.5524 c -1.75 0.734 -5.05 6.344 -5.666 7.6928 c -0.874 0.23 -1.796 -1.474 -1.7968 -1.474 z"
              />
            </svg>
          ) : null}
          <input
            type="checkbox"
            name="color"
            value={colorValue}
            onClick={(e) => handleColorChange(e)}
            id={colorName}
            style={{ backgroundColor: colorValue }}
          />
        </div>
      ))}
    </motion.div>
  );
}
