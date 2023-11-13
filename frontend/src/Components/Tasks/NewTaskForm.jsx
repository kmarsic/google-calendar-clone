/* eslint-disable react/prop-types */
import { useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
import './../../styles/newTaskForm.scss';

export function NewTaskForm () {

    const [inputValue, setInputValue] = useState("");

    const onInputChange = e => setInputValue(e.target.value);

    const updateData = async (updatedData) => {
        try {
            const response = await fetch(`http://localhost:9000/tasks`, {
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
        if (e.type === "submit") {
                e.preventDefault();
            }
        if (inputValue === "") return;
        const updatedData = { 
            id: nanoid(),
            title: inputValue,
            completed: false
            }
        updateData(updatedData)
        
        setInputValue("");
        }
    

    return(
    <div className="event-add">
        <form onSubmit={handleSubmit} className="form">
            <div>
                <input type="text"
                id="new-input"
                placeholder="Create a new task..."
                value={inputValue}
                onChange={onInputChange}
                />
            </div>
            <div className="event-type">
                <div><span>Event</span></div>
                <div>Task</div>
            </div>
        
        </form>
    </div>
    )
}