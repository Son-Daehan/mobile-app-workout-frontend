// exerciseSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { fetchExercises } from "../../services/api"; // Import the async thunk from api.js

const exerciseSlice = createSlice({
  name: "exercises",
  initialState: {
    exercises: [],
    status: "idle", // idle, loading, succeeded, failed
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExercises.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchExercises.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.exercises = action.payload;
      })
      .addCase(fetchExercises.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default exerciseSlice.reducer;
