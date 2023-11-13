import { createSlice } from "@reduxjs/toolkit";

export const dateManager = createSlice({
    name:'dateManager',
    initialState: {
        selectedDate: Date.parse(new Date()),
    },
    reducers: {
        nextMonth(state) {
            const date = new Date(state.selectedDate)
            const nextMonth = date.getMonth() + 1;
            const nextYear = date.getFullYear();
            const newDate = new Date(nextYear, nextMonth);
            state.selectedDate = Date.parse(newDate);
        },
        
        previousMonth(state) {
            const date = new Date(state.selectedDate)
            const prevMonth = date.getMonth() - 1;
            const prevYear = date.getFullYear();
            const newDate= new Date(prevYear, prevMonth);
            state.selectedDate = Date.parse(newDate)
       },

        setNewDate(state, action) {
            state.selectedDate = action.payload;
        },
    }
})

export const {nextMonth, previousMonth, setNewDate} = dateManager.actions;

export const currentDate = (state) => state.dateList.selectedDate;

export default dateManager.reducer;