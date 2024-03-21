import { createSlice } from "@reduxjs/toolkit";

export const dateManager = createSlice({
    name:'dateList',
    initialState: {
        mainDate: Date.parse(new Date()),
        miniDate: Date.parse(new Date()),
        focusDate: Date.parse(new Date()),
        currentView: "Month",
        switch: "prev"
    },
    reducers: {
        handleViewChange (state, action) {
            state.switch = action.payload;
            const date = new Date(state.mainDate)
            if (action.payload == "prev") {
                switch(state.currentView) {
                    case "Year":  
                    {
                        const nextYear = date.getFullYear() + -1;
                        const newDate = new Date(nextYear, date.getMonth());
                        state.miniDate = Date.parse(newDate);
                        state.mainDate = Date.parse(newDate);
                    }
                      break;
                    case "Month": 
                    {
                        const prevMonth = date.getMonth() - 1;
                        const prevYear = date.getFullYear();
                        const newDate= new Date(prevYear, prevMonth);
                        state.miniDate = Date.parse(newDate);
                        state.mainDate = Date.parse(newDate);
                    }
                      break;
                    case "Week":
                      {
                        const day = date.getDate();
                        const newDate = new Date(date.getFullYear(), date.getMonth(), day - 7);
                        state.miniDate = Date.parse(newDate);
                        state.mainDate = Date.parse(newDate);
                      }
                      break;
                    case "Day":
                        {
                            const day = date.getDate();
                            const newDate = new Date(date.getFullYear(), date.getMonth(), day - 1);
                            state.miniDate = Date.parse(newDate);
                            state.mainDate = Date.parse(newDate);
                        }
                      break;
                  } 
            } else if (action.payload == "next") {
                switch(state.currentView) {
                    case "Year":
                      {
                        const nextYear = date.getFullYear() + 1;
                        const newDate = new Date(nextYear, date.getMonth());
                        state.miniDate = Date.parse(newDate);
                        state.mainDate = Date.parse(newDate);
                      }
                      break;
                    case "Month":
                      {
                        const nextMonth = date.getMonth() + 1;
                        const nextYear = date.getFullYear();
                        const newDate = new Date(nextYear, nextMonth);
                        state.miniDate = Date.parse(newDate);
                        state.mainDate = Date.parse(newDate);
                      }
                      break;
                    case "Week":
                      {
                        const day = date.getDate();
                        const newDate = new Date(date.getFullYear(), date.getMonth(), day + 7);
                        state.miniDate = Date.parse(newDate);
                        state.mainDate = Date.parse(newDate);
                      }
                      break;
                    case "Day":
                      {
                        const day = date.getDate();
                        const newDate = new Date(date.getFullYear(), date.getMonth(), day + 1);
                        state.miniDate = Date.parse(newDate);
                        state.mainDate = Date.parse(newDate);
                      }
                      break;
                  }
            }
        },
        nextMonthMini(state) {
            const date = new Date(state.miniDate)
            const nextMonth = date.getMonth() + 1;
            const nextYear = date.getFullYear();
            const newDate = new Date(nextYear, nextMonth);
            state.miniDate = Date.parse(newDate);
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
        setMiniDate(state,action) {
            const newDate = action.payload;
            state.miniDate = newDate;
        },
        setFocusDate(state, action) {
            const newDate = action.payload;
            state.focusDate = newDate;
        },
        setView (state, action) {
            state.currentView = action.payload;
        },
    }
})

export const {previousMonthMini, nextMonthMini, setDate, setMiniDate, setFocusDate, setView, handleViewChange} = dateManager.actions;

export const currentDate = (state) => state.dateList.mainDate;
export const miniDate = (state) => state.dateList.miniDate;
export const currentView = (state) => state.dateList.currentView;
export const focusDate = (state) => state.dateList.focusDate;
export const switchView = (state) => state.dateList.switch;

export default dateManager.reducer;