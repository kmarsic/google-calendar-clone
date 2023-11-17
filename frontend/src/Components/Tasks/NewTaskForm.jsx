/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import './../../styles/newTaskForm.scss';
import { useDispatch } from "react-redux";
import postData from "../../redux/features/thunk/postData";
import getData from "../../redux/features/thunk/getData";

export function NewTaskForm ({clickedItem}) {

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
        type: "task",
        updatedAt: "",
        location : "",
        time: "",
        description: "",
        color: "#008000",
        title: "",
        completed: false
    })

    const handleInputChange = (e) => {
        setFormData({...formData, [e.target.id]: e.target.value})
    }


    async function handleSubmit(e) {
        e.preventDefault();
        if (!formData.title) return;
        await dispatch(postData(formData));
        setFormData({
            list: "My Tasks",
            type: "task",
            name: clickedItem.id,
            updatedAt: "",
            time: "",
            location: "",
            description: "",
            color: "#008000",
            title: ""
          });
        await dispatch(getData())
        
    }
    

    return(
    <div
    className={transition ? "event-add animate" : "event-add" }
    style={{
        top: `${clickedItem.y}px`,
        left: `${clickedItem.x}px`
    }}>
        <form onSubmit={handleSubmit} className="form">
            <div className="shell">
                <input 
                type="text"
                id="title"
                required
                placeholder="Add title and time"
                value={formData.title}
                onChange={(e) => handleInputChange(e)}
                />
            </div>
            <div className="event-type shell">
                <div><span>Event</span></div>
                <div><span>Task</span></div>
                <button style={{display: "none"}}></button>
            </div>
            <div className="date-time shell">
                <input 
                type="text"
                id="time" 
                placeholder="Date and time"
                value={formData.time}
                onChange={(e) => handleInputChange(e)}>
                </input>
            </div>
            <hr className="line"/>
            <div className="shell">
                <input 
                type="text"
                id="location"
                placeholder="Location"
                value={formData.location}
                onChange={(e) => handleInputChange(e)}>
                </input>
            </div>
            <hr className="line"/>
            <div className="shell">
                <input 
                type="text"
                id="description"
                placeholder="Description"
                value={formData.description}
                onChange={(e) => handleInputChange(e)}
                >
                </input>
            </div>
            <hr className="line"/>
            <div className="shell">
                <label htmlFor="color">Pick a color </label>
                <input
                id="color"
                type="color"
                value={formData.color}
                onChange={(e) => handleInputChange(e)}
                />

            </div> 
        
        </form>
    </div>
    )
}