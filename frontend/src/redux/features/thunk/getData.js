import { createAsyncThunk } from "@reduxjs/toolkit";


const getData = createAsyncThunk("taskManager/getData", async () => {
    try {
        const response = await fetch("http://localhost:9000/fetchItems");
        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        console.log(data)
        return data;
    } catch(error) {
        console.log(error.message);
        return [];
    }
})

export default getData;