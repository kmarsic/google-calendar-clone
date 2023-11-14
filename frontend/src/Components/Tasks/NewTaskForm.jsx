/* eslint-disable react/prop-types */
import { useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
import './../../styles/newTaskForm.scss';

export function NewTaskForm ({render}) {

    const [formData, setFormData] = useState({
        list: "My Tasks",
        ID: nanoid(),
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

    const updateData = async (updatedData) => {
        try {
            const response = await fetch(`http://localhost:9000/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedData)
            });
    
            if (!response.ok) {
                throw new Error('Failed to update data');
            }
    
            const updated = await response.json();
            console.log('Updated data:', updated);
            return updated;
        } catch (error) {
            console.error('Error updating data:', error);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!formData.title) return;
        updateData(formData);
        setFormData({
            list: "My Tasks",
            ID: nanoid(),
            type: "task",
            updatedAt: "",
            time: "",
            location: "",
            description: "",
            color: "#008000",
            title: ""
          });
        render()
        
    }
    

    return(
    <div className="event-add">
        <form onSubmit={handleSubmit} className="form">
            <div>
                <input 
                type="text"
                id="title"
                required
                placeholder="Create a new task..."
                value={formData.title}
                onChange={(e) => handleInputChange(e)}
                />
            </div>
            <div className="event-type">
                <div><span>Event</span></div>
                <div><span>Task</span></div>,
                <button style={{display: "none"}}></button>
            </div>
            <div className="date-time">
                <div>
                    <input 
                    type="text"
                    id="time" 
                    placeholder="Date and time"
                    value={formData.time}
                    onChange={(e) => handleInputChange(e)}>
                    </input>
                </div>
            </div>
            <div>
                <div>
                    <input 
                    type="text"
                    id="location"
                    placeholder="Location"
                    value={formData.location}
                    onChange={(e) => handleInputChange(e)}>
                    </input>
                </div>
            </div>
            <div>
                <div>
                    <input 
                    type="text"
                    id="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={(e) => handleInputChange(e)}
                    >
                    </input>
                </div>
            </div>
            <hr />
            <div>
                <div>
                    <label htmlFor="color">Pick a color </label>
                    <input
                    id="color"
                    type="color"
                    value={formData.color}
                    onChange={(e) => handleInputChange(e)}
                     />
                </div>
            </div> 
        
        </form>
    </div>
    )
}