import { configureStore } from "@reduxjs/toolkit";
import templateReducer from "./slices/templateSlice";
import exampleTemplateReducer from "./slices/exampleTemplateSlice";
import scheduleReducer from "./slices/scheduleSlice";
import exerciseReducer from "./slices/exerciseSlice";
import workoutHistoryReducer from "./slices/workoutHistorySlice";
import communityReducer from "./slices/communitySlice";
import communityPostReducer from "./slices/communityPostSlice";
import communityPostCommentReducer from "./slices/communityPostCommentSlice";
import authReducer from "./slices/authSlice";
import tokenMiddleware from "./middleware/storeMiddleware";

const Store = configureStore({
  reducer: {
    templates: templateReducer,
    exampleTemplates: exampleTemplateReducer,
    schedules: scheduleReducer,
    exercises: exerciseReducer,
    workoutHistory: workoutHistoryReducer,
    communities: communityReducer,
    communityPosts: communityPostReducer,
    communityPostComments: communityPostCommentReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tokenMiddleware),
});

export default Store;
