import { createSlice } from "@reduxjs/toolkit";
import {
  addCommunityPostLike,
  deleteCommunityPostLike,
  fetchCommunityPosts,
  fetchCommunityPost,
  addCommunityPost,
} from "../../services/api"; // Import the async thunk from api.js

const communityPostSlice = createSlice({
  name: "communityPosts",
  initialState: {
    communityPost: {},
    communityPosts: [],
    communityPostLikes: {},
    status: "idle", // idle, loading, succeeded, failed
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommunityPost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCommunityPost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.communityPost = action.payload;
      })
      .addCase(fetchCommunityPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchCommunityPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCommunityPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.communityPosts = action.payload;
      })
      .addCase(fetchCommunityPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addCommunityPost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addCommunityPost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.communityPosts.unshift(action.payload);
      })
      .addCase(addCommunityPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addCommunityPostLike.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addCommunityPostLike.fulfilled, (state, action) => {
        const { id } = action.payload;

        const post = state.communityPosts.find((post) => post.id === id);

        if (post) {
          post.like_count = (post.like_count || 0) + 1; // Increment the like count
        }
        state.status = "succeeded";
      })
      .addCase(addCommunityPostLike.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteCommunityPostLike.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteCommunityPostLike.fulfilled, (state, action) => {
        const { id } = action.payload;
        const post = state.communityPosts.find((post) => post.id === id);

        if (post) {
          post.like_count = (post.like_count || 0) - 1; // Increment the like count
        }

        state.status = "succeeded";
      })
      .addCase(deleteCommunityPostLike.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default communityPostSlice.reducer;
