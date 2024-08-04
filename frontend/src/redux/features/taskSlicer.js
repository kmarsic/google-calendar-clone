import { createSlice } from "@reduxjs/toolkit";
import getData from "./thunk/getData";

export const taskManager = createSlice({
    name:'taskManager',
    initialState: {
        data: [],
        isSuccess: false,
        message: "",
        loading: false,
    },
    reducers: {
        addTask(state, action) { 
            state.data.push(action.payload)
        },
        
        removeTask(state,action) {
            state.data = state.data.filter(task => task.uuid !== action.payload)
       },
       setTaskColor(state, action) {
        const { uuid, color } = action.payload;
        state.data.forEach(task => {
            if (task.uuid === uuid) {
                task.color = color;
            }
        });
    },
       changeTaskOnDrag(state,action) {
        const uuid = action.payload[0];
        const newDate = action.payload[1];
        console.log(newDate)
        state.data.map(task => {
            if(task.uuid === uuid) {
                const duration = task.endTime - task.startTime;
                task.startDate = newDate;
                task.endDate = newDate;
                task.startTime = newDate;
                task.endTime = newDate + duration;
            }
        })
       },
       updateTaskTimeOnDrag(state,action) {
        const uuid = action.payload[0];
        const newTime = action.payload[1];
        state.data.map(task => {
            if(task.uuid === uuid) {
                const duration = task.endTime - task.startTime;
                task.startTime = newTime;
                task.endTime = newTime + duration;
            }
        })
       },
       clearCompletedTasks(state) {
        state.data = state.data.filter(task => !task.completed);
    },

        toggleCompletedTasks(state, action) {
            const { id, completed } = action.payload;
            state.data.forEach(task => {
                if (task.id === id) {
                    task.completed = completed;
                }
            });
        },
        modifyTask(state, action) {
            const { type, uuid, payload } = action.payload;
            state.data.forEach(task => {
                if (task.uuid === uuid) {
                    task[type] = payload;
                }
            });
        }
    },
    extraReducers:{
        [getData.pending] : ( state) => {
            state.loading = true;
        },
        [getData.fulfilled] : ( state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.isSuccess = true;
             
        },
        [getData.rejected] : ( state, action) => {
            state.loading = false;
            state.isSuccess = false;
            state.message = action.payload;
             
        }
    },
})
export const {addTask, removeTask, clearCompletedTasks, toggleCompletedTasks, modifyTask, setTaskColor, changeTaskOnDrag, updateTaskTimeOnDrag} = taskManager.actions;

export const allTasks = (state) => state.taskList.data;


export default taskManager.reducer;