// api.js
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "./axiosInstance";

const baseURL = "http://192.168.127.135:8000/api";

// TOKEN
export const loginUser = createAsyncThunk(
  "auth/loginUser", // Action type string
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseURL}/token/`, data);
      return response.data; // Return the response to be used in the fulfilled action
    } catch (error) {
      // Handle the error, sending it as the action payload
      console.error("Error saving user:", error);
      return rejectWithValue(error.message); // Reject with error message
    }
  }
);

// USER
export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  try {
    const response = await axios.get(`${baseURL}/users/`);
    return response.data; // Return the response data directly
  } catch (error) {
    throw new Error("Failed to fetch exercises: " + error.message);
  }
});

export const signupUser = createAsyncThunk(
  "auth/signupUser", // Action type string
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseURL}/users/create/`, data);
      return response.data; // Return the response to be used in the fulfilled action
    } catch (error) {
      // Handle the error, sending it as the action payload
      console.error("Error saving user:", error);
      return rejectWithValue(error.message); // Reject with error message
    }
  }
);

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

// COMMUNITIES

export const fetchCommunities = createAsyncThunk(
  "communities/fetchCommunities",
  async () => {
    try {
      const response = await axiosInstance.get(`communities/`);
      return response.data; // Return the response data directly
    } catch (error) {
      throw new Error("Failed to fetch templates: " + error.message);
    }
  }
);

// COMMUNITY POSTS
export const fetchCommunityPosts = createAsyncThunk(
  "communityPosts/fetchCommunityPosts",
  async (community) => {
    try {
      const response = await axiosInstance.get(
        `communities/${community.id}/posts/`
      );
      return response.data; // Return the response data directly
    } catch (error) {
      throw new Error("Failed to fetch templates: " + error.message);
    }
  }
);

export const fetchCommunityPost = createAsyncThunk(
  "communityPosts/fetchCommunityPost",
  async (communityPostId) => {
    try {
      const response = await axiosInstance.get(`posts/${communityPostId}/`);
      return response.data; // Return the response data directly
    } catch (error) {
      throw new Error("Failed to fetch templates: " + error.message);
    }
  }
);

export const addCommunityPost = createAsyncThunk(
  "communityPosts/addCommunityPost", // Action type string
  async (data, { rejectWithValue }) => {
    try {
      // API call directly inside the createAsyncThunk
      const response = await axiosInstance.post(
        `communities/${data.community}/posts/`,
        data
      );
      return response.data; // Return the response to be used in the fulfilled action
    } catch (error) {
      // Handle the error, sending it as the action payload
      console.error("Error saving community post like:", error);
      return rejectWithValue(error.message); // Reject with error message
    }
  }
);

export const addCommunityPostLike = createAsyncThunk(
  "communityPosts/addCommunityPostLike", // Action type string
  async (communitPostId, { rejectWithValue }) => {
    try {
      // API call directly inside the createAsyncThunk
      const response = await axiosInstance.post(
        `posts/${communitPostId}/likes/`
      );
      return response.data; // Return the response to be used in the fulfilled action
    } catch (error) {
      // Handle the error, sending it as the action payload
      console.error("Error saving community post like:", error);
      return rejectWithValue(error.message); // Reject with error message
    }
  }
);

export const deleteCommunityPostLike = createAsyncThunk(
  "communityPosts/deleteCommunityPostLike", // Action type string
  async (communitPostId, { rejectWithValue }) => {
    console.log(communitPostId);
    try {
      // API call directly inside the createAsyncThunk
      const response = await axiosInstance.delete(
        `posts/${communitPostId}/likes/`
      );
      return response.data; // Return the response to be used in the fulfilled action
    } catch (error) {
      // Handle the error, sending it as the action payload
      console.error("Error saving community post like:", error);
      return rejectWithValue(error.message); // Reject with error message
    }
  }
);

// COMMUNITY POST COMMENTS

export const fetchCommunityPostComments = createAsyncThunk(
  "communityPostComments/fetchCommunityPostComments",
  async (communityPost) => {
    try {
      const response = await axios.get(
        `${baseURL}/posts/${communityPost.id}/comments/`
      );
      return response.data; // Return the response data directly
    } catch (error) {
      throw new Error("Failed to fetch templates: " + error.message);
    }
  }
);

// EDIT THIS FOR TOMORROW
export const addCommunityPostComment = createAsyncThunk(
  "communityPostComments/addCommunityPostComment", // Action type string
  async ({ data, communityPostId }, { rejectWithValue }) => {
    try {
      // API call directly inside the createAsyncThunk
      const response = await axiosInstance.post(
        `posts/${communityPostId}/comments/`,
        data
      );
      return response.data; // Return the response to be used in the fulfilled action
    } catch (error) {
      // Handle the error, sending it as the action payload
      console.error("Error saving community post comment:", error);
      return rejectWithValue(error.message); // Reject with error message
    }
  }
);

export const addCommunityPostCommentLike = createAsyncThunk(
  "communityPostComments/addCommunityPostCommentLike", // Action type string
  async (communityPostCommentId, { rejectWithValue }) => {
    try {
      // API call directly inside the createAsyncThunk
      const response = await axiosInstance.post(
        `comments/${communityPostCommentId}/likes/`
      );
      return response.data; // Return the response to be used in the fulfilled action
    } catch (error) {
      // Handle the error, sending it as the action payload
      console.error("Error saving community post like:", error);
      return rejectWithValue(error.message); // Reject with error message
    }
  }
);

export const deleteCommunityPostCommentLike = createAsyncThunk(
  "communityPostComments/deleteCommunityPostLike", // Action type string
  async (communityPostCommentId, { rejectWithValue }) => {
    console.log(communityPostCommentId);
    try {
      // API call directly inside the createAsyncThunk
      const response = await axiosInstance.delete(
        `comments/${communityPostCommentId}/likes/`
      );
      return response.data; // Return the response to be used in the fulfilled action
    } catch (error) {
      // Handle the error, sending it as the action payload
      console.error("Error saving community post like:", error);
      return rejectWithValue(error.message); // Reject with error message
    }
  }
);
