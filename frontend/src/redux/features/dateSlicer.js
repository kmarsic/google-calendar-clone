import { createSlice } from "@reduxjs/toolkit";

export const dateManager = createSlice({
    name:'dateManager',
    initialState: {
        selectedDate: Date.parse(new Date()),
        today: {
            dayIndex: "",
            dayString: ""
        },
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
       setToday(state, action) {
        state.today = action.payload
       }
    }
})

export const {nextMonth, previousMonth, setToday} = dateManager.actions;

export const currentDate = (state) => state.dateList.selectedDate;
export const currentDay = (state) => state.dateList.today;

export default dateManager.reducer;