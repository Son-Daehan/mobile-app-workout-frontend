import { createSlice } from "@reduxjs/toolkit";
import { fetchWorkoutHistory, addWorkoutHistory } from "../../services/api";
const workoutHistorySlice = createSlice({
  name: "workoutHistory",
  initialState: {
    workoutHistory: [],
    status: "idle",
    error: null,
  },
  reducers: {
    updateWorkoutHistory: (state, action) => {},
    removeWorkoutHistory: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWorkoutHistory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWorkoutHistory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.workoutHistory = action.payload;
      })
      .addCase(fetchWorkoutHistory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addWorkoutHistory.pending, (state) => {
        state.loading = true; 
      })
      .addCase(addWorkoutHistory.fulfilled, (state, action) => {
        state.loading = false; 
        state.workoutHistory.push(action.payload); 
      })
      .addCase(addWorkoutHistory.rejected, (state, action) => {
        state.loading = false; 
        state.error = action.payload || action.error.message; 
      });
  },
});
export const { updateWorkoutHistory, removeWorkoutHistory } =
  workoutHistorySlice.actions;
export default workoutHistorySlice.reducer;