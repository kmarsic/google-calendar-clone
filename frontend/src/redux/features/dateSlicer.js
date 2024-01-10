import { createSlice } from "@reduxjs/toolkit";

export const dateManager = createSlice({
    name:'dateManager',
    initialState: {
        mainDate: Date.parse(new Date()),
        miniDate: Date.parse(new Date()),
        focusDate: Date.parse(new Date()),
        currentView: "Month",
    },
    reducers: {
        nextYear(state) {
            const date = new Date(state.mainDate)
            const nextYear = date.getFullYear() + 1;
            const newDate = new Date(nextYear, date.getMonth());
            state.miniDate = Date.parse(newDate);
            state.mainDate = Date.parse(newDate);
        },
        prevYear(state) {
            const date = new Date(state.mainDate)
            const prevYear = date.getFullYear() - 1;
            const newDate= new Date(prevYear, date.getMonth());
            state.miniDate = Date.parse(newDate);
            state.mainDate = Date.parse(newDate);
        },
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
        },
        setFocusDate(state, action) {
            const newDate = action.payload;
            state.focusDate = newDate;
        },
        nextWeek(state) {
            const date = new Date(state.mainDate)
            const day = date.getDate();
            const newDate = new Date(date.getFullYear(), date.getMonth(), day + 7);
            state.miniDate = Date.parse(newDate);
            state.mainDate = Date.parse(newDate);
        },
        previousWeek(state) {
            const date = new Date(state.mainDate)
            const day = date.getDate();
            const newDate = new Date(date.getFullYear(), date.getMonth(), day - 7);
            state.miniDate = Date.parse(newDate);
            state.mainDate = Date.parse(newDate);
        },
        nextDay(state) {
            const date = new Date(state.mainDate)
            const day = date.getDate();
            const newDate = new Date(date.getFullYear(), date.getMonth(), day + 1);
            state.miniDate = Date.parse(newDate);
            state.mainDate = Date.parse(newDate);
        },
        previousDay(state) {
            const date = new Date(state.mainDate)
            const day = date.getDate();
            const newDate = new Date(date.getFullYear(), date.getMonth(), day - 1);
            state.miniDate = Date.parse(newDate);
            state.mainDate = Date.parse(newDate);
        },
        setView (state, action) {
            state.currentView = action.payload;
        }

    }
})

export const {nextYear, prevYear, nextMonth, previousMonth, previousMonthMini, nextMonthMini, nextWeek, previousWeek, nextDay, previousDay, setDate, setFocusDate, setView} = dateManager.actions;

export const currentDate = (state) => state.dateList.mainDate;
export const miniDate = (state) => state.dateList.miniDate;
export const currentView = (state) => state.dateList.currentView;
export const focusDate = (state) => state.dateList.focusDate;

export default dateManager.reducer;