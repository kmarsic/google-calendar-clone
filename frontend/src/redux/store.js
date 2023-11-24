import {configureStore} from '@reduxjs/toolkit';
import dateReducer from './features/dateSlicer';
import taskReducer from './features/taskSlicer';
import clickReducer from './features/clickedSlicer';


export const store = configureStore({
    reducer: {
        dateList: dateReducer,
        taskList: taskReducer,
        clicked: clickReducer,
    }
})