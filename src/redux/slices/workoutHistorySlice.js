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
    // addWorkoutHistory: (state, action) => {
    //   const { historicalWorkout } = action.payload;
    //   state.push(historicalWorkout);
    // },
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
        state.loading = true; // Set loading to true when the async operation starts
      })
      .addCase(addWorkoutHistory.fulfilled, (state, action) => {
        state.loading = false; // Set loading to false when the request is successful
        state.workoutHistory.push(action.payload); // Add the saved template to the list
      })
      .addCase(addWorkoutHistory.rejected, (state, action) => {
        state.loading = false; // Set loading to false when the request fails
        state.error = action.payload || action.error.message; // Capture the error message
      });
  },
});

export const { updateWorkoutHistory, removeWorkoutHistory } =
  workoutHistorySlice.actions;

export default workoutHistorySlice.reducer;
