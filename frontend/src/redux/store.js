import {configureStore} from '@reduxjs/toolkit';
import dateReducer from './features/dateSlicer';
import taskReducer from './features/taskSlicer';


export const store = configureStore({
    reducer: {
        dateList: dateReducer,
        taskList: taskReducer,
    }
})