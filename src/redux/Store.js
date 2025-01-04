import { configureStore } from '@reduxjs/toolkit';
import templateReducer from './slices/templateSlice';
import exampleTemplateReducer from './slices/exampleTemplateSlice';
import scheduleReducer from './slices/scheduleSlice';
import exerciseReducer from './slices/exerciseSlice';
import userReducer from './slices/userSlice';
import workoutHistoryReducer from './slices/workoutHistorySlice'

const Store = configureStore({
  reducer: {
    templates: templateReducer,
    exampleTemplates: exampleTemplateReducer,
    schedules: scheduleReducer,
    exercises: exerciseReducer,
    users: userReducer,
    workoutHistory: workoutHistoryReducer,
  },
});

export default Store;
