import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { allTasks } from "../../redux/features/taskSlicer";
import { calcEditPosition, hourTimeFormat } from "../../Fncs/indexFncs";
import { useRef, useState } from "react";
import { AssignmentEdit } from "./AssignmentEdit";

export function WeekAssignment({date}) {
    const assignments = useSelector(allTasks);

    function mapAssignments(list) {
        const filtered = list.filter((task) => {
            return task.startDate == date
        })
        const mapped = filtered.map((task, index) => {
            return <Task key={index} task={task}/>
        })
        return mapped
    }

    return (
        <>
        {mapAssignments(assignments)}
        </>
    )
}

function Task({task}) {
    const [modalPosition, setModalPosition] = useState({top: 0, left: 0});
    const [editModal, setEditModal] = useState(false);

    const editRef = useRef(null)

    const stack = stackingContext();
    const startTime = task.startTime;
    const endTime = task.endTime
    const pixels = timePosition(startTime);
    const height = determineHeight(startTime, endTime);

    const handleEditModal = () => {
        setEditModal(true);
    }
    return (
        <motion.div 
        className='week-assignment' 
        ref={editRef}
        onContextMenu={(e) => {e.preventDefault();calcEditPosition(e, setModalPosition, editRef);handleEditModal()}}
        style={{backgroundColor: task.color, top: pixels, height: height, zIndex: stack}}
        >
                <span>{task.title}</span>
                <span>{hourTimeFormat(new Date(startTime))} - {hourTimeFormat(new Date(endTime))}</span>
                {editModal && <AssignmentEdit task={task} modalPosition={modalPosition} setEditModal={setEditModal}/>}
        </motion.div>
    )
}

function stackingContext( list ) {
    const timeline = 0;
    
    return timeline
}

function timePosition( startTime ) {
    const time = new Date(startTime);
    const hours = time.getHours();
    const minutes = time.getMinutes() / 60;
    const pixels = (hours * 48) + (minutes * 48) + 2;
    return pixels
}

function determineHeight( startTime, endTime) {
    const margin = (endTime - startTime) / 60000 / 15;
    const height = 10 * margin + margin * 2 - 2;
    return height;
}