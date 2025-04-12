import { createSlice } from "@reduxjs/toolkit";
import {
	fetchWorkoutSchedules,
	addWorkoutSchedule,
	deleteWorkoutSchedule,
} from "../../services/api";
const scheduleSlice = createSlice({
	name: "schedule",
	initialState: {
		schedules: [],
		status: "idle",
		error: null,
	},
	reducers: {
		updateWorkoutSchedule: (state, action) => {
			const { dayKey, updatedWorkouts } = action.payload;
			const scheduleIndex = state.findIndex(
				(schedule) => schedule.scheduledDate === dayKey
			);
			if (scheduleIndex !== -1) {
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
				state.loading = true; 
			})
			.addCase(addWorkoutSchedule.fulfilled, (state, action) => {
				state.loading = false; 
				state.schedules.push(action.payload); 
			})
			.addCase(addWorkoutSchedule.rejected, (state, action) => {
				state.loading = false; 
				state.error = action.payload || action.error.message; 
			})
			.addCase(deleteWorkoutSchedule.pending, (state) => {
				state.loading = true; 
			})
			.addCase(deleteWorkoutSchedule.fulfilled, (state, action) => {
				state.loading = false; 
				console.log(action.payload);
				state.schedules = state.schedules.filter(
					(schedule) => schedule.id !== action.payload
				);
			})
			.addCase(deleteWorkoutSchedule.rejected, (state, action) => {
				state.loading = false; 
				state.error = action.payload || action.error.message; 
			});
	},
});
export const {
	updateWorkoutSchedule,
	changeWorkoutStatus,
	addWorkoutsToDate,
	deleteWorkoutsForDate,
} = scheduleSlice.actions;
export default scheduleSlice.reducer;