import { createAsyncThunk } from "@reduxjs/toolkit";


const removeData = createAsyncThunk("taskManager/removeData", async (id) => {
    try {
        const response = await fetch(`http://localhost:9000/tasks`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(id)
        });

        if (!response.ok) {
            throw new Error('Failed to update data');
        }

        const removed = await response.json();
        console.log('Removed:', removed);
        return removed;
    } catch (error) {
        console.error('Error updating data:', error);
    }
})

export default removeData