import { createSlice } from "@reduxjs/toolkit";

export const dateManager = createSlice({
    name:'dateManager',
    initialState: {
        mainDate: Date.parse(new Date()),
        miniDate: Date.parse(new Date()),
    },
    reducers: {
        nextMonth(state) {
            const date = new Date(state.mainDate)
            const nextMonth = date.getMonth() + 1;
            const nextYear = date.getFullYear();
            const newDate = new Date(nextYear, nextMonth);
            state.miniDate = Date.parse(newDate);
            state.mainDate = Date.parse(newDate);
        },
        nextMonthMini(state) {
            const date = new Date(state.miniDate)
            const nextMonth = date.getMonth() + 1;
            const nextYear = date.getFullYear();
            const newDate = new Date(nextYear, nextMonth);
            state.miniDate = Date.parse(newDate);
        },
        
        previousMonth(state) {
            const date = new Date(state.mainDate)
            const prevMonth = date.getMonth() - 1;
            const prevYear = date.getFullYear();
            const newDate= new Date(prevYear, prevMonth);
            state.miniDate = Date.parse(newDate);
            state.mainDate = Date.parse(newDate);
       },
        previousMonthMini(state) {
            const date = new Date(state.miniDate)
            const prevMonth = date.getMonth() - 1;
            const prevYear = date.getFullYear();
            const newDate= new Date(prevYear, prevMonth);
            state.miniDate = Date.parse(newDate)
        },
        setDate(state, action) {
            const newDate = action.payload;
            state.mainDate = newDate;
            state.miniDate = newDate;
        }

    }
})

export const {nextMonth, previousMonth, previousMonthMini, nextMonthMini, setDate} = dateManager.actions;

export const currentDate = (state) => state.dateList.mainDate;
export const miniDate = (state) => state.dateList.miniDate;

export default dateManager.reducer;