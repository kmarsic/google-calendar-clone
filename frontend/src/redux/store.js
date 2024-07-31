import {configureStore} from '@reduxjs/toolkit';
import dateReducer from './features/dateSlicer';
import taskReducer from './features/taskSlicer';
import formSlicer from './features/formSlicer';

export const store = configureStore({
    reducer: {
        dateList: dateReducer,
        taskList: taskReducer,
        formList: formSlicer,
    }
})