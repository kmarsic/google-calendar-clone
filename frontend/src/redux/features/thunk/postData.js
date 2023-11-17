import { createAsyncThunk } from "@reduxjs/toolkit";


const postData = createAsyncThunk("taskManager/postData", async (updatedData) => {
    try {
        const response = await fetch(`http://localhost:9000/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
        })

        if (!response.ok) {
            throw new Error('Failed to update data');
        }

        const updated = await response.json();
        console.log('Updated data:', updated);
        return updated;
    } catch (error) {
        console.error('Error updating data:', error);
    }
})

export default postData