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
        const uuid = action.payload[0].uuid;
        const taskColor = action.payload[1];
        state.data.map(task => {
            if (task.uuid === uuid) {
                task.color = taskColor
            }
        })
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
            state.allTasks = state.allTasks.filter(task => task.completed === false)
            state.activeTasks = state.allTasks.filter(task => task.completed === false)
            state.completedTasks = state.allTasks.filter(task => task.completed === true)
        },

        toggleCompletedTasks(state, action) { 
            const { id, completed } = action.payload;
            state.allTasks = state.allTasks.map(task => task.id === id ? {...task, completed} : task)
            state.activeTasks = state.allTasks.filter(task => task.completed === false)
            state.completedTasks = state.allTasks.filter(task => task.completed === true)
        },
        modifyTask(state, action) {
            const [type, taskData, payload] = action.payload;
            state.data.map(task => {
                if(task.uuid === taskData.uuid) {
                    console.log(task[type])
                    task[type] = payload;
                }
            })
            
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