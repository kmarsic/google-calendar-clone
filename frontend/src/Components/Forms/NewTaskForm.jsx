/* eslint-disable react/prop-types */
import './../../styles/_index.scss';
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { faCalendarXmark, faGripLines, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import postData from "../../redux/features/thunk/postData";
import { EventForm } from "./EventForm";
import { TaskForm } from "./TaskForm";
import { addTask } from '../../redux/features/taskSlicer';

export function NewTaskForm ({clickedItem}) {
    const [formType, setFormType] = useState(true)
    const[transition, setTransition] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        setTimeout(() => {
            setTransition(true);
        }, 100)
    },[])

    const [formData, setFormData] = useState({
        list: "My Tasks",
        name: clickedItem.id,
        ID: crypto.randomUUID(),
        type: "task",
        updatedAt: "",
        createdAt: Date.parse(new Date()),
        time: new Date(clickedItem.date).toLocaleString("default", {weekday: 'long' ,month: "long", day: 'numeric'}),
        location : "",
        description: "",
        color: "#008000",
        title: "",
        completed: false
    })

    const handleInputChange = (e) => {
        setFormData({...formData, [e.target.id]: e.target.value})
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!formData.title) return;
        dispatch(postData(formData));
        dispatch(addTask(formData));
        setFormData({
            ...formData,
            ID: crypto.randomUUID(),
            updatedAt: "",
            location : "",
            description: "",
            color: "#008000",
            title: "",
          });
        
    }
    

    return(
    <div
    className={transition ? "event-add animate" : "event-add" }
    style={{
        top: `${clickedItem.y}px`,
        left: `${clickedItem.x}px`
    }}>
        <div className="form-dock">
            <FontAwesomeIcon 
            icon={faGripLines} 
            size="lg"/>
            <FontAwesomeIcon 
            icon={faXmark} 
            size="lg"/>
        </div>
        <form onSubmit={handleSubmit} className="form">
            <div className="input-shell">
                <input
                type="text"
                id="title"
                required
                placeholder="Add title"
                value={formData.title}
                autoComplete="off"
                onChange={(e) => handleInputChange(e)}
                />
            </div>
            <div className="event-type input-shell">
                <div onClick={() => setFormType(true)}>
                    <span>Event</span>
                </div>
                <div onClick={() => setFormType(false)}>
                    <span>Task</span>
                </div>
                <button style={{display: "none"}}></button>
            </div>

            {formType == true ? 
            <EventForm formData={formData} handleInputChange={handleInputChange}/> : 
            <TaskForm formData={formData} handleInputChange={handleInputChange}/>}

            <div className="icons">
                <FontAwesomeIcon 
                icon={faCalendarXmark}
                color="var(--text-body)"
                size="lg"/>
            </div>
            <div className="input-shell">
                <input
                id="color"
                type="color"
                style={{width : "100%"}}
                value={formData.color}
                onChange={(e) => handleInputChange(e)}
                />

            </div> 
        
        </form>
    </div>
    )
}