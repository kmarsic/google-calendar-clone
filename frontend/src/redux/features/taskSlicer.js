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
            console.log(action)
            state.data = state.data.filter(task => task.ID != action.payload)
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
        modifyTasks(state, action) {
            const {activeTab, reorderedTodos} = action.payload;
            switch (activeTab) {
                case ("active"):
                    state.activeTasks = reorderedTodos
                    break;
                case ("all"):
                    state.allTasks = reorderedTodos
                    break;
                case ("completed"):
                    state.completedTasks = reorderedTodos
                    break;
            }
            
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
export const {addTask, removeTask, clearCompletedTasks, toggleCompletedTasks, modifyTasks} = taskManager.actions;

export const allTasks = (state) => state.taskList.data;


export default taskManager.reducer;