import { createSlice } from "@reduxjs/toolkit";
import { endDateMatch, startDateMatch, timeMatch } from "../../Fncs/indexFncs";

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
            const [type, payload] =  action.payload
            console.log(payload)
            switch ( type ) {
                case 'title': {
                    return {
                        ...state,
                        title: payload
                    }
                }
                case 'type': {
                    return {
                        ...state,
                        type: payload
                    }
                }
                case 'startTime': {
                    return {
                        ...state,
                        startTime: payload,
                    }
                }
                case 'endTime': {
                    return {
                        ...state,
                        endTime: payload
                    }
                }
                case 'allDay': {
                    return {
                        ...state,
                        allDay: payload
                    }
                }
                case 'startDate': {
                    return {
                        ...state,
                        startDate: payload,
                    }
                }
                case 'endDate': {
                    return {
                        ...state,
                        endDate: payload
                    }
                }
                case 'guests': {
                    return {
                        ...state,
                        guests: payload
                    }
                }
                case 'location': {
                    return {
                        ...state,
                        location: payload
                    }
                }
                case 'description': {
                    return {
                        ...state,
                        description: payload
                    }
                }
                case 'color': {
                    return {
                        ...state,
                        color: payload
                    }
                }
                case 'notifications': {
                    return {
                        ...state,
                        notifications: payload
                    }
                }
            }
        }
}});
export const { handleFormInputs } = formManager.actions;

export const formData = (state) => state.formList;

export default formManager.reducer; 