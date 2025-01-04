import { createSlice } from "@reduxjs/toolkit";
import schedulesData from "../../schedulesData.json";
import {
  fetchWorkoutSchedules,
  addWorkoutSchedule,
  deleteWorkoutSchedule,
} from "../../services/api";

const initialState = schedulesData.schedules;

const scheduleSlice = createSlice({
  name: "schedule",
  initialState: {
    schedules: [],
    status: "idle",
    error: null,
  },
  reducers: {
    // addWorkoutSchedule: (state, action) => {
    //   const { date, workout } = action.payload;
    //   const scheduleIndex = state.findIndex(
    //     (schedule) => schedule.scheduledDate === date
    //   );

    //   if (scheduleIndex > -1) {
    //     state[scheduleIndex].templates.push(workout);
    //   } else {
    //     state.push({
    //       scheduledDate: date,
    //       templates: [workout],
    //     });
    //   }
    // },
    updateWorkoutSchedule: (state, action) => {
      const { dayKey, updatedWorkouts } = action.payload;

      const scheduleIndex = state.findIndex(
        (schedule) => schedule.scheduledDate === dayKey
      );

      if (scheduleIndex !== -1) {
        // Update the templates for the specific schedule
        state[scheduleIndex].templates = updatedWorkouts;
      }
    },
    changeWorkoutStatus: (state, action) => {
      const { workoutId, status } = action.payload;
      const workout = state.find((w) => w.id === workoutId);
      if (workout) {
        workout.status = status;
      }
    },
    addWorkoutsToDate: (state, action) => {
      const { date, workouts } = action.payload;
      workouts.forEach((workout) => {
        workout.scheduledDate = date;
        state.push(workout);
      });
    },
    deleteWorkoutsForDate: (state, action) => {
      const { date } = action.payload;
      return state.filter((workout) => workout.scheduledDate !== date);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWorkoutSchedules.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWorkoutSchedules.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.schedules = action.payload;
      })
      .addCase(fetchWorkoutSchedules.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addWorkoutSchedule.pending, (state) => {
        state.loading = true; // Set loading to true when the async operation starts
      })
      .addCase(addWorkoutSchedule.fulfilled, (state, action) => {
        state.loading = false; // Set loading to false when the request is successful

        state.schedules.push(action.payload); // Add the saved template to the list
      })
      .addCase(addWorkoutSchedule.rejected, (state, action) => {
        state.loading = false; // Set loading to false when the request fails
        state.error = action.payload || action.error.message; // Capture the error message
      })
      .addCase(deleteWorkoutSchedule.pending, (state) => {
        state.loading = true; // Set loading to true when the async operation starts
      })
      .addCase(deleteWorkoutSchedule.fulfilled, (state, action) => {
        state.loading = false; // Set loading to false when the request is successful
        console.log(action.payload);

        // Remove the schedule with the matching ID from the list
        state.schedules = state.schedules.filter(
          (schedule) => schedule.id !== action.payload
        );
      })
      .addCase(deleteWorkoutSchedule.rejected, (state, action) => {
        state.loading = false; // Set loading to false when the request fails
        state.error = action.payload || action.error.message; // Capture the error message
      });
  },
});

export const {
  // addWorkoutSchedule,
  updateWorkoutSchedule,
  changeWorkoutStatus,
  addWorkoutsToDate,
  deleteWorkoutsForDate,
} = scheduleSlice.actions;

export default scheduleSlice.reducer;
