// api.js
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const baseURL = "http://192.168.127.135:8000/api";

// Create an async thunk for fetching exercises
export const fetchExercises = createAsyncThunk(
  "exercises/fetchExercises",
  async () => {
    try {
      const response = await axios.get(`${baseURL}/exercises/`);
      return response.data; // Return the response data directly
    } catch (error) {
      throw new Error("Failed to fetch exercises: " + error.message);
    }
  }
);

export const fetchWorkoutTemplates = createAsyncThunk(
  "workoutTemplates/fetchWorkoutTemplates",
  async () => {
    try {
      const response = await axios.get(`${baseURL}/workout-templates/`);
      return response.data; // Return the response data directly
    } catch (error) {
      throw new Error("Failed to fetch templates: " + error.message);
    }
  }
);

export const addWorkoutTemplate = createAsyncThunk(
  "template/saveTemplate", // Action type string
  async (templateData, { rejectWithValue }) => {
    templateData.exercises = templateData.exercises.map((exercise) => ({
      exercise: exercise.exercise.id, // Replace the exercise object with just the id
      sets: exercise.sets, // Keep the sets as they are
    }));
    console.log(templateData);
    try {
      // API call directly inside the createAsyncThunk
      const response = await axios.post(
        `${baseURL}/workout-templates/`,
        templateData
      );
      return response.data; // Return the response to be used in the fulfilled action
    } catch (error) {
      // Handle the error, sending it as the action payload
      console.error("Error saving template:", error);
      return rejectWithValue(error.message); // Reject with error message
    }
  }
);

export const updateWorkoutTemplate = createAsyncThunk(
  "template/updateTemplate",
  async (templateData, { rejectWithValue }) => {
    templateData.exercises = templateData.exercises.map((exercise) => ({
      id: exercise.id,
      exercise: exercise.exercise.id, // Replace the exercise object with just the id
      sets: exercise.sets, // Keep the sets as they are
    }));
    console.log(templateData);

    try {
      const response = await axios.patch(
        `${baseURL}/workout-templates/${templateData.id}/`,
        templateData
      );
      return response.data;
    } catch (error) {
      console.error("Error updating template:", error);
      return rejectWithValue(error.message);
    }
  }
);

export const deleteWorkoutTemplate = createAsyncThunk(
  "template/deleteWorkoutTemplate",
  async (templateId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${baseURL}/workout-templates/${templateId}/`
      );
      return templateId;
    } catch (error) {
      console.error("Error deleting template:", error);
      return rejectWithValue(error.message);
    }
  }
);

export const fetchWorkoutHistory = createAsyncThunk(
  "workoutHistory/fetchWorkoutHistory",
  async () => {
    try {
      const response = await axios.get(`${baseURL}/workout-history/`);
      return response.data; // Return the response data directly
    } catch (error) {
      throw new Error("Failed to fetch history: " + error.message);
    }
  }
);

export const addWorkoutHistory = createAsyncThunk(
  "workoutHistory/addWorkoutHistory", // Action type string
  async (workoutData, { rejectWithValue }) => {
    try {
      // API call directly inside the createAsyncThunk
      console.log(workoutData.workoutHistory);
      const response = await axios.post(
        `${baseURL}/workout-history/`,
        workoutData
      );
      return response.data; // Return the response to be used in the fulfilled action
    } catch (error) {
      // Handle the error, sending it as the action payload
      console.error("Error saving workout history:", error);
      return rejectWithValue(error.message); // Reject with error message
    }
  }
);

export const fetchWorkoutSchedules = createAsyncThunk(
  "workoutSchedule/fetchWorkoutSchedules",
  async () => {
    try {
      const response = await axios.get(`${baseURL}/workout-schedule/`);
      return response.data; // Return the response data directly
    } catch (error) {
      throw new Error("Failed to fetch templates: " + error.message);
    }
  }
);

export const addWorkoutSchedule = createAsyncThunk(
  "workoutSchedule/addWorkoutSchedule", // Action type string
  async (workoutSchedule, { rejectWithValue }) => {
    try {
      // API call directly inside the createAsyncThunk
      const response = await axios.post(
        `${baseURL}/workout-schedule/`,
        workoutSchedule
      );
      return response.data; // Return the response to be used in the fulfilled action
    } catch (error) {
      // Handle the error, sending it as the action payload
      console.error("Error saving template:", error);
      return rejectWithValue(error.message); // Reject with error message
    }
  }
);

export const deleteWorkoutSchedule = createAsyncThunk(
  "workoutSchedule/deleteWorkoutSchedule",
  async (workoutId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${baseURL}/workout-schedule/${workoutId}/`
      );
      return workoutId;
    } catch (error) {
      console.error("Error deleting workout schedule:", error);
      return rejectWithValue(error.message);
    }
  }
);
