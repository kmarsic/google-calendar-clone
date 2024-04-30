/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import removeData from "../../redux/features/thunk/removeData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { allTasks } from "../../redux/features/taskSlicer";
import { removeTask } from "../../redux/features/taskSlicer";
import { setDate, setView } from "../../redux/features/dateSlicer";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function Assignment({date}) {
    const dispatch = useDispatch()
    const assignments = useSelector(allTasks);

    const [overflowVisible, setOverflowVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const handleSubmit = (e,task) => {
        e.preventDefault();
        if (e.target.children[0].innerText == "???") return
        dispatch(removeData(task));
        dispatch(removeTask(task.ID));
    }

    function mapAssignments(list) {
        const filtered = list.filter((task) => {
            return task.startDate == date
        })
        const mapped = filtered.map((task, index) => {
            return <Task key={index} handleSubmit={handleSubmit} task={task}/>
        })
        return mapped
    }

    useEffect(() => {
        const filtered = assignments.filter((task) => {
            return task.startDate == date
        })
        if (filtered.length < 4) {
            setOverflowVisible(false);
        } else if (filtered.length > 4) {
            setOverflowVisible(true)
        }
    }, [assignments])

    return (
        <>
            {overflowVisible ? 
            <Overflow list={assignments} date={date} handleSubmit={handleSubmit} setOverflowVisible={setOverflowVisible} setModalVisible={setModalVisible}/> 
            : 
            mapAssignments(assignments)}
            {modalVisible ? 
            <OverflowModal list={assignments} setModalVisible={setModalVisible} date={date} handleSubmit={handleSubmit}/> 
            : null}
        </>
    )
}

function Task({handleSubmit, task}) {
    return (
        <form onSubmit={(e) => handleSubmit(e, task)} className='assignment' style={{backgroundColor: task.color}}>
                <p>{task.title}</p>
        </form>
    )
}

function Overflow({list, date, handleSubmit, setModalVisible}) {
    const filtered = list.filter((task) => {
        return task.startDate == date
    })
    const mappedList = filtered.map((task,index) => {
        if (index > 3) {
            return
        } else return <Task key={index} handleSubmit={handleSubmit} task={task}/>
    })
    return (
        <>
            {mappedList}
            <div onClick={() => setModalVisible(true)} className="assignment-overflow">{mappedList.length - 4} more</div>
        </>
    )
}

function OverflowModal({list, setModalVisible, handleSubmit, date}) {
    const dispatch = useDispatch()
    const day = new Date(date).toLocaleString("default", {weekday: "short"}).toUpperCase();
    const newDate = new Date(date).getDate();
    const filtered = list.filter((task) => {
        return task.startDate == date
    })
    const mapped = filtered.map((task, index) => {
        return <Task key={index} handleSubmit={handleSubmit} task={task}/>
    })
    return (
        <>
            <div className="assignment-overflow-modal-overlay" onClick={() => setModalVisible(false)}></div>
            <div className="assignment-overflow-modal">
                <div className="modal-div">
                    <div>{day}</div>
                    <div>
                        <Link to={"/Day"}><span onClick={() => dispatch(setDate(date))}>{newDate}</span></Link>
                    </div>
                    <FontAwesomeIcon className="modal-exit" icon={faXmark} onClick={() => setModalVisible(false)}/>
                </div>
                <div>
                    {mapped}
                </div>
            </div>
        </>

    )
}