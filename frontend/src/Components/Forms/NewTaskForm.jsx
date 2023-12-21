/* eslint-disable react/prop-types */
import "./../../styles/_index.scss";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { faCalendarXmark, faCaretDown, faGripLines, faXmark, faBriefcase, faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import postData from "../../redux/features/thunk/postData";
import { EventForm } from "./EventForm";
import { TaskForm } from "./TaskForm";
import { addTask } from "../../redux/features/taskSlicer";
import { ColorForm } from "./ColorForm";

export function NewTaskForm ({clickedItem}) {
    const [formType, setFormType] = useState(true)
    const dispatch = useDispatch();
    const colorRef = useRef(null);
    const [isColorVisible, setIsColorVisible] = useState(false);
    const [color, setColor] = useState("#039be5")

    const handleColor = (e) => {
        setColor(e.target.value);
    }

    const handleClickOutside = (e) => {
        if (colorRef.current && !colorRef.current.contains(e.target)) {
          setIsColorVisible(false);
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
    
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        }
      }, []);

    const handleButtonClick = () => {
        setIsColorVisible(!isColorVisible);
    }

    const [formData, setFormData] = useState({
        list: "My Tasks",
        name: clickedItem.id,
        ID: crypto.randomUUID(),
        type: "task",
        updatedAt: "",
        createdAt: Date.parse(new Date()),
        time: new Date(clickedItem.date).toLocaleString("default", {weekday: "long" ,month: "long", day: "numeric"}),
        location : "",
        description: "",
        color: color,
        title: "",
        completed: false
    })

    const handleInputChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    function handleSubmit(e) {
        console.log(color)
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
            color: color,
            title: "",
          });
        
    }
    
    return(
    <div
    className="event-add"
    style={{
        top: `${clickedItem.y}px`,
        left: `${clickedItem.x}px`
    }}>
        <div className="form-dock">
            <FontAwesomeIcon 
            icon={faGripLines} 
            color="rgb(139, 143, 147)"
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
                name="title"
                autoFocus
                required
                placeholder="Add title"
                value={formData.title}
                autoComplete="off"
                onChange={(e) => handleInputChange(e)}
                />
            </div>
            <div className="event-type input-shell">
                <input type="text" value="Event" onClick={() => setFormType(true)}>
                </input>
                <input type="text" value="Task" onClick={() => setFormType(false)}>
                </input>
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
                <div className="color-input">
                    User Name
                    <div onClick={() => handleButtonClick()} style={{cursor : "pointer"}}>
                        <div className="color-switch" ref={colorRef} style={{backgroundColor : color}}>
                            {isColorVisible ? <ColorForm setColor={handleColor} handleInputChange={handleInputChange}/> : null}
                        </div>
                        <FontAwesomeIcon icon={faCaretDown}color="var(--text-body)" size="sm" style={{cursor : "pointer"}}/>
                    </div>
                </div>
            </div>
            <div className="icons">
                <FontAwesomeIcon
                icon={faBriefcase}
                color="var(--text-body"
                size="lg"/>
            </div>
            <div className="input-shell">
                
            </div>
        
        </form>
    </div>
    )
}