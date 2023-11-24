import { createSlice } from "@reduxjs/toolkit";

export const clickManager = createSlice({
    name:'clickManager',
    initialState: {
        id: parseInt(null),
        x: null,
        y: null,
        date: Date.parse(parseInt(null)),
        refresh: false
    },
    reducers: {
        handleBoxClick(state,action) {
        const e = action.payload;
            if(!e.target.classList.contains("box")) return

        const offsetX = () => {
        if (e.clientX > 497) {
            return (e.target.offsetLeft - 360)
        } 
        return (e.target.offsetLeft + 280)
        }

        const offsetY = () => {
        if (e.clientY <= 257 ) {
            return 114
        } else if (e.clientY > 720 ) {
            return 435
        } else return 275
      
     }
    return {
        ...state,
        id: e.target.id,
        x: offsetX(),
        y: offsetY(),
        date: Date.parse(new Date(parseInt(e.target.id))),
    }
        },
    }
})

export const {handleBoxClick} = clickManager.actions;

export const clicked = (state) => state.clicked;


export default clickManager.reducer;