import { createSlice } from "@reduxjs/toolkit";

export const formManager = createSlice({
    name:'formManager',
    initialState: {
        uuid: 'id' + new Date().getTime(),
        title: "",
        type: "form-event",
        createdAt: parseInt(Date.parse(new Date())),
        startTime: "",
        endTime: "" + 3600000,
        allDay: true,
        startDate: "",
        endDate: "",
        guests: [],
        location: "",
        description: "",
        attachment: [],
        color: "#039be5",
        notifications: []
    },
    reducers: {
        handleFormInputs (state, action) {
            const {type, payload} =  action.payload
            state[type] = payload;
        }
}});
export const { handleFormInputs } = formManager.actions;

export const formData = (state) => state.formList;

export default formManager.reducer; 