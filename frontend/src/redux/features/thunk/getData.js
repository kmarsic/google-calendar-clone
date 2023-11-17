import { createAsyncThunk } from "@reduxjs/toolkit";


const getData = createAsyncThunk("taskManager/getData", async () => {
    try {
        const response = await fetch("http://localhost:9000/tasks");
        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        return data;
    } catch(error) {
        console.log(error.message);
        return [];
    }
})

export default getData;